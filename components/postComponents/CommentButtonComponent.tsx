import react from 'react';
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const CommentButtonComponent = () => {
  return (
    <IconButton
        icon="comment"
        iconColor="white"
        containerColor="#576CBC"
        mode="contained"
        style={styles.icon}
        size={30}
    />
  )
}

export default CommentButtonComponent;

const styles = StyleSheet.create({
  icon: {
    marginVertical: 5,
    zIndex: 1,
  }
})
