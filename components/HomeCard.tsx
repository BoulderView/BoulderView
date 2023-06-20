import { useRouter } from 'expo-router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ImageSourcePropType, Alert } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { supabase } from '../lib/supabase';

export const HomeCard = (props: {
  id: string;
  name: string;
  coverImage: string;
  description: string;
}) => {

  const [coverImageUrl, setCoverImageUrl] = useState<string>();

  useEffect(() => {
    if (props.coverImage) downloadImage(props.coverImage);
  }, [props.coverImage])

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
        setCoverImageUrl(fr.result as string);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error downloading image: ', error.message);
      }
    }
  }

  const router = useRouter();

  return (
    <View style={styles.homecard}>
      {/* Will go to the gym page when the button is pressed */}
      <Card onPress={() => {
        router.push({pathname: `/home/${props.id}`})
      }}>
        <Card.Cover source={{ uri:coverImageUrl}}></Card.Cover>
        <Card.Content>
          <Title>{props.name}</Title>
        </Card.Content>
        <Card.Content>
          <Paragraph>{props.description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Favourite</Button>
        </Card.Actions>
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
