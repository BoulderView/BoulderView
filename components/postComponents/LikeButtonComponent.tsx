import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Text, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPost, updateCurrentPostLikes } from '../../features/post/postListSlice';
import { selectSession, selectProfile, updateLike, updateProfile } from '../../features/profile/profileSlice';
import { supabase } from '../../lib/supabase';
import { profileModel } from '../../models/profileModel';
import { postModel } from '../../models/postModel';

interface Props {
  likes:number
}

const LikeButtonComponent:React.FC<Props> = ({likes}) => {

  const currentPostState = useSelector(selectCurrentPost);
  const profileState = useSelector(selectProfile);

  const [isLikedByUser, setIsLikedByUser] = useState(false);

  const dispatch = useDispatch();
  const session = useSelector(selectSession);

  // update liked_post_id for the profile
  async function updateProfileUpload(likedPostArray:string[]) {
    try {
      if (!profileState) throw new Error('Unable to store profile...');

      if (!currentPostState) throw new Error('Unable to store current post...');

      const updates:profileModel = {
        id: profileState.id,
        full_name: profileState.full_name,
        username: profileState.username,
        description: profileState.description,
        avatar_url: profileState.avatar_url,
        updated_at: profileState.updated_at,
        liked_post_id: likedPostArray,
      }

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }

      dispatch(updateLike(likedPostArray));
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
      console.log(error);

    }
  }

  // Update the number of likes for the post
  async function updateCurrentPost(newLikes:number) {
    try {
      if (!currentPostState) throw new Error('Unable to store current post...');

      const updates:postModel = {
        id: currentPostState.id,
        caption: currentPostState.caption,
        post_video_url: currentPostState.post_video_url,
        post_thumbnail_url: currentPostState.post_thumbnail_url,
        profile_id: currentPostState.profile_id,
        created_at: currentPostState.created_at,
        updated_at: currentPostState.updated_at,
        gym_id: currentPostState.gym_id,
        is_private: currentPostState.is_private,
        selected_grade: currentPostState.selected_grade,
        likes: newLikes
      }

      let { error } = await supabase.from('post').upsert(updates);

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

  async function getProfile() {
    try {
      if (!session?.user) throw new Error('No user on the session!');

      let { data, error, status } = await supabase
        .from('profiles')
        .select()
        .eq('id', session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        const updatedData = data as profileModel;
        dispatch(updateProfile(updatedData));
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  // handle like and dislike
  const handleLikePressed = () => {
    if (!profileState || !currentPostState || !currentPostState.id) {
      console.log("something went wrong")
      return;
    }

    let newLikes = currentPostState.likes
    let newBasket = [...profileState.liked_post_id];

    // If it is previously liked by a user, remove the like
    if (isLikedByUser) {
      newLikes -= 1;
      const index = profileState.liked_post_id.findIndex(
        (item) => item === currentPostState.id
      )

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`unable to remove like ${currentPostState.id}`);
      }
    // Adding a like
    } else {
      newLikes += 1;
      newBasket = newBasket.concat(currentPostState.id);
    }

    // Updating supabase
    updateProfileUpload(newBasket);
    updateCurrentPost(newLikes);

    // Updating global states
    dispatch(updateLike(newBasket));
    dispatch(updateCurrentPostLikes(newLikes));
  }

  // conditionally check if the user has liked this post already of not
  useEffect(() => {
    if (!profileState) {
      getProfile();
    }
    
    if (profileState && currentPostState && currentPostState.id) {
      setIsLikedByUser(profileState.liked_post_id.includes(currentPostState.id))
    }
  }, [profileState, currentPostState])

  return (
    <View style={styles.container}>
      <IconButton
        icon="heart-outline"
        iconColor={isLikedByUser ? "red" : "white"}
        containerColor="#576CBC"
        mode="contained"
        style={styles.icon}
        size={30}
        onPress={() => handleLikePressed()}
      />
      <Text style={styles.likes}>{likes}</Text>
    </View>
  );
};

export default LikeButtonComponent;

const styles = StyleSheet.create({
  container: {
  },
  icon: {
    zIndex: 1,
    margin:0,
    backgroundColor:"transparent"
  },
  likes: {
    color:"white",
    textAlign:"center"
  }
});
