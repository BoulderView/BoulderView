import { Redirect } from "expo-router";
import * as React from "react";

export default function Root() {
  // Redirect to home page for now, need authProvider
  return <Redirect href="/home" />;
}
