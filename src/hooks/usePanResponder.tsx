import * as React from 'react'
import { PanResponder, Platform } from 'react-native'

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
