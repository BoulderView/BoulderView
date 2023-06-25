import * as React from 'react';
import { View, Easing, StyleSheet, Button } from "react-native";
import TabNavigation from '../../../components/TabNavigation';
import HistoryComponent from '../../../components/statsComponents/HistoryComponent';
import { TabObject } from '../../../models/TabObject';
import WorkoutComponent from '../../../components/statsComponents/WorkoutComponent';
import DashboardComponent from '../../../components/statsComponents/DashboardComponent';

const tabObject: TabObject = {
  DashboardComponent: {
    title: 'Dashboard',
    component: <DashboardComponent />
  },
  HistoryComponent: {
    title: 'History',
    component: <HistoryComponent />,
  },
  WorkoutComponent: {
    title: 'Workouts',
    component: <WorkoutComponent />,
  },
};

// Still a work in progress
const ClimbsScreen = () => {
  return (
    <View style={styles.container}>
      <TabNavigation tabObject={tabObject} />
    </View>

  );
};

export default ClimbsScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
});