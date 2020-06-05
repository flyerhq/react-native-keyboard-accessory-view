import * as React from 'react'
import {
  Dimensions,
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  ScaledSize,
  useWindowDimensions,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const useKeyboardDimensions = () => {
  const { bottom } = useSafeAreaInsets()
  const { height } = useWindowDimensions()
  const [keyboardEndPositionY, setKeyboardEndPositionY] = React.useState(height)
  const [keyboardHeight, setKeyboardHeight] = React.useState(0)
  const [
    keyboardSafeAreaBottomInset,
    setKeyboardSafeAreaBottomInset,
  ] = React.useState(0)

  React.useEffect(() => {
    Dimensions.addEventListener('change', handleDimensionsChange)
    Keyboard.addListener('keyboardWillChangeFrame', updateKeyboardDimensions)

    return () => {
      Dimensions.removeEventListener('change', handleDimensionsChange)
      Keyboard.removeAllListeners('keyboardWillChangeFrame')
    }
  })

  const handleDimensionsChange = (event: {
    screen: ScaledSize
    window: ScaledSize
  }) => {
    setKeyboardEndPositionY(event.window.height)
  }

  const updateKeyboardDimensions = React.useCallback(
    (event: KeyboardEvent) => {
      const { duration, easing, endCoordinates } = event

      const newKeyboardHeight = height - endCoordinates.screenY

      if (newKeyboardHeight === keyboardHeight) {
        return
      }

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
    },
    [bottom, height, keyboardHeight]
  )

  return { keyboardEndPositionY, keyboardHeight, keyboardSafeAreaBottomInset }
}
