import * as React from 'react'
import {
  Animated,
  GestureResponderHandlers,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  useComponentSize,
  useKeyboardDimensions,
  usePanResponder,
} from './hooks'
import styles from './styles'

interface Props {
  children?: React.ReactNode
  contentContainerStyle?: StyleProp<ViewStyle>
  contentOffsetKeyboardClosed?: number
  contentOffsetKeyboardOpened?: number
  renderBackground?: () => React.ReactNode
  renderScrollable: (panHandlers: GestureResponderHandlers) => React.ReactNode
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
    renderBackground,
    renderScrollable,
    spaceBetweenKeyboardAndAccessoryView,
    style,
    useListenersOnAndroid,
  }: Props) => {
    const { onLayout, size } = useComponentSize()
    const { keyboardEndPositionY, keyboardHeight } = useKeyboardDimensions(
      useListenersOnAndroid
    )
    const { panHandlers, positionY } = usePanResponder()
    const { bottom, left, right } = useSafeAreaInsets()

    const deltaY = Animated.subtract(
      positionY,
      keyboardEndPositionY
    ).interpolate({
      inputRange: [0, Number.MAX_SAFE_INTEGER],
      outputRange: [0, Number.MAX_SAFE_INTEGER],
      extrapolate: 'clamp',
    })

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
        <Animated.View
          style={{
            paddingBottom: Animated.subtract(offset, deltaY),
          }}
        >
          {renderScrollable(panHandlers)}
        </Animated.View>
        <Animated.View
          style={StyleSheet.flatten([
            {
              bottom: Animated.subtract(
                keyboardHeight > 0
                  ? keyboardHeight + (spaceBetweenKeyboardAndAccessoryView ?? 0)
                  : 0,
                deltaY
              ),
            },
            container,
            style,
          ])}
          testID='container'
        >
          {renderBackground?.()}
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
