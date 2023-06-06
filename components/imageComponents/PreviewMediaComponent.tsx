import { CameraCapturedPicture } from 'expo-camera';
import React, { Dispatch } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

interface Props {
  media: ImagePicker.ImagePickerAsset | CameraCapturedPicture
  setMedia: Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | CameraCapturedPicture | undefined>>;
}

const PreviewMediaComponent = ({ media, setMedia }:Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + media.base64 }} />
      <Button mode="contained" style={styles.button} onPress={() => {setMedia(undefined);}}>
        Close
      </Button>
    </SafeAreaView>
  )
}

export default PreviewMediaComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black"
  },
  button: {
    alignItems: 'center',
    margin:5,
  },
  preview: {
    alignSelf:"stretch",
    flex:1
  }
});
