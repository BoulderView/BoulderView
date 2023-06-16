import React, { Dispatch } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Divider, TextInput } from 'react-native-paper';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { SearchBar } from '../SearchBar';
import { PostgrestError, Session } from '@supabase/supabase-js';
import { postModel } from '../../models/postModel';
import { supabase } from '../../lib/supabase';
import { CameraCapturedPicture } from 'expo-camera';


const data = {
  "name": "Boruda Climb",
  "desc": "Movement beyond boundaries",
  "distance": "8 mins away",
  "address": "991A Alexandra Rd, Singapore 119969",
  "opening": "Thursday, 11.30am - 10.30pm"
}

const PostBottomSheetComponent = (
  session:Session | null,
  media:ImagePicker.ImagePickerAsset | CameraCapturedPicture,
  setMedia:Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | CameraCapturedPicture | undefined>>
) => {
  const [descText, setDescText] = useState("");
  const [gym, setGym] = useState<bigint>(BigInt(1));

  // Do something on submit
  const onSubmitSearch = (query: string) => {
    console.log("hello");
  }

  // Adding the image to storage and updates post table
  const uploadMedia = async (
    media:ImagePicker.ImagePickerAsset,
    caption:string
  ) => {
    try {
      const ext = media.uri.substring(media.uri.lastIndexOf(".") + 1);

      const fileName:string = media.uri.replace(/^.*[\\/]/, "");
  
      const formData = new FormData();
      formData.append("files", JSON.parse(JSON.stringify({
        uri: media.uri,
        name: fileName,
        type: media.type ? `image/${ext}` : `video/${ext}`,
      })));
  
      // Creating new entry on the 
      const errorPost = await uploadPost(caption, fileName);
  
      if (errorPost) throw new Error(errorPost.message);
  
      // Uploading to the supabase storage
      const { data, error } = await supabase
        .storage
        .from('postVideos')
        .upload(fileName, formData);
      
      // Error occurred
      if (error) throw new Error(error.message);
      
      // Success case
      Alert.alert("Image uploaded");
      setMedia(undefined);

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  // Creating a table entry for the post
  const uploadPost = async (
    caption:string,
    postVideoUrl:string
  ) : Promise<PostgrestError | null> => {
    try {

      // Requires the user to be signed in
      if (!session?.user) throw new Error('No user on the session!')

      const uploads:postModel = {
        caption: caption,
        post_video_url: postVideoUrl,
        profile_id: session?.user.id,
        created_at: new Date(),
      }

      // uploading post
      let { data, error } = await supabase.from('post').insert(uploads);

      if (error) {
        throw error
      }
      return null;
    } catch (error:any) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
      return error
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <SearchBar searchFunction={onSubmitSearch} placeholder='Tag Gym' />
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
          <Button mode="contained" style={styles.button} onPress={() => {
            uploadMedia(media, "testing")
          }}>
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
    justifyContent:"center",
    padding:5,
    margin:5,
  }
});
