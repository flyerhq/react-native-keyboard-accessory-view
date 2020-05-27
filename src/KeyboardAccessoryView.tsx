import * as React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useKeyboardDimensions } from './hooks'
import styles from './styles'

interface Props {
  children?: JSX.Element | JSX.Element[]
  contentContainerStyle?: StyleProp<ViewStyle>
  panResponderPositionY?: number
  style?: StyleProp<ViewStyle>
}

export const KeyboardAccessoryView = ({
  children,
  contentContainerStyle,
  panResponderPositionY,
  style,
}: Props) => {
  const { keyboardEndPositionY, keyboardHeight } = useKeyboardDimensions()
  const { bottom, left, right } = useSafeAreaInsets()
  const deltaY = (panResponderPositionY ?? 0) - keyboardEndPositionY
  const diff = deltaY > 0 ? deltaY : 0
  const { container, contentContainer } = styles({
    bottom,
    diff,
    keyboardHeight,
    left,
    right,
  })

  return (
    <View style={StyleSheet.flatten([container, style])} testID='container'>
      <View
        style={StyleSheet.flatten([contentContainer, contentContainerStyle])}
      >
        {children}
      </View>
    </View>
  )
}
