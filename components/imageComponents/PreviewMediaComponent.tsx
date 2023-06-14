import { CameraCapturedPicture } from 'expo-camera';
import React, { Dispatch, useEffect, useState } from 'react';
import { Image, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';
import { PostgrestError, Session } from '@supabase/supabase-js';
import { postModel } from '../../models/postModel';

interface Props {
  media: ImagePicker.ImagePickerAsset | CameraCapturedPicture
  setMedia: Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | CameraCapturedPicture | undefined>>;
}

interface UploadPostProps {
  gymId:bigint;
  caption:string;
  postVideoUrl:string;
}

const PreviewMediaComponent = ({ media, setMedia }:Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [postVideoUrl, setPostVideoUrl] = useState("");
  const [gym, setGym] = useState<bigint>(BigInt(1));

  useEffect(() => {
    // Getting user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const gymSelected = "Boruda Climbing";

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
        postVideoUrl: postVideoUrl,
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

  // Adding the image to storage and updates post table
  const uploadMedia = async (
    media:ImagePicker.ImagePickerAsset,
    caption:string
  ) => {
    try{
      const ext = media.uri.substring(media.uri.lastIndexOf(".") + 1);

      const fileName:string = media.uri.replace(/^.*[\\/]/, "");
  
      const formData = new FormData();
      formData.append("files", JSON.parse(JSON.stringify({
        uri: media.uri,
        name: fileName,
        type: media.type ? `image/${ext}` : `video/${ext}`,
      })));
  
      // Creating new entry on the 
      const errorPost = await uploadPost(caption, fileName)
  
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

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + media.base64 }} />
      <Button mode="contained" style={styles.button} onPress={() => {setMedia(undefined);}}>
        Close
      </Button>
      <Button mode="contained" style={styles.button} onPress={() => {
        uploadMedia(media, "testing")
      }}>
        upload
      </Button>
    </SafeAreaView>
  );
};

export default PreviewMediaComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black",
  },
  button: {
    alignItems: 'center',
    margin:5,
  },
  preview: {
    alignSelf:"stretch",
    flex:1,
  }
});