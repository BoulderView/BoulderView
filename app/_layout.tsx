import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/auth";  // AuthProvider not finished

const Layout = () => {
  return (
    // AuthProvider goes here
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown:false
        }}
      />
    </Stack>
  )
};

export default Layout;
