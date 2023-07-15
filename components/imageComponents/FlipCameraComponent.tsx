import { CameraType } from "expo-camera";
import React from "react";
import { IconButton } from "react-native-paper";

interface Props {
  setType: (callback: (prevState: CameraType) => CameraType) => void;
  type?: CameraType;
}

const FlipCameraComponent: React.FC<Props> = ({ setType, type }) => {
  // Change between front and back camera
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <IconButton
      icon="camera-flip-outline"
      iconColor="white"
      containerColor="transparent"
      size={30}
      mode="contained"
      onPress={toggleCameraType}
    />
  );
};

export default FlipCameraComponent;
