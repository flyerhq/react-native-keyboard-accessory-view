import * as React from 'react'
import { PanResponder, Platform } from 'react-native'

/**
 * Returns `panHandlers` used to calculate Y finger position.
 *
 * Used to support interactive dismiss on iOS, on Android `panHandlers` is an empty object.
 *
 * ⚠️ You shouldn't use this hook if you don't use interactive dismiss on iOS.
 * @example
 * // `positionY` will be passed to the `KeyboardAccessoryView` component
 * const [panHandlers, positionY] = usePanResponder()
 * ...
 * <ScrollView {...panHandlers} />
 */
export const usePanResponder = () => {
  const [positionY, setPositionY] = React.useState(0)

  // Ignore PanResponder callbacks from the coverage since it is hard to simulate touches in a unit test
  /* istanbul ignore next */
  const panResponder = React.useRef(
    PanResponder.create({
      onPanResponderMove: (_, gestureState) => {
        setPositionY(gestureState.moveY)
      },
      onPanResponderEnd: () => {
        // We have to pass the duration equal to minimal accepted duration defined here: RCTLayoutAnimation.m
        setTimeout(() => setPositionY(0), 10)
      },
    })
  ).current

  return {
    panHandlers: Platform.OS === 'android' ? {} : panResponder.panHandlers,
    positionY,
  }
}
