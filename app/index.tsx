import * as React from 'react';
import { useRouter, Redirect } from "expo-router";


export default function Root() {
  const navigation = useRouter();

  // Redirect to home page for now, need authProvider
  return <Redirect href="/home" />;
}
