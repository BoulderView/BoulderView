import * as ImagePicker from "expo-image-picker";
import React, { Dispatch, SetStateAction } from "react";
import { IconButton } from "react-native-paper";

interface Props {
  setMediaUri: Dispatch<SetStateAction<string>>;
}

const PickMediaComponent: React.FC<Props> = ({ setMediaUri }) => {
  // Pick image or videos
  const pickMedia = async () => {
    /*
      Options for the videos and pictures
      quality: 1 for best quality pictures
      exif: remove shutter speed and other camera options
    */
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 0.2, //default is 0.2
      allowsMultipleSelection: false,
      exif: false,
      aspect: [9, 16],
    });

    // When image was picked
    if (!result.canceled) {
      setMediaUri(result.assets[0].uri);
    }
  };

  return (
    <IconButton
      icon="image"
      iconColor="white"
      containerColor="transparent"
      size={30}
      onPress={pickMedia}
    />
  );
};

export default PickMediaComponent;
