import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ResizeMode, Video } from 'expo-av';

interface Props {
  videoLink:string
}

const VideoComponent:React.FC<Props> = ({ videoLink }) => {
  
    const videoRef = useRef(null);

    useEffect(() => {
      console.log(videoLink);
    }, [])
  
    return (
      <View style={styles.container}>
        <Video
          ref={videoRef}
          style={styles.preview}
          source={{uri: videoLink}}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
        />
      </View>
    )
  }
  
  export default VideoComponent;
  
  const styles = StyleSheet.create({
    preview: {
      width:"100%",
      height:"100%",
    },
    container: {
      height: Dimensions.get("window").height - 100,
      width: Dimensions.get("window").width,
      justifyContent: "flex-start",
      alignItems:"flex-start",
      alignSelf:"flex-start",
    }
  })
  

