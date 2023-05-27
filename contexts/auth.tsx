import React, { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from '../lib/supabase';
import { useRouter, useSegments } from 'expo-router';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
}

interface Props {
  children:ReactNode;
}

function useProtectedRoute(user: User|null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!user && !inAuthGroup) {
     router.replace("/login");
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, segments, router]);
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User|null>(null);

  useProtectedRoute(user);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (event === "SIGNED_IN") {
        setUser(session ? session.user : null);
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
