import * as React from 'react';
import { Text, View, StyleSheet, Image } from "react-native";
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostScreen= () => {
  let cameraRef = useRef<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();

  // Camera permissions are still loading
  if (!permission) {
    return <View />;
  }

  // Camera permissions are not granted yet
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button mode="contained" onPress={requestPermission}>
          Grant permission
        </Button>
      </View>
    );
  }

  // Change between front and back camera
  const toggleCameraType = () => {
    setType(current => 
      (current === CameraType.back 
        ? CameraType.front 
        : CameraType.back));
    console.log(type);
  }

  

  // handles taking pictures
  const takePic = async () => {
    /*
      Options for the pictures 
      quality: 1 for best quality pictures
      exif: remove shutter speed and other camera options
    */
    let options = {
      quality:1,
      base64:true,
      exif:false
    };

    let newPhoto = await cameraRef.current?.takePictureAsync(options);
    setPhoto(newPhoto);
    console.log("photo taken");
  }

  // Preview the photo
  if (photo) {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button mode="contained" style={styles.button} onPress={() => {
          setPhoto(undefined);
          console.log("closing photo")
        }}>
          Close
        </Button>
      </SafeAreaView>
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
          <Button mode="contained" style={styles.button} onPress={toggleCameraType}>
            Flip Camera
          </Button>
          <Button mode="contained" style={styles.button} onPress={takePic}>
            Take picture
          </Button>
        </View>
      </Camera>
    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex:1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems:"center",
    justifyContent:"flex-end",
  },
  button: {
    flex: 0.05,
    alignSelf: 'flex-end',
    alignItems: 'center',
    margin:5,
  },
  preview: {
    alignSelf:"stretch",
    flex:1
  }
});
