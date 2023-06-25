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
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: '#576CBC'
          },
        }}
      />
    </Stack>
  )
};

export default VenueLayout;
