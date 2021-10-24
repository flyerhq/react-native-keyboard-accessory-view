import { renderHook } from '@testing-library/react-hooks'

import { usePanResponder } from '../usePanResponder'

describe('usePanResponder', () => {
  it('returns default Y position', () => {
    expect.assertions(1)
    const { result } = renderHook(() => usePanResponder())
    // Ignore `__getValue()` because it is a hidden property and
    // there is no other way to get a plain value from the Animated one
    // @ts-ignore
    expect(result.current.positionY.__getValue()).toBe(0)
  })

  it('returns empty object instead of pan handlers on Android', () => {
    expect.assertions(1)
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
    }))
    const { result } = renderHook(() => usePanResponder())
    expect(result.current.panHandlers).toStrictEqual({})
  })
})
