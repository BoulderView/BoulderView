import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Avatar from './Avatar';
import { profileModel } from '../models/profileModel';

import { useDispatch, useSelector } from 'react-redux';
import { selectSession, selectProfile, updateProfile, updateSession } from '../features/profile/profileSlice';
import { Snackbar } from 'react-native-paper';

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [showSnackBar, setShowSnackBar] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const session = useSelector(selectSession);

  useEffect(() => {
    if (session !== null && profile === null && !loading) {
      console.log("getting profile");
      getProfile();
    }
    console.log(avatarUrl);
  }, [profile, session])

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

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
        setUsername(updatedData.username);
        setDescription(updatedData.description);
        setAvatarUrl(updatedData.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);

      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfileUpload(avatarUrl:string) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      if (profile === null) throw new Error('Unable to store profile...');

      const updates: profileModel = {
        id: profile.id,
        full_name: profile.full_name,
        username: username ? username : profile.username,
        description: description ? description : profile.description,
        avatar_url: avatarUrl,
        updated_at: new Date(),
        liked_post_id: []
      }

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }

      // Only update the global state when the user confirms update
      getProfile();

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
      console.log(error);

    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Avatar
          size={200}
          url={avatarUrl || ""}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfileUpload(url);
            setShowSnackBar(true);
          }}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Description" value={description} onChangeText={(text) => setDescription(text)} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfileUpload(avatarUrl)}
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
      <View style={{ width: "100%", alignItems: "center" }}>
        <Snackbar
          visible={showSnackBar}
          onDismiss={() => setShowSnackBar(false)}
          action={{
            label: 'Close',
            onPress: () => {
              setShowSnackBar(false)
            },
          }}
          duration={5000}
          elevation={2}
        >
          Profile Updated
        </Snackbar>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  }
})