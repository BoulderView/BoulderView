import {
  Canvas,
  Path,
  runTiming,
  Skia,
  Text,
  useComputedValue,
  useFont,
  useValue,
} from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { Easing, StyleSheet, View, Alert, Button } from "react-native";
import { Text as TextPaper } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useDispatch, useSelector } from "react-redux";
import {
  selectPostList,
  updatePostList,
} from "../../features/post/postListSlice";
import { supabase } from "../../lib/supabase";
import { postModel } from "../../models/postModel";

import * as d3 from "d3";

interface DataPoint {
  label: string;
  value: number;
}

const GRAPH_MARGIN = 25;
const GRAPH_BAR_WIDTH = 12;

const CanvasHeight = 400;
const CanvasWidth = 350;
const graphHeight = CanvasHeight - 2 * GRAPH_MARGIN;
const graphWidth = CanvasWidth - 2;

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const postList = useSelector(selectPostList);

  const currentDate = new Date();
  const weekPrior = new Date();
  const twoWeeksPrior = new Date();
  const threeWeeksPrior = new Date();
  const fourWeeksPrior = new Date();

  weekPrior.setDate(currentDate.getDate() - 7);
  twoWeeksPrior.setDate(currentDate.getDate() - 14);
  threeWeeksPrior.setDate(currentDate.getDate() - 21);
  fourWeeksPrior.setDate(currentDate.getDate() - 28);

  const currentDateString = currentDate.toISOString();
  const priorDateString = fourWeeksPrior.toISOString();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        let { data, error, status } = await supabase
          .from("post")
          .select()
          .eq("profile_id", user?.id)
          .lt('created_at', currentDateString)
          .gt('created_at', priorDateString);

        console.log(currentDateString)
        console.log(priorDateString)
        console.log(data)
        // If there is any form of error
        if (error || status !== 200) {
          throw error;
        }

        if (data) {
          // Casting data to gymModel
          const updatedData = data as postModel[];
          dispatch(updatePostList(updatedData));
        }
      } catch (error: any) {
        Alert.alert(error.message);
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const createLabel = (startDate: Date, endDate: Date) => {
    return startDate.getDate().toString() + "/" + startDate.getMonth().toString() + " - " + endDate.getDate().toString() + "/" + endDate.getMonth().toString();
  }

  const countEntriesWithinDateRange = (startDate: Date, endDate: Date) => {
    return postList.filter((item) => {
      const publishedDate = new Date(item.created_at);
      return publishedDate >= startDate && publishedDate <= endDate;
    }).length;
  };

  const data: DataPoint[] = [
    { label: createLabel(fourWeeksPrior, threeWeeksPrior), value: countEntriesWithinDateRange(fourWeeksPrior, threeWeeksPrior) },
    { label: createLabel(threeWeeksPrior, twoWeeksPrior), value: countEntriesWithinDateRange(threeWeeksPrior, twoWeeksPrior) },
    { label: createLabel(twoWeeksPrior, weekPrior), value: countEntriesWithinDateRange(twoWeeksPrior, weekPrior) },
    { label: createLabel(weekPrior, currentDate), value: countEntriesWithinDateRange(weekPrior, currentDate) },
  ];



  const font = useFont(require("../../assets/fonts/Roboto-Bold.ttf"), 10);
  const animationState = useValue(0);

  const xDomain = data.map((dataPoint: DataPoint) => dataPoint.label);
  const xRange = [0, graphWidth];
  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(0.6);
  x.step();

  const yDomain: number[] = [
    0,
    d3.max(data, (yDataPoint: DataPoint) => yDataPoint.value)!,
  ];

  const yRange = [0, graphHeight];
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  const animate = () => {
    animationState.current = 0;

    runTiming(animationState, 1, {
      duration: 1600,
      easing: Easing.inOut(Easing.exp),
    });
  };

  const path = useComputedValue(() => {
    const newPath = Skia.Path.Make();

    data.forEach((dataPoint: DataPoint) => {
      const rect = Skia.XYWHRect(
        x(dataPoint.label)! - GRAPH_BAR_WIDTH / 2,
        graphHeight,
        GRAPH_BAR_WIDTH,
        y(dataPoint.value * animationState.current) * -1
      );

      const rrect = Skia.RRectXY(rect, 8, 8);
      newPath.addRRect(rrect);
    });

    return newPath;
  }, [animationState]);

  if (!font) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        <Canvas style={styles.canvas}>
          <Path path={path} color="#A5D7E8" />
          {data.map((dataPoint: DataPoint) => (
            <Text
              key={dataPoint.label}
              font={font}
              x={x(dataPoint.label)! - 22}
              y={CanvasHeight - 25}
              text={dataPoint.label}
            />
          ))}
        </Canvas>
        <View>
          <TouchableOpacity style={styles.buttonStyle} onPress={animate}>
            <TextPaper style={styles.buttonTextStyle}>View Climbing Frequency</TextPaper>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DashboardComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  chart: {
  },
  canvas: {
    height: CanvasHeight,
    width: CanvasWidth,
  },
  buttonStyle: {
    backgroundColor: "#19376D",
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  buttonTextStyle: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
});
