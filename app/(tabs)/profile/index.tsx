import React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { supabase } from '../../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import LoginPage from '../../(auth)/login';
import Account from '../../../components/Account';



const ProfileScreen = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <LoginPage />}
    </View>
  )
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 26
  }
});
