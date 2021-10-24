import { act, renderHook } from '@testing-library/react-hooks'
import { NativeEventEmitter } from 'react-native'

import {
  keyboardHideEvent,
  keyboardOpenEvent,
  scaledSize,
} from '../../../jest/fixtures'
import { useKeyboardDimensions } from '../useKeyboardDimensions'

const emitter = new NativeEventEmitter()

describe('useKeyboardDimensions', () => {
  it('returns correct dimensions', () => {
    expect.assertions(4)
    const { result, unmount } = renderHook(() => useKeyboardDimensions())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', keyboardOpenEvent)
    })
    expect(result.current.keyboardEndPositionY).toBe(550)
    expect(result.current.keyboardHeight).toBe(346)
    act(() => {
      emitter.emit('keyboardWillChangeFrame', keyboardHideEvent)
    })
    expect(result.current.keyboardEndPositionY).toBe(896)
    expect(result.current.keyboardHeight).toBe(0)
    unmount()
  })

  it('returns correct dimensions with no animation duration', () => {
    expect.assertions(2)
    const event = {
      ...keyboardOpenEvent,
      duration: 0,
    }
    const { result } = renderHook(() => useKeyboardDimensions())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', event)
    })
    expect(result.current.keyboardEndPositionY).toBe(550)
    expect(result.current.keyboardHeight).toBe(346)
  })

  it('skips dimensions update if keyboard height does not change', () => {
    expect.assertions(2)
    const event = {
      ...keyboardOpenEvent,
      endCoordinates: {
        ...keyboardOpenEvent.endCoordinates,
        screenY: 896,
      },
    }
    const { result } = renderHook(() => useKeyboardDimensions())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', event)
    })
    expect(result.current.keyboardEndPositionY).toBe(896)
    expect(result.current.keyboardHeight).toBe(0)
  })

  it('sets correct keyboardEndPositionY when device orientation changes', () => {
    expect.assertions(1)
    const { result } = renderHook(() => useKeyboardDimensions())
    act(() => {
      emitter.emit('didUpdateDimensions', {
        screen: scaledSize,
        window: scaledSize,
      })
    })
    expect(result.current.keyboardEndPositionY).toBe(414)
  })

  it('uses listeners on Android', () => {
    expect.assertions(4)
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
      select: jest.fn(),
    }))
    const { result, unmount } = renderHook(() => useKeyboardDimensions(true))
    act(() => {
      emitter.emit('keyboardDidShow', keyboardOpenEvent)
    })
    expect(result.current.keyboardEndPositionY).toBe(550)
    expect(result.current.keyboardHeight).toBe(346)
    act(() => {
      emitter.emit('keyboardDidHide', keyboardHideEvent)
    })
    expect(result.current.keyboardEndPositionY).toBe(896)
    expect(result.current.keyboardHeight).toBe(0)
    unmount()
  })
})
