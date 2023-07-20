import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

const MapComponent = () => {

  return (
    <View style={{ borderWidth: 5, flexShrink: 1, height: '100%', width: '100%' }}>
      <ReactNativeZoomableView maxZoom={30} initialZoom={1.0} minZoom={1.0}>
        <Image
          style={{ borderWidth: 20, width: '100%', height: '100%', resizeMode: 'contain' }}
          source={require("./../../assets/boruda-map.png")} />
      </ReactNativeZoomableView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

export default MapComponent;
