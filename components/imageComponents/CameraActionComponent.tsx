import { Camera, CameraRecordingOptions } from 'expo-camera';
import React, { Dispatch, RefObject, useState } from 'react';
import { Alert } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props {
  cameraRef: RefObject<Camera>;
  setMediaUri: Dispatch<string>;
}

const CameraActionComponent: React.FC<Props> = ({
  cameraRef,
  setMediaUri,
}) => {
  
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // handles taking videos
  const takeVideo = async () => {
    if (!isRecording) {

      setIsRecording(true);
      const recordingOptions:CameraRecordingOptions = {
        quality:"720p" // Up the quality in the future
      }
      const newVideo = await cameraRef.current?.recordAsync(recordingOptions);
  
      if (newVideo) {
        setMediaUri(newVideo.uri);
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
