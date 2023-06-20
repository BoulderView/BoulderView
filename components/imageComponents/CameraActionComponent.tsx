import { Camera } from 'expo-camera';
import React, { Dispatch, RefObject, useState } from 'react';
import { Alert } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props {
  cameraRef: RefObject<Camera>;
  setMediaUri: Dispatch<string>;
  mediaUri:string|undefined;
}

const CameraActionComponent: React.FC<Props> = ({
  cameraRef,
  setMediaUri,
  mediaUri
}) => {
  
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // handles taking videos
  const takeVideo = async () => {
    if (!isRecording) {
      console.log("taking video")

      setIsRecording(true);
      const newVideo = await cameraRef.current?.recordAsync();
  
      if (newVideo) {
        setMediaUri(newVideo.uri);
        console.log(mediaUri);
      } else {
        Alert.alert("video capture failed");
      }
    } else {
      cameraRef.current?.stopRecording();
      setIsRecording(false);
    }
  }

  return (
    <IconButton
      icon={!isRecording ? "radiobox-marked" : "stop-circle"}
      iconColor="red"
      containerColor="transparent"
      size={60}
      mode="contained"
      onPress={takeVideo}
    />
  )
}

export default CameraActionComponent;
