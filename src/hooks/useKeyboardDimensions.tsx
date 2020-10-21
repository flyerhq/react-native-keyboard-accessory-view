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
  const [keyboardEndPositionY, setKeyboardEndPositionY] = React.useState(height)
  const [keyboardHeight, setKeyboardHeight] = React.useState(0)

  React.useEffect(() => {
    const handleDimensionsChange = (event: {
      screen: ScaledSize
      window: ScaledSize
    }) => {
      setKeyboardEndPositionY(event.window.height)
    }

    const resetKeyboardDimensions = () => {
      setKeyboardEndPositionY(height)
      setKeyboardHeight(0)
    }

    const updateKeyboardDimensions = (event: KeyboardEvent) => {
      const { duration, easing, endCoordinates } = event

      const newKeyboardHeight = height - endCoordinates.screenY

      if (newKeyboardHeight === keyboardHeight) return

      if (duration && easing) {
        // We have to pass the duration equal to minimal accepted duration defined here: RCTLayoutAnimation.m
        const animationDuration = Math.max(duration, 10)

        LayoutAnimation.configureNext({
          duration: animationDuration,
          update: {
            duration: animationDuration,
            type: LayoutAnimation.Types[easing],
          },
        })
      }

      setKeyboardEndPositionY(endCoordinates.screenY)
      setKeyboardHeight(newKeyboardHeight)
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
  })

  return { keyboardEndPositionY, keyboardHeight }
}
