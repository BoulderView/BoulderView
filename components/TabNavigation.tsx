// TabBar.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import MapComponent from './homeComponents/MapComponent';
import ExploreComponent from './homeComponents/ExploreComponent';
import LeaderboardComponent from './homeComponents/LeaderboardComponent';

// Enum all tabs
enum Tab {
  MapComponent,
  ExploreComponent,
  LeaderboardComponent,
}

const TabBar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.MapComponent);

  const renderSelectedTab = () => {
    switch (selectedTab) {
      case Tab.MapComponent:
        return <MapComponent />;
      case Tab.ExploreComponent:
        return <ExploreComponent />;
      case Tab.LeaderboardComponent:
        return <LeaderboardComponent />;
      default:
        return null;
    }
  };

  const handleTabPress = (tab: Tab) => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={selectedTab === Tab.MapComponent ? styles.selectedTab : styles.tab}
          onPress={() => handleTabPress(Tab.MapComponent)}
        >
          <Text style={{
            color: selectedTab === Tab.MapComponent ? "#A5D7E8" : "white"
          }}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedTab === Tab.ExploreComponent ? styles.selectedTab : styles.tab}
          onPress={() => handleTabPress(Tab.ExploreComponent)}
        >
          <Text style={{
            color: selectedTab === Tab.ExploreComponent ? "#A5D7E8" : "white"
          }}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedTab === Tab.LeaderboardComponent ? styles.selectedTab : styles.tab}
          onPress={() => handleTabPress(Tab.LeaderboardComponent)}
        >
          <Text style={{
            color: selectedTab === Tab.LeaderboardComponent ? "#A5D7E8" : "white"
          }}>Leaderboard</Text>
        </TouchableOpacity>
      </View>
      {renderSelectedTab()}
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
