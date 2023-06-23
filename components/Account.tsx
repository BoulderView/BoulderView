import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Avatar from './Avatar'
import { profileModel } from '../models/profileModel'

import { useDispatch, useSelector } from 'react-redux';
import { selectSession, selectProfile, updateProfile, updateSession } from '../features/profile/profileSlice';

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const session = useSelector(selectSession);

  useEffect(() => {
    if (session !== null && profile === null && !loading) {
      getProfile();
    }
  }, [profile, session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      let { data, error, status } = await supabase
        .from('profiles')
        .select()
        .eq('id', session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        const updatedData = data as profileModel;
        dispatch(updateProfile(updatedData));
        setUsername(profile?.username);
        setDescription(profile?.description);
        setAvatarUrl(profile?.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
        
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfileUpload() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      if (profile === null) throw new Error('Unable to store profile...');

      const updates:profileModel = {
        id: profile.id,
        full_name: profile.full_name,
        username: username ? username : profile.username,
        description: description ? description : profile.description,
        avatar_url: avatarUrl ? avatarUrl : profile.avatar_url,
        updated_at: String(new Date()),
      }

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }

      // Only update the global state when the user confirms update
      dispatch(updateProfile(updates));

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Avatar
          size={200}
          url={avatarUrl ||  profile?.avatar_url || ""}
          onUpload={(url: string) => {
            setAvatarUrl(url)
            updateProfileUpload()
          }}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || profile?.username} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Description" value={description || profile?.description} onChangeText={(text) => setDescription(text)} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfileUpload()}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => {
          supabase.auth.signOut();
          dispatch(updateProfile(null));
          dispatch(updateSession(null));
        }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})