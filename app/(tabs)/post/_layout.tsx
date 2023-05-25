import { Stack } from "expo-router";

const PostLayout = () => {
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
          headerTitle:"Post",
          headerTitleStyle: { 
            fontSize:30
        },
        }}
      />
    </Stack>
  )
};

export default PostLayout;
