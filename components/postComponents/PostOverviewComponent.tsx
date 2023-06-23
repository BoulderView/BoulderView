import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';

import { profileModel } from '../../models/profileModel';
import LoadingComponent from '../imageComponents/LoadingComponent';

// Calculating the screen and maintaining an aspect ratio
const { width } = Dimensions.get('window');
const containerWidth = width * 0.45;
const containerHeight = containerWidth * (16 / 9);

interface Props {
  videoUrl:string;
  thumbnailUrl:string,
  caption:string;
  profileId:string;
  likes:number;
  selectedGrade:string | null;
  createdAt: Date;
}

const PostOverviewComponent:React.FC<Props> = ({
  videoUrl,
  thumbnailUrl,
  caption,
  profileId,
  likes,
  selectedGrade,
  createdAt
}) => {

  const [user, setUser] = useState<profileModel>();
  const [postvideoUri, setPostvideoUri] = useState<string|null>(null)
  const [thumbnailUri, setThumbnailUri] = useState<string|null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let { data, error, status } = await supabase
          .from('profiles')
          .select()
          .eq("id", profileId)
          .single()
  
        // If there is any form of error
        if (error || status !== 200) {
          throw error;
        }
  
        if (data) {
          // Casting data to gymModel
          const updatedData = data as profileModel;
          setUser(updatedData);
        }
  
      } catch (error: any) {
        Alert.alert(error.message);
      }
    };

    const fetchPostVideo = async () => {
      try {
        const { data, error } = await supabase.storage.from('postVideos').download(videoUrl);
  
        if (error) {
          throw error
        }
  
        const fr = new FileReader()
        fr.readAsDataURL(data)
        fr.onload = () => {
          setPostvideoUri(fr.result as string)
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log('Error downloading image: ', error.message)
        }
      }
    }

    const fetchThumbnail = async () => {
      try {
        const { data, error } = await supabase.storage.from('postThumbnails').download(thumbnailUrl);
  
        if (error) {
          throw error
        }
  
        const fr = new FileReader()
        fr.readAsDataURL(data)
        fr.onload = () => {
          setThumbnailUri(fr.result as string)
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log('Error downloading image: ', error.message)
        }
      }
    }
  
    fetchUserData();
    fetchPostVideo();
    fetchThumbnail()
  }, [thumbnailUri, postvideoUri]);

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
      {thumbnailUri ? (
        <Image
          source={{ uri: thumbnailUri }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <LoadingComponent />
      )}
      </View>
      <View style={styles.bottomContainer}>
        <Text>
          {caption.length > 20 // limit the caption size to 20 char
            ? caption.substring(0, 20) + "..."
            : caption.length === 0
            ? "no caption"
            :caption.trim()}
        </Text>
        <View style={styles.bottomView}>
          <Text style={styles.title}>{user?.username}</Text>
          <Text>❤️{likes}</Text>
        </View>
      </View>
    </View>
  )
};

export default PostOverviewComponent;

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    width:containerWidth,
    height:containerHeight,
    padding:5,
    margin:5
  },
  bottomView: {
    flexDirection:"row",
    flex:0,
    justifyContent:"space-between",
  },
  bottomContainer: {
    width:"100%",
    height:"20%",
    margin:5,
    justifyContent: 'space-between',
    padding:5
  },
  postContainer: {
    width:"100%",
    height:"80%",
    alignItems:"center"
  },
  image: {
    width:"100%",
    height:"100%",
    borderRadius:8
  },
  title: {
    fontWeight:"bold"
  }
})
