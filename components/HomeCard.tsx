import * as React from 'react';
import { Text, View, StyleSheet, ImageSourcePropType } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";

export const HomeCard = (props: {
    title: string;
    coverImage: ImageSourcePropType;
    content: string;
}) => {
    return (
        <View style={styles.container}>
            <Card>
                <Card.Cover source={props.coverImage} style={{ width: 350, height: 350 }}></Card.Cover>
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
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "white",
    },
});