import React from "react";
import { commentModel } from "../../models/commentModel";
import { Avatar, Card, IconButton } from "react-native-paper";

interface Props {
  comment: commentModel;
}

const CommentCardComponent: React.FC<Props> = ({ comment }) => {
  return (
    <Card.Title
      title={!comment.commenter_username ? "anon" : comment.commenter_username}
      subtitle={comment.comment}
      left={(props) => <Avatar.Icon {...props} icon="folder" />}
      right={(props) => (
        <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
      )}
      style={{width:"100%"}}
    />
  );
};

export default CommentCardComponent;
