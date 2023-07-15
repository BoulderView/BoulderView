import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Avatar, TextInput, Button } from "react-native-paper";
import { supabase } from "../../lib/supabase";
import { commentModel } from "../../models/commentModel";
import { useSelector } from "react-redux";
import { selectProfile } from "../../features/profile/profileSlice";

interface Props {
  postId: string | undefined;
  setCommentList: (commentList: commentModel[]) => void;
  commentList: commentModel[] | undefined;
}

const CommentInputComponent: React.FC<Props> = ({
  postId,
  setCommentList,
  commentList,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState<string>("");

  const profile = useSelector(selectProfile);

  const uploadComments = async () => {
    try {
      if (!profile) return Alert.alert("log in first");

      if (!postId) return Alert.alert("postId cannot be found");

      const updateComment: commentModel = {
        created_at: new Date(),
        comment: newComment,
        post_id: postId as string, // will not be able to upload if postId is not defined
        profile_id: profile.id,
        likes: 0,
        commenter_username: profile.username
      };

      let { error } = await supabase.from("comments").upsert(updateComment);

      if (!commentList) {
        setCommentList([updateComment]);
      } else {
        setCommentList([updateComment, ...commentList]);
      }

      // If there is any form of error
      if (error) {
        throw error;
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.textInputContainer}>
      <View style={styles.iconsContainer}>
        <Avatar.Icon size={40} icon="folder" />
      </View>
      <TextInput
        multiline={true}
        style={styles.textInput}
        onChangeText={(text) => setNewComment(text)}
      />
      <View style={styles.iconsContainer}>
        <Button
          disabled={(newComment === "" && !postId) || isLoading ? true : false}
          onPress={() => {
            setIsLoading(true);
            uploadComments();
          }}
        >
          Post
        </Button>
      </View>
    </View>
  );
};

export default CommentInputComponent;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    margin: 5,
  },
  textInputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    bottom: 0,
    position: "absolute",
    padding: 5,
    borderTopWidth: 0.5,
    color: "grey",
  },
  iconsContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    paddingVertical: 10,
  },
});
