import * as Linking from "expo-linking";
import { Redirect, useRouter } from "expo-router";
import * as React from "react";

const prefix = Linking.createURL("/");

export default function Root() {
  const navigation = useRouter();
  const linking = {
    prefixes: [prefix, "boulderview://"],
  };

  // Redirect to home page for now, need authProvider
  return <Redirect href="/home" />;
}
