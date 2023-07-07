import * as React from 'react';
import * as Linking from 'expo-linking';
import { useRouter, Redirect } from "expo-router";

const prefix = Linking.createURL('/');

export default function Root() {
  const navigation = useRouter();
  const linking = {
    prefixes: [prefix, 'boulderview://']
  };

  // Redirect to home page for now, need authProvider
  return (<Redirect href="/home" />);
}
