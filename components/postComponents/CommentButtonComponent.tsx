import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

interface Props {
  comments: number;
  setIsCommentsOpen: (value:boolean) => void;
}

const CommentButtonComponent: React.FC<Props> = ({ comments, setIsCommentsOpen }) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="comment-outline"
        iconColor="white"
        containerColor="#576CBC"
        mode="contained"
        style={styles.icon}
        size={30}
        onPress={() => setIsCommentsOpen(true)}
      />
      <Text style={styles.comments}>{comments}</Text>
    </View>
  );
};

export default CommentButtonComponent;

const styles = StyleSheet.create({
  container: {},
  icon: {
    zIndex: 1,
    margin: 0,
    backgroundColor: "transparent",
  },
  comments: {
    color: "white",
    textAlign: "center",
  },
});
