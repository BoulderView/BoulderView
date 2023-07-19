import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  matchCommentLikes,
  updateCurrentComment
} from "../../features/comment/commentListSlice";
import {
  selectProfile,
  selectSession,
  updateCommentArray
} from "../../features/profile/profileSlice";
import { supabase } from "../../lib/supabase";
import { commentModel } from "../../models/commentModel";
import { profileModel } from "../../models/profileModel";

interface Props {
  comment: commentModel;
}

/* 
- Add like function
- Retrive profile pic from the database
*/

const CommentCardComponent: React.FC<Props> = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(false);

  const profile = useSelector(selectProfile);
  const session = useSelector(selectSession);
  const dispatch = useDispatch();

  // Takes in the likedCommentArray and updates the server
  async function updateProfileUpload(likedCommentArray: string[]) {
    try {
      if (!session) throw new Error("No user on the session!");

      if (profile === null) throw new Error("Unable to store profile...");

      const updates: profileModel = {
        id: profile.id,
        full_name: profile.full_name,
        username: profile.username,
        description: profile.description,
        avatar_url: profile.avatar_url,
        updated_at: profile.updated_at,
        liked_post_id: profile.liked_post_id,
        liked_comment_id: likedCommentArray,
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }

      dispatch(updateCommentArray(likedCommentArray));
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  // Takes in the likedCommentArray and updates the server
  async function updateCommentUpload(comment: commentModel) {
    try {
      if (!comment.id) {
        return Alert.alert("Cannot find comment id");
      }

      let { error } = await supabase.from("comments").upsert(comment);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
      console.log(error);
    }
  }

  // handle like and dislike
  const handleLikePressed = () => {
    if (!profile) {
      console.log("something went wrong");
      return;
    }

    if (!comment.id) {
      return Alert.alert("Cannot find comment id");
    }

    let profileCommentArray = profile.liked_comment_id;
    if (isLiked) {
      // Do something to dislike the comment
      comment.likes -= 1;
      profileCommentArray = profileCommentArray.filter(
        (commentId) => commentId !== comment.id
      );
    } else {
      // Do something to like the comment
      comment.likes += 1;
      profileCommentArray = [...profileCommentArray, comment.id];
    }

    // Updating details of this comment
    dispatch(updateCurrentComment(comment));

    // Uploading to the database
    updateCommentUpload(comment);
    updateProfileUpload(profileCommentArray);

    // Updating the comment list
    dispatch(matchCommentLikes());
  };

  useEffect(() => {
    if (
      comment.id &&
      profile &&
      profile.liked_comment_id.includes(comment.id)
    ) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [profile]);

  return (
    <View style={styles.container}>
      <View>
        <Avatar.Icon style={styles.avatarStyle} size={40} icon="account" />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.textStyle}>
            {comment.commenter_username === ""
              ? "anonymous"
              : comment.commenter_username}
          </Text>
          <Text style={{ marginHorizontal: 10 }}>•</Text>
          <Text>{comment.likes} {comment.likes > 1 ? "likes" : "like"}</Text>
        </View>
        <Text>{comment.comment}</Text>
      </View>
      <IconButton
        style={styles.avatarStyle}
        icon={isLiked ? "heart" : "heart-outline"}
        iconColor={isLiked ? "red" : "grey"}
        onPress={() => handleLikePressed()}
      />
    </View>
  );
};

export default CommentCardComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  textContainer: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
  },
  avatarStyle: {
    margin: 10,
  },
  textStyle: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
  },
});
