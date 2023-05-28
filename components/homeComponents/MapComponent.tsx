import React, { createRef, useRef, useState } from 'react';
import { View, Animated } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

const MapComponent: React.FC = () => {
  /*
    Using scale to measure zoom state and translate to measure left/right movement
  */ 
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  /*
   onPinchEvent will set the scale
  */
  const onPinchEvent = Animated.event([{
    nativeEvent: {scale}
  }], { useNativeDriver:true });

  /*
    onPanEvent will set the translations
  */
  const onPanEvent = Animated.event([{
    nativeEvent: {
      translationX: translateX,
      translationY: translateY
    }
  }], { useNativeDriver:true })

  const pinchRef = createRef();
  const panRef = createRef();

  const [panEnabled, setPanEnabled] = useState(false);

  const handlePinchStateChange = ({ nativeEvent }:any) => {
    // Enabling pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // If scale < 1, reset scale back to original
    const nScale = nativeEvent.scale;

    if (nativeEvent.state = State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver:true
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver:true
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver:true
        }).start();

        setPanEnabled(false);
      }
    }
  }

  return (
    <View>
      <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside
      >
        <Animated.View>
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}
          >
            <Animated.Image
              source={require("./../../assets/boruda-map.png")}
              style={{
                width:"100%",
                height:"100%",
                transform: [{ scale }, { translateX }, { translateY }]
              }}
              resizeMode="contain"
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default MapComponent;
