import { useRouter } from 'expo-router';
import * as React from 'react';
import { View, StyleSheet, ImageSourcePropType } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";

export const HomeCard = (props: {
  id: number;
  title: string;
  coverImage: ImageSourcePropType;
  content: string;
}) => {

  const router = useRouter();

  return (
    <View style={styles.homecard}>
      {/* Will go to the gym page when the button is pressed */}
      <Card onPress={() => {
        router.push(`/home/${props.id}`)
      }}>
        <Card.Cover source={props.coverImage}></Card.Cover>
        <Card.Content>
          <Title>{props.title}</Title>
        </Card.Content>
        <Card.Content>
          <Paragraph>{props.content}</Paragraph>
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
