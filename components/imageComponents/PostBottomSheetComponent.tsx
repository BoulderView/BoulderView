import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Divider, TextInput, SegmentedButtons, List } from 'react-native-paper';
import { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import * as VideoThumbnails from 'expo-video-thumbnails';

import { postModel } from '../../models/postModel';
import { supabase } from '../../lib/supabase';
import { gymModel } from '../../models/gymModel';
import TagGymComponent from './TagGymComponent';
import PickGradeComponent from './PickGradeComponent';

interface Props {
  session:Session | null;
  mediaUri:string;
  setMediaUri: Dispatch<SetStateAction<string>>;
  setShowSnackBar: Dispatch<SetStateAction<boolean>>;
}

const PostBottomSheetComponent: React.FC<Props> = ({
  session,
  mediaUri,
  setMediaUri,
  setShowSnackBar
}) => {

  // States
  const [descText, setDescText] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("public");

  const [isSelectingGym, setIsSelectingGym] = useState(false);
  const [selectedGym, setSelectedGym] = useState<gymModel|undefined>();

  const [isSelectingGrade, setIsSelectingGrade] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<string|null>(null);

  // This effect runs after every render
  useEffect(() => {
    if (value === "public") {
      setIsPrivate(false);
    } else if (value === "private") {
      setIsPrivate(true);
    }
  }, [value]);

  useEffect(() => {
    setSelectedGrade(null); // Set selectedGrade to null when selectedGym changes
  }, [selectedGym]);

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
      setShowSnackBar(true);
      
    } catch (error:any) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } 

    } finally {
      setIsLoading(false);
    }
  }

  if (isSelectingGym) {
    return <TagGymComponent setIsSelectingGym={setIsSelectingGym} setSelectedGym={setSelectedGym}/>;
  }

  if (isSelectingGrade && selectedGym !== undefined) {
    return <PickGradeComponent setIsSelectingGrade={setIsSelectingGrade} setSelectedGrade={setSelectedGrade} gymGrades={selectedGym.gym_grade} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <List.Item
          title="Tag Gyms"
          description={selectedGym === undefined ? "No gym selected" : selectedGym.name}
          right={props => <List.Icon {...props} icon="arrow-right" />}
          onPress={() => setIsSelectingGym(true)}
        />
        <Divider />
        {selectedGym && 
          <List.Item
            title="Select grade"
            description={selectedGrade === null ? "Select a grade" : selectedGrade}
            right={props => <List.Icon {...props} icon="arrow-right" />}
            onPress={() => setIsSelectingGrade(true)}
          />
        }
        <Divider />
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
            style={styles.segmentedButtons}
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
            disabled={selectedGrade === null && selectedGym === undefined}
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
    height:"100%"
  },
  buttonView: {
    flexDirection:"row",
    justifyContent:"space-between",
    margin:5,
  },
  segmentedButtons: {
    width:"50%"
  }
});
