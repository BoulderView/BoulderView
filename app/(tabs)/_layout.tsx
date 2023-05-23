import { Stack, Tabs } from "expo-router";
import { Platform, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeLayout = () => {
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
        name="HomeScreen"
        options={{
          title:"Home",
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="VenueScreen"
        options={{
          title:"Venues",
          tabBarIcon: ({color, size}) => (
            <Ionicons name="location-outline" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="PostScreen"
        options={{
          title:"Post",
          tabBarIcon: ({color, size}) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title:"Profile",
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  )
};

export default HomeLayout;
