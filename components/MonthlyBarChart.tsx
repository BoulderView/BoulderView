import React from "react";
import { View } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
} from "victory-native";

// Dummy data
const data = {
  boruda: [null, { x: "Jan", y: 20 }],
  lighthouse: [
    { x: "Jan", y: 50 },
    { x: "Feb", y: 80 },
  ],
};

// Monthly bar chart for climbing log
export const MonthlyBarChart: React.FC = () => {
  return (
    <View>
      <VictoryChart>
        <VictoryAxis label="Month" />
        <VictoryAxis
          dependentAxis
          label="Climbs"
          style={{
            axisLabel: {
              padding: 30,
            },
          }}
        />
        <VictoryGroup offset={25}>
          <VictoryBar
            data={data.lighthouse}
            style={{
              data: {
                fill: "#19376D",
              },
            }}
          />
          <VictoryBar
            data={data.boruda}
            style={{
              data: {
                fill: "#576CBC",
              },
            }}
          />
        </VictoryGroup>
        <VictoryLegend
          orientation="horizontal"
          gutter={20} // seperates the legends
          data={[
            {
              name: "Boruda",
              symbol: {
                fill: "#576CBC",
              },
            },
            {
              name: "Lighthouse",
              symbol: {
                fill: "#19376D",
              },
            },
          ]}
        />
      </VictoryChart>
    </View>
  );
};
