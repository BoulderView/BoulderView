import { Camera, CameraCapturedPicture, CameraPictureOptions } from 'expo-camera';
import { ImagePickerAsset } from 'expo-image-picker';
import React, { Dispatch, RefObject } from 'react';
import { IconButton } from 'react-native-paper';

interface Props {
  cameraRef: RefObject<Camera>;
  setMedia: Dispatch<React.SetStateAction<ImagePickerAsset | CameraCapturedPicture | undefined>>;
}

const CameraActionComponent: React.FC<Props> = ({
  cameraRef,
  setMedia
}) => {
  // handles taking pictures
  const takePhoto = async () => {
    /*
      Options for the pictures 
      quality: 1 for best quality pictures
      exif: remove shutter speed and other camera options
    */
    const options: CameraPictureOptions = {
      quality: 1,
      base64: true,
      exif: false
    };
  
    if (cameraRef?.current) {
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      setMedia(newPhoto);
      console.log("photo taken");
    }
  }

  // handles taking videos
  const takeVideo = async () => {
    console.log("taking video")
  }

  return (
    <IconButton
      icon="radiobox-marked"
      iconColor="white"
      containerColor="transparent"
      size={60}
      mode="contained"
      onPress={takePhoto}
      onLongPress={takeVideo} // for video
      delayLongPress={200}
    />
  )
}

export default CameraActionComponent;
