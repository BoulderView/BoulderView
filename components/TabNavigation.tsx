// TabBar.tsx
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TabObject } from "../models/TabObject";

/* 
  Have to provide a tabObject in this manner for it to work
  const tabObject: TabObject = {
    LocationsComponent: {
      title: 'Locations',
      component: <LocationsComponent />,
    },
    FavouritesComponent: {
      title: 'Favourites',
      component: <FavouritesComponent />,
    },
  };
*/

interface Props {
  tabObject: TabObject;
}

const TabBar = ({ tabObject }: Props) => {
  const [selectedTab, setSelectedTab] = useState(Object.keys(tabObject)[0]);

  const handleTabPress = (tabKey: string) => {
    setSelectedTab(tabKey);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <View style={styles.tabBar}>
          {Object.entries(tabObject).map(([tabKey, tab]) => (
            <TouchableOpacity
              key={tab.title}
              style={selectedTab === tabKey ? styles.selectedTab : styles.tab}
              onPress={() => handleTabPress(tabKey)}
            >
              <Text
                style={
                  selectedTab === tabKey ? styles.selectedText : styles.text
                }
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {tabObject[selectedTab].component}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  navContainer: {
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#0B2447",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#C3C3C3",
    width: "95%",
    borderWidth: 1,
    borderRadius: 40,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C3C3C3",
    borderRadius: 40,
    height: 40,
  },
  selectedTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    height: 40,
  },
  text: {
    color: "#000000",
    fontSize: 16,
  },
  selectedText: {
    color: "#A5D7E8",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TabBar;
