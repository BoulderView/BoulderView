import { Stack } from "expo-router";

const PostLayout = () => {
  return (
    // AuthProvider goes here
    <Stack 
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible:false,
        headerShown:false
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle:"Post",
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: '#576CBC'
          },
        }}
      />
    </Stack>
  )
};

export default PostLayout;
