import React, { useState, useRef } from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    Dimensions,
    View,
    PanResponder,
    Image,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Modal,
    Text,
} from 'react-native';
import PulsingCircle from './PulsingCircle';

const MAX_ZOOM = 2.5;
const ANIMATION_DURATION = 400;
const { height, width } = Dimensions.get('window');
const POPUP_COLOR = 'white';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flexGrow: 1,
    },
    popupContainer: {
        marginHorizontal: 16,
        backgroundColor: POPUP_COLOR,
        padding: 8,
        borderRadius: 3,
        width: width - 40,
    },
    popupText: {
        fontSize: 17,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6.5,
        borderRightWidth: 6.5,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: POPUP_COLOR,
    },
});

interface Annotation {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    description: string;
}


interface Props {
    imageWidth: number;
    imageHeight: number;
    source: any; // Replace 'any' with the appropriate type for the image source.
    annotations?: Annotation[];
    popOverStyles?: any; // Replace 'any' with the appropriate type for the popup styles.
};

const ZoomableImage: React.FC<Props> = ({
    imageWidth,
    imageHeight,
    source,
    annotations,
    popOverStyles,
}) => {
    const popupContentRef = useRef(null);
    const imageRef = useRef(null);
    const [scale, setScale] = useState(new Animated.Value(1));
    const [inZoomedState, setInZoomedState] = useState(false);
    const [isZooming, setIsZooming] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [popupY, setPopupY] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentAnnotation, setCurrentAnnotation] = useState(null);

    const initValues = ({ value }: { value: number }) => {
        const currentScale = value;
        let offsetX = (imageWidth / 2 - locationX) * currentScale;
        let offsetY = (imageHeight / 2 - locationY) * currentScale;
        const maxOffsetY = imageHeight * (currentScale - 1) / 2;
        const maxOffsetX = imageWidth * (currentScale - 1) / 2;

        offsetY = Math.abs(offsetY) > maxOffsetY ? (offsetY > 0 ? maxOffsetY : -maxOffsetY) : offsetY;
        offsetX = Math.abs(offsetX) > maxOffsetX ? (offsetX > 0 ? maxOffsetX : -maxOffsetX) : offsetX;

        setOffsetX(offsetX);
        setOffsetY(offsetY);
    };

    const initPanResponder = () => {
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: onMoveShouldSetPanResponder,
            onMoveShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
            onPanResponderMove: onPanResponderMove,
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: onPanResponderRelease,
            onPanResponderTerminate: () => { },
            onShouldBlockNativeResponder: () => true,
            onPanResponderGrant: onPanResponderGrant,
        });
        return panResponder;
    };

    let locationX = 0;
    let locationY = 0;
    let pageX = 0;
    let pageY = 0;
    let previousDistanceX = 0;
    let previousDistanceY = 0;
    let previousScale = 1;
    let distance = 0;

    const onPanResponderGrant = (e, s) => {
        previousDistanceX = 0;
        previousDistanceY = 0;
        previousScale = scale._value;
        if (s.numberActiveTouches === 2) {
            const dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
            const dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
            distance = Math.sqrt(dx * dx + dy * dy);
        }
    };

    const onMoveShouldSetPanResponder = (e, s) => {
        return s.numberActiveTouches === 2 || (inZoomedState && !isZooming);
    };

    const onPanResponderMove = (e, s) => {
        // zoom
        if (s.numberActiveTouches === 2) {
            const dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
            const dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
            const currentDistance = Math.sqrt(dx * dx + dy * dy);
            let newScale = currentDistance / distance * previousScale;

            if (newScale < 1) {
                setInZoomedState(false);
                newScale = 1;
            } else if (newScale > MAX_ZOOM) {
                setInZoomedState(true);
            }

            Animated.timing(scale, {
                toValue: newScale,
                duration: 1,
                useNativeDrive: true,
            }).start();
        } else if (s.numberActiveTouches === 1) {
            const distanceMovedX = s.dx - previousDistanceX;
            const distanceMovedY = s.dy - previousDistanceY;
            previousDistanceX = s.dx;
            previousDistanceY = s.dy;
            let offsetX = offsetX + distanceMovedX;
            let offsetY = offsetY + distanceMovedY;
            const maxOffsetY = imageHeight * (scale - 1) / 2;
            const maxOffsetX = imageWidth * (scale - 1) / 2;
            locationX = locationX - distanceMovedX / previousScale;
            locationY = locationY - distanceMovedY / previousScale;
            offsetY = Math.abs(offsetY) > maxOffsetY ? (offsetY > 0 ? maxOffsetY : -maxOffsetY) : offsetY;
            offsetX = Math.abs(offsetX) > maxOffsetX ? (offsetX > 0 ? maxOffsetX : -maxOffsetX) : offsetX;

            setOffsetX(offsetX);
            setOffsetY(offsetY);
        }
    };

    const onPanResponderRelease = (e, state) => { };

    const normalizeAnnotation = (annotation) => {
        if (!annotation) return null;
        const x1 = annotation.x1 * imageWidth / 100;
        const x2 = annotation.x2 * imageWidth / 100;
        const y1 = annotation.y1 * imageHeight / 100;
        const y2 = annotation.y2 * imageHeight / 100;
        return { x1, x2, y1, y2 };
    };

    const getAnnotation = (x, y) => {
        let match = null;
        annotations && annotations.every(annotation => {
            const { x1, x2, y1, y2 } = normalizeAnnotation(annotation);
            if (x > x1 && x < x2 && y > y1 && y < y2) match = annotation;
            return !match;
        });
        return match;
    };

    const showPopup = () => {
        setModalVisible(true);
    };

    const onImagePress = (e) => {
        const { nativeEvent: { locationX: locX = 0, locationY: locY = 0, pageX: pgX, pageY: pgY } = {} } = e;
        setCurrentAnnotation(getAnnotation(locX, locY));
        if (currentAnnotation && !inZoomedState) {
            setPopupY(pgY);
            locationX = locX;
            locationY = locY;
            pageX = pgX;
            pageY = pgY;
            zoomUpImage();
        } else if (inZoomedState) {
            zoomDownImage();
        }
    };

    const zoomUpImage = () => {
        setIsZooming(true);
        Animated.timing(scale, {
            toValue: MAX_ZOOM,
            duration: ANIMATION_DURATION,
            useNativeDrive: true,
        }).start(() => {
            setInZoomedState(true);
            setIsZooming(false);
            if (currentAnnotation) showPopup();
        });
    };

    const zoomDownImage = () => {
        setIsZooming(true);
        Animated.timing(scale, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDrive: true,
        }).start(() => {
            setInZoomedState(false);
            setOffsetX(0);
            setOffsetY(0);
            setIsZooming(false);
        });
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const renderTouchpoints = () => {
        if (isZooming || inZoomedState) return null;
        return annotations && annotations.map((annotation, index) => {
            const { x1, x2, y1, y2 } = normalizeAnnotation(annotation);
            const style = {
                position: 'absolute',
                left: ((x2 + x1) / 200) * imageWidth,
                top: ((y2 + y1) / 200) * imageHeight,
            };
            return (
                <View key={index} pointerEvents='none' style={style}>
                    <PulsingCircle pulse />
                </View>
            );
        });
    };

    const popupContent = () => {
        return (
            <View style={{ position: 'absolute', top: (imageHeight / 2) - locationY + pageY }}>
                <View style={[styles.triangle, { marginLeft: width / 2 - 20 }]} />
                <View ref={popupContentRef} style={[styles.popupContainer, popOverStyles]}>
                    <Text style={styles.popupText}>{currentAnnotation && currentAnnotation.description}</Text>
                </View>
            </View>
        );
    };

    const popupContainer = () => {
        const backgroundColorStyle = { opacity: 0.3, flexGrow: 1 };
        return (
            <Modal transparent visible={modalVisible} hardwareAccelerated>
                <View style={styles.container}>
                    <Animated.View style={backgroundColorStyle}>
                        <TouchableHighlight style={styles.overlay} onPress={closeModal} underlayColor='transparent'>
                            <View />
                        </TouchableHighlight>
                    </Animated.View>
                    {popupContent()}
                </View>
            </Modal>
        );
    };

    const transformStyles = {
        transform: [
            { scale: scale },
        ],
    };

    return (
        <View style={{ maxHeight: imageHeight, width: imageWidth, backgroundColor: 'pink' }}>
            {popupContainer()}
            <ScrollView
                style={{ maxHeight: imageHeight, width: imageWidth, backgroundColor: 'pink' }}
                {...initPanResponder().panHandlers}
                bounces={false}
                scrollEventThrottle={15}
            >
                <TouchableWithoutFeedback
                    onPress={onImagePress}
                    style={{ height: imageHeight, width: imageWidth, backgroundColor: 'red' }}
                >
                    <Animated.Image
                        ref={imageRef}
                        source={source}
                        style={[transformStyles, { height: imageHeight, width: imageWidth, top: offsetY, left: offsetX }]}
                    />
                </TouchableWithoutFeedback>
            </ScrollView>
            {renderTouchpoints()}
        </View>
    );
};

export default ZoomableImage;