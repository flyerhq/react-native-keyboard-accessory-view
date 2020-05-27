import { act, renderHook } from '@testing-library/react-hooks'
import { Keyboard, NativeEventEmitter } from 'react-native'
import { keyboardEvent } from '../../../jest/fixtures'
import { useKeyboardDimensions } from '../useKeyboardDimensions'

const emitter = new NativeEventEmitter()

describe('useKeyboardDimensions', () => {
  it('returns correct dimensions', () => {
    expect.assertions(3)
    jest.spyOn(Keyboard, 'removeAllListeners')
    const { result, unmount } = renderHook(() => useKeyboardDimensions())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', keyboardEvent)
    })
    expect(result.current.keyboardEndPositionY).toStrictEqual(550)
    expect(result.current.keyboardHeight).toStrictEqual(346)
    unmount()
    expect(Keyboard.removeAllListeners).toHaveBeenCalledWith(
      'keyboardWillChangeFrame'
    )
  })

  it('returns correct dimensions with longer animation duration', () => {
    expect.assertions(2)
    const event = {
      ...keyboardEvent,
      duration: 250,
    }
    const { result } = renderHook(() => useKeyboardDimensions())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', event)
    })
    expect(result.current.keyboardEndPositionY).toStrictEqual(550)
    expect(result.current.keyboardHeight).toStrictEqual(346)
  })

  it('returns correct dimensions with no animation duration', () => {
    expect.assertions(2)
    const event = {
      ...keyboardEvent,
      duration: 0,
    }
    const { result } = renderHook(() => useKeyboardDimensions())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', event)
    })
    expect(result.current.keyboardEndPositionY).toStrictEqual(550)
    expect(result.current.keyboardHeight).toStrictEqual(346)
  })

  it('skips dimensions update if keyboard height does not change', () => {
    expect.assertions(2)
    const event = {
      ...keyboardEvent,
      endCoordinates: {
        ...keyboardEvent.endCoordinates,
        screenY: 896,
      },
    }
    const { result } = renderHook(() => useKeyboardDimensions())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', event)
    })
    expect(result.current.keyboardEndPositionY).toStrictEqual(896)
    expect(result.current.keyboardHeight).toStrictEqual(0)
  })
})
