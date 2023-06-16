import { CameraCapturedPicture } from 'expo-camera';
import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import PostBottomSheetComponent from './PostBottomSheetComponent';

interface Props {
  media: ImagePicker.ImagePickerAsset | CameraCapturedPicture
  setMedia: Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | CameraCapturedPicture | undefined>>;
}

const PreviewMediaComponent: React.FC<Props> = ({ media, setMedia }) => {
  const [session, setSession] = useState<Session | null>(null);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(true);

  const snapPoints = ['5%', '30%', '90%'];

  useEffect(() => {
    // Getting user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.absoluteContainer}>
        <IconButton
          icon="window-close"
          iconColor="white"
          containerColor="#576CBC"
          size={25}
          mode="contained"
          onPress={() => setMedia(undefined)}
        />
      </SafeAreaView>
      <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + media.base64 }} />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onClose={() => setIsOpen(false)}
      >
        <BottomSheetView>
        <PostBottomSheetComponent 
          session={session}
          media={media}
          setMedia={setMedia}
        />
        </BottomSheetView>
      </BottomSheet>  
    </SafeAreaView>
  );
};

export default PreviewMediaComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black",
  },
  preview: {
    alignSelf:"stretch",
    flex:1,
  },
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    margin:10
  },
});
