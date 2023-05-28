// TabBar.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { TabObject } from '../models/TabObject';

interface Props {
  tabObject:TabObject;
}

const TabBar = ({ tabObject }:Props) => {
  const [selectedTab, setSelectedTab] = useState(Object.keys(tabObject)[0]);

  const handleTabPress = (tabKey: string) => {
    setSelectedTab(tabKey);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {Object.entries(tabObject).map(([tabKey, tab]) => (
          <TouchableOpacity
            key={tab.title}
            style={selectedTab === tabKey ? styles.selectedTab : styles.tab}
            onPress={() => handleTabPress(tabKey)}
          >
            <Text style={{ color: selectedTab === tabKey ? '#A5D7E8' : 'white' }}>{tab.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {tabObject[selectedTab].component}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%"
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#19376D',
    height: 40,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:40
  },
  selectedTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#A5D7E8',
    height:40
  },
});

export default TabBar;
