import * as React from 'react'
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useComponentSize, useKeyboardDimensions } from './hooks'
import styles from './styles'

interface Props {
  children?: JSX.Element | JSX.Element[]
  contentContainerStyle?: StyleProp<ViewStyle>
  onContentBottomInsetUpdate?: (contentBottomInset: number) => void
  panResponderPositionY?: Animated.Value
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
    const deltaY = Animated.subtract(
      panResponderPositionY ?? new Animated.Value(0),
      keyboardEndPositionY
    )
    const { container, contentContainer } = styles({
      bottom,
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
      <Animated.View
        style={StyleSheet.flatten([
          {
            bottom: Animated.subtract(
              keyboardHeight,
              deltaY.interpolate({
                inputRange: [0, Number.MAX_SAFE_INTEGER],
                outputRange: [0, Number.MAX_SAFE_INTEGER],
                extrapolate: 'clamp',
              })
            ),
          },
          container,
          style,
        ])}
        testID='container'
      >
        <View
          onLayout={onLayout}
          style={StyleSheet.flatten([contentContainer, contentContainerStyle])}
        >
          {children}
        </View>
      </Animated.View>
    )
  }
)
