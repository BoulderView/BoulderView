import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Avatar, Card, Divider } from 'react-native-paper';

/*
  dummy data for leaderboard
*/
const LEADER_DATA = [
  {
    id: 1,
    name: "Alex Honnold",
    desc: "Red V9 overhang",
    time: "8m ago"
  },
  {
    id: 2,
    name: "AwesomeBoulderDuck",
    desc: "Blue V9 overhang",
    time: "8m ago"
  },
  {
    id: 3,
    name: "Zheng Jing",
    desc: "Red V9 overhang",
    time: "8m ago"
  },
  {
    id: 4,
    name: "Kurt",
    desc: "Red V9 overhang",
    time: "8m ago"
  },
  {
    id: 5,
    name: "Alex Honnold",
    desc: "Red V9 overhang",
    time: "8m ago"
  },
  {
    id: 6,
    name: "Alex Honnold",
    desc: "Red V9 overhang",
    time: "8m ago"
  },
  {
    id: 7,
    name: "AwesomeBoulderDuck",
    desc: "Blue V9 overhang",
    time: "8m ago"
  },
  {
    id: 8,
    name: "Zheng Jing",
    desc: "Red V9 overhang",
    time: "8m ago"
  },
  {
    id: 9,
    name: "Kurt",
    desc: "Red V9 overhang",
    time: "8m ago"
  },
  {
    id: 10,
    name: "Alex Honnold",
    desc: "Red V9 overhang",
    time: "8m ago"
  }
]

const LeaderboardComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hardest climbs</Text>
      <FlatList
        data={LEADER_DATA}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) =>
            <Card.Title
            title={item.name}
            subtitle={item.desc}
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            right={() => <Text style={styles.time}>{item.time}</Text>}
          />}
      />
    </View>
  );
};

export default LeaderboardComponent;

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  text: {
    margin:10
  },
  time: {
    margin: 10,
    color: "#576CBC"
  }
})
