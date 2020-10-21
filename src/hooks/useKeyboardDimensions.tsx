import * as React from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  ScaledSize,
  Platform,
  EmitterSubscription
} from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

/**
 * Utility hook used to calculate keyboard dimensions.
 *
 * ⚠️ You shouldn't use this hook on the same screen with `KeyboardAccessoryView` component, unexpected behavior might occur
 * @returns `keyboardEndPositionY` Keyboard's top line Y position
 * @returns `keyboardHeight` Keyboard's height
 */
export const useKeyboardDimensions = () => {
  const frame = useSafeAreaFrame();
  const [keyboardEndPositionY, setKeyboardEndPositionY] = React.useState(frame.height);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  React.useEffect(() => {
    const updateKeyboardDimensions = (event: KeyboardEvent) => {
      const { duration, easing, endCoordinates } = event;

      const newKeyboardHeight = frame.height - endCoordinates.screenY;

      if (newKeyboardHeight === keyboardHeight) return;

      if (duration && easing) {
        // We have to pass the duration equal to minimal accepted duration defined here: RCTLayoutAnimation.m
        const animationDuration = Math.max(duration, 10);

        LayoutAnimation.configureNext({
          duration: animationDuration,
          update: {
            duration: animationDuration,
            type: LayoutAnimation.Types[easing]
          }
        });
      }

      setKeyboardEndPositionY(endCoordinates.screenY);
      setKeyboardHeight(newKeyboardHeight);
    };

    const listeners = new Array<EmitterSubscription>();
    if (Platform.OS === 'ios') {
      listeners.push(Keyboard.addListener('keyboardWillChangeFrame', updateKeyboardDimensions));
    } else {
      listeners.push(
        Keyboard.addListener('keyboardDidHide', updateKeyboardDimensions),
        Keyboard.addListener('keyboardDidShow', updateKeyboardDimensions)
      );
    }

    return () => listeners.forEach((listener) => listener.remove());
  });

  return { keyboardEndPositionY, keyboardHeight };
};
