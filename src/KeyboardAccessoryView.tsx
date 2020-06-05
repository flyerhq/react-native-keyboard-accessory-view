import * as React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useComponentSize, useKeyboardDimensions } from './hooks'
import styles from './styles'

interface Props {
  children?: JSX.Element | JSX.Element[]
  contentContainerStyle?: StyleProp<ViewStyle>
  onContentBottomInsetUpdate?: (contentBottomInset: number) => void
  panResponderPositionY?: number
  style?: StyleProp<ViewStyle>
}

export const KeyboardAccessoryView = React.memo(
  ({
    children,
    contentContainerStyle,
    onContentBottomInsetUpdate,
    panResponderPositionY,
    style,
  }: Props) => {
    const {
      keyboardEndPositionY,
      keyboardHeight,
      keyboardSafeAreaBottomInset,
    } = useKeyboardDimensions()
    const { onLayout, size } = useComponentSize()
    const { bottom, left, right } = useSafeAreaInsets()
    const deltaY = (panResponderPositionY ?? 0) - keyboardEndPositionY
    const diff = Math.max(deltaY, 0)
    const { container, contentContainer } = styles({
      bottom,
      diff,
      keyboardHeight,
      left,
      right,
    })

    const updateContentBottomInset = React.useCallback(() => {
      onContentBottomInsetUpdate?.(
        size.height + keyboardHeight - keyboardSafeAreaBottomInset
      )
    }, [
      keyboardHeight,
      keyboardSafeAreaBottomInset,
      onContentBottomInsetUpdate,
      size,
    ])

    React.useEffect(updateContentBottomInset)

    return (
      <View style={StyleSheet.flatten([container, style])} testID='container'>
        <View
          onLayout={onLayout}
          style={StyleSheet.flatten([contentContainer, contentContainerStyle])}
        >
          {children}
        </View>
      </View>
    )
  }
)
