import { renderHook } from '@testing-library/react-hooks'
import { usePanResponder } from '../usePanResponder'

describe('usePanResponder', () => {
  it('returns default Y position', () => {
    expect.assertions(1)
    const { result } = renderHook(() => usePanResponder())
    expect(result.current.positionY).toStrictEqual(0)
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
