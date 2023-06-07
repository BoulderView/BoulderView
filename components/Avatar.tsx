import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert, Image, Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

interface Props {
    size: number
    url: string | null
    onUpload: (filePath: string) => void
}

export default function Avatar({ url, size = 100, onUpload }: Props) {
    const [uploading, setUploading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);
    const avatarSize = { height: size, width: size }

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    async function downloadImage(path: string) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)

            if (error) {
                throw error
            }

            const fr = new FileReader()
            fr.readAsDataURL(data)
            fr.onload = () => {
                setAvatarUrl(fr.result as string)
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error downloading image: ', error.message)
            }
        }
    }

    const uploadFromUri = async (photo: ImagePicker.ImagePickerResult) => {
        if (!photo.canceled) {
            const ext = photo.assets[0].uri.substring(photo.assets[0].uri.lastIndexOf(".") + 1);

            const fileName = photo.assets[0].uri.replace(/^.*[\\/]/, "");

            const formData = new FormData();
            formData.append("files", JSON.parse(JSON.stringify({
                uri: photo.assets[0].uri,
                name: fileName,
                type: photo.assets[0].type ? `image/${ext}` : `video/${ext}`,
            })));

            const { data, error } = await supabase.storage.from('avatars').upload(fileName, formData);
            console.log(error)

            if (error) throw new Error(error.message);
            onUpload(fileName);
            return { ...photo, imageData: data };
        } else {
            return photo;
        }
    }

    const uploadAvatar = async () => {
        const file = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        try {
            setUploading(true)
            return await uploadFromUri(file);
            console.log("failed to upload avatar")
            // const file_assets = file.assets;

            // if (file_assets != null) {
            //     const photo = {
            //         uri: file_assets[0]?.uri,
            //         type: file_assets[0]?.type,
            //         name: "random",
            //     }
            //     const formData = new FormData()
            //     formData.append('file', photo)

            //     const fileExt = photo.name?.split('.').pop()
            //     const filePath = `${Math.random()}.${fileExt}`

            //     const { data, error } = await supabase.storage.from('avatars').upload(filePath, formData)

            //     if (error) {
            //         throw error
            //     }

            //     const filepath = data.path;
            //     onUpload(filepath)
            // }r
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
            {avatarUrl ? (
                <Image
                    source={{ uri: avatarUrl }}
                    accessibilityLabel="Avatar"
                    style={[avatarSize, styles.avatar, styles.image]}
                />
            ) : (
                <View style={[avatarSize, styles.avatar, styles.noImage]} />
            )}
            <View>
                <Button
                    title={uploading ? 'Uploading ...' : 'Upload'}
                    onPress={async () => {
                        const response = await uploadAvatar();
                        if (response?.imageData) {
                            setImage(response.uri);
                            setImageData(response?.imageData);
                        }
                    }}
                    disabled={uploading}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 5,
        overflow: 'hidden',
        maxWidth: '100%',
    },
    image: {
        objectFit: 'cover',
        paddingTop: 0,
    },
    noImage: {
        backgroundColor: '#333',
        border: '1px solid rgb(200, 200, 200)',
        borderRadius: 5,
    },
})