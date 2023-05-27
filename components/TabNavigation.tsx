import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'react-router-native';

interface Tab {
  id: number;
  title: string;
  route: string;
}

const TabNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: Tab[] = [
    {
      id: 0,
      title: 'Tab 1',
      route: '/tab1',
    },
    {
      id: 1,
      title: 'Tab 2',
      route: '/tab2',
    },
    {
      id: 2,
      title: 'Tab 3',
      route: '/tab3',
    },
  ];

  const renderTab = (tab: Tab) => {
    const isActive = tab.id === activeTab;

    return (
      <Link
        key={tab.id}
        to={tab.route}
        style={[styles.tab, isActive ? styles.activeTab : null]}
        onPress={() => setActiveTab(tab.id)}
        underlayColor="transparent"
      >
        <Text style={styles.tabText}>{tab.title}</Text>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map(renderTab)}
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    width: windowWidth,
  },
  tab: {
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TabNavigation;
