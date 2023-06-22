import * as React from 'react';
import { View, Easing, StyleSheet, Button } from "react-native";
import TabNavigation from '../../../components/TabNavigation';
import HistoryComponent from '../../../components/statsComponents/HistoryComponent';
import { TabObject } from '../../../models/TabObject';
import WorkoutComponent from '../../../components/statsComponents/WorkoutComponent';
import DashboardComponent from '../../../components/statsComponents/DashboardComponent';



const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 8;

const CanvasHeight = 350;
const CanvasWidth = 350;
const tabObject: TabObject = {
  DashboardComponent: {
    title: 'Dashboard',
    component: <DashboardComponent />
  },
  HistoryComponent: {
    title: 'Locations',
    component: <HistoryComponent />,
  },
  WorkoutComponent: {
    title: 'Favourites',
    component: <WorkoutComponent />,
  },
};

// Still a work in progress
const ClimbsScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <TabNavigation tabObject={tabObject} />
      </View>
    </View>

  );
};

export default ClimbsScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  canvas: {
    height: CanvasHeight,
    width: CanvasWidth,
  },
});