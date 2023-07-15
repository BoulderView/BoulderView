import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Pressable,
  View,
  Text,
  Alert,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { postModel } from "../../models/postModel";
import LikeButtonComponent from "./LikeButtonComponent";
import { useDispatch } from "react-redux";
import { updateCurrentPost } from "../../features/post/postListSlice";
import CommentButtonComponent from "./CommentButtonComponent";
import { Avatar } from "react-native-paper";
import { supabase } from "../../lib/supabase";
import CommentBottomSheetComponent from "./CommentBottomSheetComponent";

interface Props {
  videoLink: string;
  visibleVideoKey: string | null;
  postInfo: postModel | null;
}

const VideoComponent: React.FC<Props> = ({
  videoLink,
  visibleVideoKey,
  postInfo,
}) => {
  const videoRef = useRef<Video | null>(null);

  const [videoPaused, setVideoPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileName, setProfileName] = useState<string>();

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleVideoPlayback = async () => {
    if (videoRef.current) {
      if (!videoPaused) {
        await videoRef.current.playAsync().catch((error) => console.log(error)); //ignore this error, bug
      } else {
        await videoRef.current
          .pauseAsync()
          .catch((error) => console.log(error)); // ignore this error, bug
      }
    }
  };

  const fetchPostUser = async (postInfo: postModel) => {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", postInfo.profile_id)
        .single();

      // If there is any form of error
      if (error || status !== 200) {
        throw error;
      }

      if (data) {
        // Casting data to gymModel
        const profileName = data.username as string;
        setProfileName(profileName);
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && postInfo) {
      fetchPostUser(postInfo);
    }
  });

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
    <Pressable
      onPress={() => {
        setVideoPaused(!videoPaused);
        setIsCommentsOpen(false);
      }}
      style={{
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: "black",
      }}
    >
      <Video
        ref={videoRef}
        style={styles.preview}
        source={{ uri: videoLink }}
        resizeMode={ResizeMode.COVER}
        isLooping
      />
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{profileName}</Text>
      </View>
      <View style={styles.captionContainer}>
        <Text style={styles.caption}>{postInfo?.caption}</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar.Icon
          size={100}
          icon="play"
          style={{
            backgroundColor: "transparent",
            opacity: videoPaused ? 0.7 : 0,
          }}
        />
      </View>
      <View style={styles.likeContainer}>
        <LikeButtonComponent />
      </View>
      <View style={styles.commentContainer}>
        <CommentButtonComponent
          comments={0}
          setIsCommentsOpen={setIsCommentsOpen}
        />
      </View>
      {postInfo && isCommentsOpen &&
        <CommentBottomSheetComponent
          setIsCommentsOpen={setIsCommentsOpen}
          postId={postInfo.id}
        />
      }
    </Pressable>
  );
};

export default VideoComponent;

const styles = StyleSheet.create({
  preview: {
    width: "100%",
    height: "100%",
  },
  likeContainer: {
    position: "absolute",
    bottom: 80,
    right: 0,
    zIndex: 1,
    padding: 10,
  },
  commentContainer: {
    position: "absolute",
    bottom: 10,
    right: 0,
    zIndex: 1,
    padding: 10,
  },
  captionContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    zIndex: 1,
    padding: 10,
  },
  caption: {
    color: "white",
  },
  avatarContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1,
    transform: [
      { translateX: -50 }, // Adjusted to half the icon size
      { translateY: -50 }, // Adjusted to half the icon size
    ],
  },
  usernameContainer: {
    position: "absolute",
    bottom: 100,
    left: 0,
    zIndex: 1,
    padding: 10,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
