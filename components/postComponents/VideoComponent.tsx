import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface Props {
  videoLink:string,
  visibleVideoKey: string | null,
  videoKey: string
}

const VideoComponent:React.FC<Props> = ({ videoLink, visibleVideoKey, videoKey }) => {
  
  const videoRef = useRef<Video | null>(null);

  useEffect(() => {
    if (visibleVideoKey === videoKey) {
      videoRef.current?.playAsync();
    } else {
      videoRef.current?.pauseAsync();
    }
  }, [visibleVideoKey]);

  return (
    <View style={{
      height: Dimensions.get("window").height - useBottomTabBarHeight() - useHeaderHeight(),
      width: Dimensions.get("window").width,
    }}>
      <Video
        ref={videoRef}
        style={styles.preview}
        source={{uri: videoLink}}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </View>
  )
}
  
export default VideoComponent;

const styles = StyleSheet.create({
  preview: {
    width:"100%",
    height:"100%",
  }
})
