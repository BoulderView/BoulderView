import React, { Dispatch } from 'react';
import * as ImagePicker from "expo-image-picker";
import { CameraCapturedPicture } from 'expo-camera';
import { IconButton } from 'react-native-paper';

interface Props {
  setMedia: Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | CameraCapturedPicture | undefined>>;
}

const PickMediaComponent = ({ setMedia }:Props) => { 
  // Pick image or videos
  const pickMedia = async () => {
    /*
      Options for the videos and pictures
      quality: 1 for best quality pictures
      exif: remove shutter speed and other camera options
    */
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      quality:1,
      base64:true,
      allowsMultipleSelection:false,
      exif:false,
      aspect:[9,16]
    })

    // When image was picked
    if (!result.canceled) {
      setMedia(result.assets[0]);
    }
  }
  
  return (
    <IconButton
      icon="image"
      iconColor="white"
      containerColor="transparent"
      size={30}
      onPress={pickMedia}
    />
  )
}

export default PickMediaComponent;
