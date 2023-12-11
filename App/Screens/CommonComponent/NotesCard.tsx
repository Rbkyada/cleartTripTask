import React, { useContext, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  ZoomIn,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { NotesList } from '@Utils/Interface';
import { AppContext } from '@AppContext';
import { CustomText } from '@CommonComponent/CustomText';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;
const LIST_ITEM_HEIGHT = 70;

const styles = StyleSheet.create({
  taskContainer: {
    width: 'auto',
  },
  task: {
    width: '100%',
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface NotesCardProps {
  item: NotesList;
  index: number;
  onDismiss?: (task: NotesList) => void;
  simultaneousHandlers?: React.RefObject<any> | React.RefObject<any>[];
}

const NotesCard = (props: NotesCardProps) => {
  const { appTheme } = useContext(AppContext);

  const initialMode = useRef<boolean>(true);

  const { taskContainer, task, taskTitle, iconContainer } = styles;

  const { item, index, onDismiss, simultaneousHandlers } = props;

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(60);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(item);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return { opacity };
  });

  useEffect(() => {
    initialMode.current = false;
  }, []);

  return (
    <>
      <Animated.View
        entering={(initialMode.current && ZoomIn.delay(index * 250)) || ZoomIn}
        style={[taskContainer, rTaskContainerStyle]}>
        <Animated.View style={[iconContainer, rIconContainerStyle]}>
          <CustomText>Delete</CustomText>
        </Animated.View>
        <PanGestureHandler
          simultaneousHandlers={simultaneousHandlers}
          onGestureEvent={panGesture}>
          <Animated.View>
            <Animated.View
              style={[task, rStyle, { backgroundColor: appTheme.cardBg }]}>
              <CustomText xlarge style={{}}>
                {item.title}
              </CustomText>
              <CustomText style={{}}>{item.description}</CustomText>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </>
  );
};

export { NotesCard };
