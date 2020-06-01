import { KeyboardEvent, LayoutChangeEvent, ScaledSize } from 'react-native'

export const keyboardHideEvent: KeyboardEvent = {
  duration: 10,
  easing: 'keyboard',
  endCoordinates: {
    height: 346,
    screenX: 0,
    screenY: 896,
    width: 414,
  },
  isEventFromThisApp: true,
  startCoordinates: {
    height: 346,
    screenX: 0,
    screenY: 550,
    width: 414,
  },
}

export const keyboardOpenEvent: KeyboardEvent = {
  duration: 250,
  easing: 'keyboard',
  endCoordinates: {
    height: 346,
    screenX: 0,
    screenY: 550,
    width: 414,
  },
  isEventFromThisApp: true,
  startCoordinates: {
    height: 243,
    screenX: 0,
    screenY: 896,
    width: 414,
  },
}

export const size = {
  height: 896,
  width: 414,
}

export const onLayoutEvent: LayoutChangeEvent = {
  nativeEvent: {
    layout: { x: 0, y: 0, ...size },
  },
}

export const scaledSize: ScaledSize = {
  width: 896,
  height: 414,
  scale: 2,
  fontScale: 1,
}
