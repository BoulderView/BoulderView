import { MediaLibraryPermissionResponse, PermissionResponse } from 'expo-image-picker';
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
  cameraPermission: PermissionResponse;
  galleryPermission: MediaLibraryPermissionResponse;
  requestCameraPermission: () => void;
  requestGalleryPermission: () => void;
}
const NoPermissionsComponent:React.FC<Props> = ({ 
  cameraPermission, 
  galleryPermission,
  requestCameraPermission,
  requestGalleryPermission
}) => {
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
  )
}

export default NoPermissionsComponent;
