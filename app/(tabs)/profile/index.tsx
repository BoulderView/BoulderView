import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from "react-native";
import { supabase } from '../../../lib/supabase';
import LoginPage from '../../(auth)/login';
import Account from '../../../components/Account';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { selectSession, updateSession } from '../../../features/profile/profileSlice';

const ProfileScreen = () => {
  // const [session, setSession] = useState<Session | null>(null)
  const dispatch = useDispatch();
  const session = useSelector(selectSession);

  useEffect(() => {
    if (session === null) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        dispatch(updateSession(session));
      })
    }
    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(updateSession(session));
    })
  }, [])

  return (
    <ScrollView>
      {session && session.user
        ? <Account key={session.user.id} />
        : <LoginPage />
      }
    </ScrollView>
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
