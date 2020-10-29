import * as React from 'react'
import {
  Dimensions,
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  Platform,
  ScaledSize,
} from 'react-native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

/**
 * Utility hook used to calculate keyboard dimensions.
 *
 * @param `useListenersOnAndroid` Will register keyboard listeners for Android
 *
 * ⚠️ You shouldn't use this hook on the same screen with `KeyboardAccessoryView` component, unexpected behavior might occur
 * @returns `keyboardEndPositionY` Keyboard's top line Y position
 * @returns `keyboardHeight` Keyboard's height
 */
export const useKeyboardDimensions = (useListenersOnAndroid?: boolean) => {
  const { height } = useSafeAreaFrame()
  const [state, setState] = React.useState({
    keyboardEndPositionY: height,
    keyboardHeight: 0,
  })

  React.useEffect(() => {
    const handleDimensionsChange = ({ window }: { window: ScaledSize }) => {
      setState((cur) => ({
        keyboardEndPositionY: window.height,
        keyboardHeight: cur.keyboardHeight,
      }))
    }

    const resetKeyboardDimensions = () =>
      setState({
        keyboardEndPositionY: height,
        keyboardHeight: 0,
      })

    const updateKeyboardDimensions = (event: KeyboardEvent) => {
      setState((cur) => {
        const { screenY } = event.endCoordinates
        const newKeyboardHeight = height - screenY
        if (newKeyboardHeight === cur.keyboardHeight) {
          return cur
        }

        const { duration, easing } = event
        if (duration && easing) {
          // We have to pass the duration equal to minimal
          // accepted duration defined here: RCTLayoutAnimation.m
          const animationDuration = Math.max(duration, 10)

          LayoutAnimation.configureNext({
            duration: animationDuration,
            update: {
              duration: animationDuration,
              type: LayoutAnimation.Types[easing],
            },
          })
        }

        return {
          keyboardEndPositionY: screenY,
          keyboardHeight: newKeyboardHeight,
        }
      })
    }

    Dimensions.addEventListener('change', handleDimensionsChange)

    const listeners: EmitterSubscription[] = []

    if (Platform.OS === 'android' && useListenersOnAndroid) {
      listeners.push(
        Keyboard.addListener('keyboardDidHide', resetKeyboardDimensions),
        Keyboard.addListener('keyboardDidShow', updateKeyboardDimensions)
      )
    } else {
      listeners.push(
        Keyboard.addListener(
          'keyboardWillChangeFrame',
          updateKeyboardDimensions
        )
      )
    }

    return () => {
      Dimensions.removeEventListener('change', handleDimensionsChange)
      listeners.forEach((listener) => listener.remove())
    }
  }, [height])

  return state
}
