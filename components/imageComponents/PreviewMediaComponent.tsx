import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Video, ResizeMode } from 'expo-av';

import PostBottomSheetComponent from './PostBottomSheetComponent';

interface Props {
  mediaUri:string;
  setMediaUri: Dispatch<SetStateAction<string>>;
}

const PreviewMediaComponent: React.FC<Props> = ({ mediaUri, setMediaUri }) => {
  const [session, setSession] = useState<Session | null>(null);
  const video = useRef(null);
  const [status, setStatus] = React.useState({});

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = ['10%', '30%', '85%'];

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
          onPress={() => setMediaUri("")}
        />
      </SafeAreaView>
      {/* <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + media.base64 }} /> */}
      <Video
        ref={video}
        style={styles.preview}
        source={{
          uri: mediaUri,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        shouldPlay
      />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
      >
        <BottomSheetView>
        <PostBottomSheetComponent 
          session={session}
          mediaUri={mediaUri}
          setMediaUri={setMediaUri}
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
