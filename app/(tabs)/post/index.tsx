import React, { useRef, useState } from 'react';
import { View, StyleSheet } from "react-native";
import { Camera, CameraType } from 'expo-camera';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import * as ImagePicker from "expo-image-picker";

import NoPermissionsComponent from '../../../components/imageComponents/NoPermissionsComponent';
import PermissionsLoadingComponent from '../../../components/imageComponents/PermissionsLoadingComponent';
import CameraActionComponent from '../../../components/imageComponents/CameraActionComponent';
import FlipCameraComponent from '../../../components/imageComponents/FlipCameraComponent';
import PickMediaComponent from '../../../components/imageComponents/PickMediaComponent';
import PreviewMediaComponent from '../../../components/imageComponents/PreviewMediaComponent';

const PostScreen= () => {

  // Camera
  let cameraRef = useRef<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);

  // Media
  const [mediaUri, setMediaUri] = useState<string>("");
  
  // Permissions
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] = ImagePicker.useMediaLibraryPermissions();

  const navigation = useNavigation();

  // Camera permissions are still loading
  if (!cameraPermission || !galleryPermission) {
    return (
      <PermissionsLoadingComponent />
    );
  }

  // Camera permissions are not granted yet
  if (!cameraPermission.granted || !galleryPermission.granted) {
    return (
      <NoPermissionsComponent 
        cameraPermission={cameraPermission}
        galleryPermission={galleryPermission}
        requestCameraPermission={requestCameraPermission}
        requestGalleryPermission={requestGalleryPermission}
      />
    );
  }

  // Preview the media
  if (mediaUri !== "") {
    return (
      <PreviewMediaComponent
        mediaUri={mediaUri}
        setMediaUri={setMediaUri}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.topSubContainer}>
            <IconButton
              icon="arrow-left"
              iconColor="white"
              containerColor="#576CBC"
              size={25}
              mode="contained"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.bottomSubContainer}>
            <PickMediaComponent
              setMediaUri={setMediaUri}
            />
            <CameraActionComponent
              cameraRef={cameraRef}
              setMediaUri={setMediaUri}
            />
            <FlipCameraComponent 
              setType={setType}
              type={type}
            />
          </View>
        </View>
      </Camera>
    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black"
  },
  camera: {
    flex:1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems:"center",
    justifyContent:"space-between",
  },
  topSubContainer: {
    flexDirection:"row",
    width:"100%",
    backgroundColor:'transparent',
    margin:10,
    paddingHorizontal:10
  },
  bottomSubContainer: {
    flexDirection:"row",
    width:"100%",
    backgroundColor:'transparent',
    justifyContent:"space-evenly",
    margin:10,
    alignItems:"center"
  }
});
