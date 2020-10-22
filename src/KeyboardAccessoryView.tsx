import * as React from 'react'
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useComponentSize, useKeyboardDimensions } from './hooks'
import styles from './styles'

interface Props {
  children?: React.ReactNode
  contentContainerStyle?: StyleProp<ViewStyle>
  contentOffsetKeyboardClosed?: number
  contentOffsetKeyboardOpened?: number
  panResponderPositionY?: Animated.Value
  renderBackgroundNode?: () => React.ReactNode
  renderScrollable: () => React.ReactNode
  spaceBetweenKeyboardAndAccessoryView?: number
  style?: StyleProp<ViewStyle>
  useListenersOnAndroid?: boolean
}

export const KeyboardAccessoryView = React.memo(
  ({
    children,
    contentContainerStyle,
    contentOffsetKeyboardClosed,
    contentOffsetKeyboardOpened,
    panResponderPositionY,
    renderBackgroundNode,
    renderScrollable,
    spaceBetweenKeyboardAndAccessoryView,
    style,
    useListenersOnAndroid,
  }: Props) => {
    const { keyboardEndPositionY, keyboardHeight } = useKeyboardDimensions(
      useListenersOnAndroid
    )
    const { onLayout, size } = useComponentSize()
    const { bottom, left, right } = useSafeAreaInsets()
    const deltaY = Animated.subtract(
      panResponderPositionY ?? new Animated.Value(0),
      keyboardEndPositionY
    )

    const offset =
      size.height +
      keyboardHeight +
      (keyboardHeight > 0
        ? (contentOffsetKeyboardOpened ?? 0) - bottom
        : contentOffsetKeyboardClosed ?? 0)

    const { container, contentContainer } = styles({
      bottom,
      keyboardHeight,
      left,
      right,
    })

    return (
      <>
        <View style={{ paddingBottom: offset }}>{renderScrollable()}</View>
        <Animated.View
          style={StyleSheet.flatten([
            {
              bottom: Animated.subtract(
                keyboardHeight > 0
                  ? keyboardHeight + (spaceBetweenKeyboardAndAccessoryView ?? 0)
                  : 0,
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
          {renderBackgroundNode?.()}
          <View
            onLayout={onLayout}
            style={StyleSheet.flatten([
              contentContainer,
              contentContainerStyle,
            ])}
          >
            {children}
          </View>
        </Animated.View>
      </>
    )
  }
)
