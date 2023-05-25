import { Stack, Tabs } from "expo-router";
import { Platform, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor:"black",
      tabBarInactiveTintColor:"white",
      tabBarInactiveBackgroundColor:"#0B2447",
      tabBarActiveBackgroundColor:"#A5D7E8",
      tabBarLabelStyle:{
        fontSize:12
      },
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: '#0B2447',
      headerTitleStyle: {
        fontSize: 30
      },
      headerTitleAlign: 'center',
      tabBarHideOnKeyboard: Platform.OS!== 'ios'  // disabled for ios
    }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel:"Home",
          headerShown:false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="venues"
        options={{
          title:"Venues",
          headerShown:false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="location-outline" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          tabBarLabel:"Post",
          headerTitle:"Post",
          headerShown:false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="climbs"
        options={{
          tabBarLabel:"Climbs",
          headerTitle:"Climbs",
          headerShown:false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel:"Profile",
          headerTitle:"Profile",
          headerShown:false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  )
};

export default TabLayout;
