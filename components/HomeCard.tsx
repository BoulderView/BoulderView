import * as React from 'react';
import { Text, View, StyleSheet, ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";

export const HomeCard = (props: {
    title: string;
    coverImage: ImageSourcePropType;
    content: string;
}) => {
    return (
        <View style={styles.homecard}>
            <Card>
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
        </View>);
}

const styles = StyleSheet.create({
    homecard: {
        flex: 0,
        paddingHorizontal: 5,
        paddingVertical: 3,
        width: '100%',
    },
});