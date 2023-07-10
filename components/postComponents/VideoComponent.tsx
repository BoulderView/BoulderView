import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Dimensions, Pressable, View, Text } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { postModel } from '../../models/postModel';
import LikeButtonComponent from './LikeButtonComponent';
import { useDispatch } from 'react-redux';
import { updateCurrentPost } from '../../features/post/postListSlice';
import CommentButtonComponent from './CommentButtonComponent';

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

  const handleVideoPlayback = async () => {
    if (videoRef.current) {
      if (!videoPaused) {
        await videoRef.current.playAsync().catch((error) => console.log(error)); //ignore this error, bug
      } else {
        await videoRef.current.pauseAsync().catch((error) => console.log(error)); // ignore this error, bug
      }
    }
  }

  useEffect(() => {
    handleVideoPlayback();
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
    <Pressable onPress={() => setVideoPaused(!videoPaused)} style={{
      height: Dimensions.get("window").height,
      width: Dimensions.get("window").width,
      backgroundColor:"black"
    }}>
      <Video
        ref={videoRef}
        style={styles.preview}
        source={{uri: videoLink}}
        resizeMode={ResizeMode.COVER}
        isLooping
      />
      <View style={styles.captionContainer}>
        <Text style={styles.caption}>
          {postInfo?.caption}
        </Text>
      </View>
      <View style={styles.likeContainer}>
        <LikeButtonComponent likes={postInfo ? postInfo.likes : 0}/>
      </View>
      <View style={styles.commentContainer}>
        <CommentButtonComponent comments={0}/>
      </View>
    </Pressable>
  )
}
  
export default VideoComponent;

const styles = StyleSheet.create({
  preview: {
    width:"100%",
    height:"100%",
  },
  likeContainer: {
    position: 'absolute',
    bottom: 80,
    right: 0,
    zIndex: 1,
    padding: 10,
  },
  commentContainer: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    zIndex: 1,
    padding: 10,
  },
  captionContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    zIndex: 1,
    padding: 10,
  },
  caption: {
    color:"white"
  }
})
