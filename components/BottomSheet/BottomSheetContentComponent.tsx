import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";

interface Props {
  icon: string;
  content: string;
  name: string;
}

export const BottomSheetContentComponent = ({ icon, content, name }: Props) => {
  return (
    <View style={styles.contentComponentContainer}>
      <Avatar.Icon
        size={50}
        color="black"
        icon={icon}
        style={{
          backgroundColor: "#A5D7E8",
        }}
      />
      <View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
  },
  contentContainer: {
    height: "65%",
    width: "100%",
    margin: 5,
  },
  contentComponentContainer: {
    flexDirection: "row",
    margin: 5,
  },
});
