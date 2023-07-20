import { useSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import VideoScrollComponent from "../../../../components/postComponents/VideoScrollComponent";
import { selectPostList } from "../../../../features/post/postListSlice";

const VideoPage = () => {
  const { video } = useSearchParams();

  const postList = useSelector(selectPostList);

  return (
    <View style={styles.container}>
      <VideoScrollComponent
        video_url={video as string}
        postList={postList}
      />
    </View>
  );
};

export default VideoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
