import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Divider, TextInput, SegmentedButtons } from 'react-native-paper';
import { useState } from 'react';
import { PostgrestError, Session } from '@supabase/supabase-js';
import * as VideoThumbnails from 'expo-video-thumbnails';

import { SearchBar } from '../SearchBar';
import { postModel } from '../../models/postModel';
import { supabase } from '../../lib/supabase';
import { gymModel } from '../../models/gymModel';

interface Props {
  session:Session | null;
  mediaUri:string;
  setMediaUri: Dispatch<SetStateAction<string>>;
}

const PostBottomSheetComponent: React.FC<Props> = ({
  session,
  mediaUri,
  setMediaUri,
}) => {

  // States
  const [descText, setDescText] = useState("");
  const [selectedGym, setSelectedGym] = useState<gymModel>();
  const [isPrivate, setIsPrivate] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState("Q1");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = React.useState('');

  // This effect runs after every render
  useEffect(() => {
    if (value === "public") {
      setIsPrivate(false);
    } else if (value === "private") {
      setIsPrivate(true);
    }
  }, [value]);

  // Do something on submit
  const onSubmitSearch = async (query: string) => {
    try {
      let { data, error, status } = await supabase
        .from('gym')
        .select()
        .eq("name", query)
        .single();
      
      console.log(data);

      // If there is any form of error
      if (error || status !== 200) {
        throw error;
      }

      if (data) {
        // Casting data to gymModel
        const updatedData = data as gymModel;
        setSelectedGym(updatedData);
      }

      console.log("Selected gym:" + selectedGym?.cover_image_url);

    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  const uploadThumbnail = async (): Promise<string | undefined> => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        mediaUri,
        {
          time: 100,
        }
      );
      const ext = uri.substring(uri.lastIndexOf(".") + 1);

      const thumbnailUrl:string = uri.replace(/^.*[\\/]/, "");
  
      const formData = new FormData();
      formData.append("files", JSON.parse(JSON.stringify({
        uri: uri,
        name: thumbnailUrl,
        type: `image/${ext}`,
      })));
  
      // Uploading to the supabase storage
      const { data, error } = await supabase
        .storage
        .from('postThumbnails')
        .upload(thumbnailUrl, formData);

      return thumbnailUrl;

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  // Adding the image to storage and updates post table
  const uploadMedia = async (): Promise<string | undefined> => {
    try {
      setIsLoading(true);
      const ext = mediaUri.substring(mediaUri.lastIndexOf(".") + 1);

      const postVideoUrl:string = mediaUri.replace(/^.*[\\/]/, "");
  
      const formData = new FormData();
      formData.append("files", JSON.parse(JSON.stringify({
        uri: mediaUri,
        name: postVideoUrl,
        type: `video/${ext}`,
      })));
  
      // Uploading to the supabase storage
      const { data, error } = await supabase
        .storage
        .from('postVideos')
        .upload(postVideoUrl, formData);
      
      // Error occurred
      if (error) throw new Error(error.message);

      return postVideoUrl;
      
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  // Creating a table entry for the post
  const uploadPost = async () => {
    try {

      // Requires the user to be signed in
      if (!session?.user) throw new Error('No user on the session!')

      let selectedGymId:string | null = null;

      if (selectedGym) {
        selectedGymId = selectedGym.id;
      }

      // Upload video
      const postVideoUrl = await uploadMedia();

      // Upload thumbnail
      const thumbnailUrl = await uploadThumbnail();

      if (postVideoUrl === undefined || thumbnailUrl === undefined) {
        throw new Error("video or thumbnail upload failed");
      }

      const uploads:postModel = {
        id:undefined,
        caption: descText,
        post_video_url: postVideoUrl,
        post_thumbnail_url: thumbnailUrl,
        profile_id: session?.user.id,
        gym_id: selectedGymId,
        created_at: new Date(),
        updated_at: new Date(),
        is_private: isPrivate,
        selected_grade: selectedGrade,
        likes: 0
      }

      // uploading post
      let { data, error } = await supabase.from('post').insert(uploads);

      if (error) {
        throw error
      }

      setMediaUri("");

      // Success case
      Alert.alert("Video uploaded");
      
    } catch (error:any) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } 

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <SearchBar 
          searchFunction={onSubmitSearch} 
          placeholder='Tag Gym' 
        />
        <Divider />
        {selectedGym && <Text>Selected Gym: {selectedGym.name}</Text>}
        <TextInput
          label="Caption"
          value={descText}
          mode="outlined"
          multiline={true}
          style={styles.textInput}
          onChangeText={text => setDescText(text)}
        />
        <View style={styles.buttonView}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: 'private',
                label: 'Private',
              },
              {
                value: 'public',
                label: 'Public',
              },
            ]}
          />
          <Button 
            mode="contained" 
            style={styles.button} 
            onPress={uploadPost}
            loading={isLoading}
          >
            upload
          </Button>
        </View>
      </View>
    </View>
  )
};

export default PostBottomSheetComponent;

const styles = StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleContainer: {
    height:'35%',
    width: '100%',
    margin: 5
  },
  title: {
    fontSize: 30
  },
  subtitle: {
    fontSize: 20
  },
  contentContainer: {
    height:'65%',
    width: '100%',
    margin: 5
  },
  textInput: {
    margin:10
  },
  button: {
    alignItems: 'center',
  },
  buttonView: {
    flexDirection:"row",
    justifyContent:"space-between",
    margin:5,
  }
});
