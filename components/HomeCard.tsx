import { useRouter } from 'expo-router';
import * as React from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, Alert } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { supabase } from '../lib/supabase';
import { useDispatch, useSelector } from 'react-redux';
import { selectGymImage, updateGymImage } from '../features/gyms/gymImageSlice';

export const HomeCard = (props: {
  id: string;
  name: string;
  coverImage: string;
  description: string;
}) => {

  const gymImage = useSelector(selectGymImage);
  const dispatch = useDispatch();

  // Retrieving image directly from supabase
  const downloadImage = async  (coverImage: string) => {
    try {
      const { data, error } = await supabase.storage.from('homeCardImages').download(coverImage);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        const value = fr.result as string;
        const key = props.name;
        dispatch(updateGymImage({key, value}));
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error downloading image: ', error.message);
      }
    }
  }

  useEffect(() => {
    // Only download when not downloaded before
    if (!(props.name in gymImage)) {
      downloadImage(props.coverImage);
    }
  }, [])

  const router = useRouter();

  return (
    <View style={styles.homecard}>
      {/* Will go to the gym page when the button is pressed */}
      <Card onPress={() => {
        router.push({pathname: `/home/${props.id}`})
      }}>
        <Card.Cover source={{ uri:gymImage[props.name]}}></Card.Cover>
        <Card.Content>
          <Title>{props.name}</Title>
        </Card.Content>
        <Card.Content>
          <Paragraph>{props.description}</Paragraph>
        </Card.Content>
        {/* <Card.Actions>
          <Button>Favourite</Button>
        </Card.Actions> */}
      </Card>
    </View>
    
  );
}

const styles = StyleSheet.create({
  homecard: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    flex:1
  },
});
