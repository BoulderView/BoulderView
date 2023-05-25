import React from 'react';
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from '../lib/supabase';
import { useRouter, useSegments } from 'expo-router';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
}

interface Props {
  children: any;
}

function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log('useProtectedRoute useEffect called');
    const inAuthGroup = segments[0] === "(auth)"
    if (!user && !inAuthGroup) {
      console.log(`inAuthGroup: ${inAuthGroup}`)
      router.replace("/login");
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, segments, router]);
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  useProtectedRoute(user);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      console.log(`authStateEvent: ${event}`);
      if (event === "SIGNED_IN") {
        setUser(session.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    })
    return () => data.subscription.unsubscribe();
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
