import { act, renderHook } from '@testing-library/react-hooks'
import { Keyboard, NativeEventEmitter } from 'react-native'
import {
  keyboardHideEvent,
  keyboardOpenEvent,
  scaledSize,
} from '../../../jest/fixtures'
import { useKeyboardDimensions } from '../useKeyboardDimensions'

const emitter = new NativeEventEmitter()

describe('useKeyboardDimensions', () => {
  it('returns correct dimensions', () => {
    expect.assertions(7)
    jest.spyOn(Keyboard, 'removeAllListeners')
    const { result, unmount } = renderHook(() => useKeyboardDimensions())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', keyboardOpenEvent)
    })
    expect(result.current.keyboardEndPositionY).toStrictEqual(550)
    expect(result.current.keyboardHeight).toStrictEqual(346)
    expect(result.current.keyboardSafeAreaBottomInset).toStrictEqual(34)
    act(() => {
      emitter.emit('keyboardWillChangeFrame', keyboardHideEvent)
    })
    expect(result.current.keyboardEndPositionY).toStrictEqual(896)
    expect(result.current.keyboardHeight).toStrictEqual(0)
    expect(result.current.keyboardSafeAreaBottomInset).toStrictEqual(0)
    unmount()
    expect(Keyboard.removeAllListeners).toHaveBeenCalledWith(
      'keyboardWillChangeFrame'
    )
  })

  it('returns correct dimensions with no animation duration', () => {
    expect.assertions(3)
    const event = {
      ...keyboardOpenEvent,
      duration: 0,
    }
    const { result } = renderHook(() => useKeyboardDimensions())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', event)
    })
    expect(result.current.keyboardEndPositionY).toStrictEqual(550)
    expect(result.current.keyboardHeight).toStrictEqual(346)
    expect(result.current.keyboardSafeAreaBottomInset).toStrictEqual(34)
  })

  it('skips dimensions update if keyboard height does not change', () => {
    expect.assertions(3)
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
    expect(result.current.keyboardEndPositionY).toStrictEqual(896)
    expect(result.current.keyboardHeight).toStrictEqual(0)
    expect(result.current.keyboardSafeAreaBottomInset).toStrictEqual(0)
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
    expect(result.current.keyboardEndPositionY).toStrictEqual(414)
  })
})
