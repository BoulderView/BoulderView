import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert, Image, Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import { useDispatch, useSelector } from 'react-redux';
import { selectAvatar, updateAvatar } from '../features/profile/profileSlice';

interface Props {
  size: number
  url: string | null
  onUpload: (filePath: string) => void
}

export default function Avatar({ url, size = 100, onUpload }: Props) {
  const [uploading, setUploading] = useState(false)
  const avatarSize = { height: size, width: size }

  const dispatch = useDispatch();
  const avatar = useSelector(selectAvatar);

  useEffect(() => {
    if (url && avatar === null) {
      downloadImage(url);
    }
  }, [url])

  // Retrieving image directly from supabase
  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)

      if (error) {
        throw error
      }

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload = () => {
        const result = fr.result as string
        dispatch(updateAvatar(result));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message)
      }
    }
  }

  const uploadFromUri = async (uri: string) => {
    const ext = uri.substring(uri.lastIndexOf(".") + 1);

    const fileName = uri.replace(/^.*[\\/]/, "");

    const formData = new FormData();
    formData.append("files", JSON.parse(JSON.stringify({
      uri: uri,
      name: fileName,
      type: `image/${ext}`,
    })));

    const { data, error } = await supabase.storage.from('avatars').upload(fileName, formData);

    if (error) throw new Error(error.message);
    dispatch(updateAvatar(uri));
    onUpload(fileName);

  }

  const uploadAvatar = async () => {
    const file = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    })
    try {
      setUploading(true)
      if (!file.canceled) {
        await uploadFromUri(file.assets[0].uri);
      }

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
        console.log(error + "WTF")

      } else {
        throw error
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <View>
      <View style={styles.container}>
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar]}
          />
        ) : (
          <View style={[avatarSize, styles.avatar, styles.noImage]} />
        )}
      </View>
      <View>
        <Button
          title={uploading ? 'Uploading ...' : 'Upload'}
          onPress={async () => {
            await uploadAvatar();
          }}
          disabled={uploading}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#19376D",
    marginBottom: 10,
  },
  noImage: {
    backgroundColor: '#333',
    border: '1px solid rgb(200, 200, 200)',
    borderRadius: 100,
  },
})
