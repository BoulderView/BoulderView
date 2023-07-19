import React, { Dispatch, SetStateAction } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider, IconButton, List } from "react-native-paper";

interface Props {
  setIsSelectingGrade: Dispatch<SetStateAction<boolean>>;
  setSelectedGrade: Dispatch<SetStateAction<string | null>>;
  gymGrades: string[] | undefined;
}

const PickGradeComponent: React.FC<Props> = ({
  setIsSelectingGrade,
  setSelectedGrade,
  gymGrades,
}) => {
  const selectGrade = (selectedGrade: string) => {
    setSelectedGrade(selectedGrade);
    setIsSelectingGrade(false);
  };

  const renderGym = (item: string, index: number) => (
    <React.Fragment key={index.toString()}>
      <List.Item
        title={item}
        left={(props) => <List.Icon {...props} icon="folder" />}
        onPress={() => selectGrade(item)}
      />
      <Divider />
    </React.Fragment>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <IconButton
          icon="arrow-left"
          iconColor="white"
          containerColor="#576CBC"
          size={25}
          mode="contained"
          onPress={() => setIsSelectingGrade(false)}
        />
        <View style={styles.textContainer}>
          <Text>Select Grade</Text>
        </View>
      </View>
      <View style={styles.scrollView}>
        {gymGrades && (
          <ScrollView>
            {gymGrades.map((item, index) => renderGym(item, index))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default PickGradeComponent;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  scrollView: {
    width: "100%",
    flex: 1,
  },
  textContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});
