import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { Button, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import * as ImagePicker from "expo-image-picker";
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostScreen= () => {


  // Camera
  let cameraRef = useRef<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);

  // Media
  const [media, setMedia] = useState<ImagePicker.ImagePickerAsset | CameraCapturedPicture | undefined>();

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

  // handles taking pictures and videos
  const takeMedia = async () => {
    /*
      Options for the pictures 
      quality: 1 for best quality pictures
      exif: remove shutter speed and other camera options
    */
    let newMedia = await cameraRef.current?.takePictureAsync({
      quality:1,
      base64:true,
      exif:false
    });
    setMedia(newMedia);
  }

  // Preview the media
  if (media) {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + media.base64 }} />
        <Button mode="contained" style={styles.button} onPress={() => {setMedia(undefined);}}>
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
          <View style={styles.topSubContainer}>
            <IconButton
              icon="arrow-left"
              iconColor="white"
              containerColor="#576CBC"
              size={25}
              mode="contained"
              onPress={() => handleGoBack()}
            />
          </View>
          <View style={styles.bottomSubContainer}>
            <IconButton
              icon="image"
              iconColor="white"
              containerColor="transparent"
              size={30}
              onPress={pickMedia}
            />
            <IconButton
              icon="radiobox-marked"
              iconColor="white"
              containerColor="transparent"
              size={60}
              mode="contained"
              onPress={takeMedia}
            />
            <IconButton
              icon="camera-flip-outline"
              iconColor="white"
              containerColor="transparent"
              size={30}
              mode="contained"
              onPress={toggleCameraType}
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
