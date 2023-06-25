import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, Pressable } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { postModel } from '../../models/postModel';
import VideoIconComponent from './VideoIconComponent';
import { useDispatch } from 'react-redux';
import { updateCurrentPost } from '../../features/post/postListSlice';

interface Props {
  videoLink:string,
  visibleVideoKey: string | null,
  postInfo: postModel | null
}

const VideoComponent:React.FC<Props> = ({ 
  videoLink, 
  visibleVideoKey, 
  postInfo 
}) => {
  
  const videoRef = useRef<Video | null>(null);

  const [videoPaused, setVideoPaused] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!videoPaused) {
      videoRef.current?.playAsync();
    } else {
      videoRef.current?.pauseAsync();
    }
  }, [videoPaused]);

  useEffect(() => {
    if (postInfo && visibleVideoKey === postInfo.id) {
      setVideoPaused(false);
      dispatch(updateCurrentPost(postInfo));
    } else {
      setVideoPaused(true);
    }
  }, [visibleVideoKey]);

  return (
    <View style={{
      height: Dimensions.get("window").height - useBottomTabBarHeight() - useHeaderHeight(),
      width: Dimensions.get("window").width,
      backgroundColor:"black"
    }}>
      <Pressable onPress={() => setVideoPaused(!videoPaused)}>
        <Video
          ref={videoRef}
          style={styles.preview}
          source={{uri: videoLink}}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
        >
          <VideoIconComponent />
      </Video>
      </Pressable>
    </View>
  )
}
  
export default VideoComponent;

const styles = StyleSheet.create({
  preview: {
    width:"100%",
    height:"100%",
  },
})
