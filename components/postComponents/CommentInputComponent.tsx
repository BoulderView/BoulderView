import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View, Keyboard } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { selectAvatar, selectProfile, updateAvatar } from "../../features/profile/profileSlice";
import { supabase } from "../../lib/supabase";
import { commentModel } from "../../models/commentModel";

interface Props {
  postId: string | undefined;
  setUpdatedCommentList: (updateCommentList:boolean) => void;
}

const CommentInputComponent: React.FC<Props> = ({
  postId,
  setUpdatedCommentList,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState<string>("");

  const profile = useSelector(selectProfile);

  const avatar = useSelector(selectAvatar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!avatar && profile) {
      downloadImage();
    }
  }, []);

  // Retrieving image directly from supabase
  async function downloadImage() {
    if (!profile) return Alert.alert("unable to load profile pic");
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(profile.avatar_url);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        const result = fr.result as string;
        dispatch(updateAvatar(result));
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

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
        commenter_username: profile.username,
      };

      let { error } = await supabase.from("comments").upsert(updateComment);
      
      setUpdatedCommentList(true);
      setNewComment("");
      Keyboard.dismiss()

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
        {avatar ? (
          <Avatar.Image size={40} source={{ uri: avatar }} />
        ) : (
          <Avatar.Icon size={40} icon="account" />
        )}
      </View>
      <TextInput
        multiline={true}
        style={styles.textInput}
        onChangeText={(text) => setNewComment(text)}
        value={newComment}
      />
      <View style={styles.iconsContainer}>
        <Button
          disabled={newComment === "" || !postId ? true : false}
          loading={isLoading}
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
    bottom: 30,
    position: "absolute",
    paddingHorizontal: 10,
    borderTopWidth: 0.5,
    backgroundColor: "white",
  },
  iconsContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    paddingVertical: 10,
  },
});
