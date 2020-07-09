import * as React from 'react'
import {
  Dimensions,
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  ScaledSize,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

/**
 * Utility hook used to calculate keyboard dimensions.
 *
 * ⚠️ You shouldn't use this hook on the same screen with `KeyboardAccessoryView` component, unexpected behavior might occur
 * @returns `keyboardEndPositionY` Keyboard's top line Y position
 * @returns `keyboardHeight` Keyboard's height
 * @returns `keyboardSafeAreaBottomInset` Additional space keyboard has when opened on devices with a safe area
 */
export const useKeyboardDimensions = () => {
  const { bottom } = useSafeAreaInsets()
  const [keyboardEndPositionY, setKeyboardEndPositionY] = React.useState(
    Dimensions.get('window').height
  )
  const [keyboardHeight, setKeyboardHeight] = React.useState(0)
  const [
    keyboardSafeAreaBottomInset,
    setKeyboardSafeAreaBottomInset,
  ] = React.useState(0)

  React.useEffect(() => {
    const handleDimensionsChange = (event: {
      screen: ScaledSize
      window: ScaledSize
    }) => {
      setKeyboardEndPositionY(event.window.height)
    }

    const updateKeyboardDimensions = (event: KeyboardEvent) => {
      const { height } = Dimensions.get('window')
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
      setKeyboardSafeAreaBottomInset(newKeyboardHeight > 0 ? bottom : 0)
    }

    Dimensions.addEventListener('change', handleDimensionsChange)
    Keyboard.addListener('keyboardWillChangeFrame', updateKeyboardDimensions)

    return () => {
      Dimensions.removeEventListener('change', handleDimensionsChange)
      Keyboard.removeAllListeners('keyboardWillChangeFrame')
    }
  })

  return { keyboardEndPositionY, keyboardHeight, keyboardSafeAreaBottomInset }
}
