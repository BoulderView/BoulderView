import { Stack } from "expo-router";

const VenueLayout = () => {
  return (
    // AuthProvider goes here
    <Stack 
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible:false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle:"Profile",
          headerTitleStyle: { 
            fontSize:30
        },
        }}
      />
    </Stack>
  )
};

export default VenueLayout;
