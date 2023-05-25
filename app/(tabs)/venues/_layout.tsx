import { Stack } from "expo-router";

const VenueLayout = () => {
  return (
    // AuthProvider goes here
    <Stack 
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible:false,
        headerShown:false
      }}>
    </Stack>
  )
};

export default VenueLayout;
