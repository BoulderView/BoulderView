import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

interface Props {
  setIsCommentsOpen: (value:boolean) => void;
}

const CommentButtonComponent: React.FC<Props> = ({ setIsCommentsOpen }) => {
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
