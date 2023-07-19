import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { supabase } from "../../lib/supabase";
import { profileModel } from "../../models/profileModel";
import AvatarComponent from "./AvatarComponent";

import { Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProfile,
  selectSession,
  updateProfile,
  updateSession,
} from "../../features/profile/profileSlice";

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showSnackBar, setShowSnackBar] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const session = useSelector(selectSession);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setDescription(profile.description);
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile, session]);

  async function updatePassword(new_password: string) {
    try {
      setLoading(true);
      if (!session) throw new Error("No user on the session!");

      if (profile === null) throw new Error("Unable to store profile...");
      const { data, error } = await supabase.auth.updateUser({
        password: new_password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfileUpload(avatarUrl: string) {
    try {
      setLoading(true);
      if (!session) throw new Error("No user on the session!");

      if (profile === null) throw new Error("Unable to store profile...");

      const updates: profileModel = {
        id: profile.id,
        full_name: profile.full_name,
        username: username ? username : profile.username,
        description: description ? description : profile.description,
        avatar_url: avatarUrl,
        updated_at: new Date(),
        liked_post_id: profile.liked_post_id,
        liked_comment_id: profile.liked_comment_id
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }

      // // Only update the global state when the user confirms update
      // getProfile();
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
        <AvatarComponent
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
        <Input
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() => updateProfileUpload(avatarUrl)}
          disabled={loading}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Change Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Change password"}
          onPress={() => updatePassword(password)}
          disabled={loading}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign Out"
          onPress={() => {
            supabase.auth.signOut();
            dispatch(updateProfile(null));
            dispatch(updateSession(null));
          }}
        />
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Snackbar
          visible={showSnackBar}
          onDismiss={() => setShowSnackBar(false)}
          action={{
            label: "Close",
            onPress: () => {
              setShowSnackBar(false);
            },
          }}
          duration={5000}
          elevation={2}
        >
          Profile Updated
        </Snackbar>
      </View>
    </View>
  );
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
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
