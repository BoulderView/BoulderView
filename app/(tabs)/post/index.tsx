import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Image } from "react-native";
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import * as ImagePicker from "expo-image-picker";

const PostScreen= () => {
  // Camera
  let cameraRef = useRef<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);

  // Photo
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | undefined>();

  // Permissions
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] = ImagePicker.useMediaLibraryPermissions();

  const navigation = useNavigation();

  // Only navigates to the default page of the home page, need to fix
  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      
    })
  }, [])

  // Camera permissions are still loading
  if (!cameraPermission || !galleryPermission) {
    return (
      <View style={{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
      }}>
        <Text style={{ textAlign: 'center' }}>
          Getting permissions...
        </Text>
      </View>
    );
  }

  // Camera permissions are not granted yet
  if (!cameraPermission.granted || !galleryPermission.granted) {
    return (
      <View style={{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
      }}>
        <Text style={{ textAlign: 'center' }}>
          We need permission to both the camera and gallery
        </Text>
        {
          !cameraPermission.granted
            ? <Button mode="contained" onPress={requestCameraPermission}>
                Grant camera permission
              </Button>
            : <Text style={{ textAlign: 'center' }}>
                Camera permission granted
              </Text>
        }
        {
          !galleryPermission.granted
            ? <Button mode="contained" onPress={requestGalleryPermission}>
                Grant gallery permission
              </Button>
            : <Text style={{ textAlign: 'center' }}>
                Gallery permission granted
              </Text>
        }
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

  // Pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      quality:1,
      base64:true,
      allowsMultipleSelection:false,
      exif:false
    })

    // When image was picked
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
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

  // Preview the photo
  if (image) {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + image.base64 }} />
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
          <Button mode="contained" style={styles.button} onPress={
            () => handleGoBack()
          }>
            Go Back
          </Button>
          <Button mode="contained" style={styles.button} onPress={toggleCameraType}>
            Flip Camera
          </Button>
          <Button mode="contained" style={styles.button} onPress={takePic}>
            Take picture
          </Button>
          <Button mode="contained" style={styles.button} onPress={pickImage}>
            Open Gallery
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
