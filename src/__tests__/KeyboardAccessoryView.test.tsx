import React from 'react'
import { NativeEventEmitter } from 'react-native'
import { act, render } from 'react-native-testing-library'
import { keyboardOpenEvent } from '../../jest/fixtures'
import { KeyboardAccessoryView } from '../KeyboardAccessoryView'

const emitter = new NativeEventEmitter()

describe('keyboard accessory view', () => {
  it('sticks to the bottom with a closed keyboard', () => {
    expect.assertions(2)
    const handleContentBottomInsetUpdate = jest.fn()
    const { getByTestId } = render(
      <KeyboardAccessoryView
        onContentBottomInsetUpdate={handleContentBottomInsetUpdate}
      />
    )
    const container = getByTestId('container')
    expect(container.props.style).toHaveProperty('bottom', 0)
    expect(handleContentBottomInsetUpdate).toHaveBeenLastCalledWith(0)
  })

  it('sticks to the keyboard top with an open keyboard', () => {
    expect.assertions(2)
    const handleContentBottomInsetUpdate = jest.fn()
    const { getByTestId } = render(
      <KeyboardAccessoryView
        onContentBottomInsetUpdate={handleContentBottomInsetUpdate}
      />
    )
    act(() => {
      emitter.emit('keyboardWillChangeFrame', keyboardOpenEvent)
    })
    const container = getByTestId('container')
    expect(container.props.style).toHaveProperty('bottom', 346)
    expect(handleContentBottomInsetUpdate).toHaveBeenLastCalledWith(312)
  })

  it('sticks to the keyboard top with an open keyboard and active pan', () => {
    expect.assertions(2)
    const handleContentBottomInsetUpdate = jest.fn()
    const { getByTestId } = render(
      <KeyboardAccessoryView
        onContentBottomInsetUpdate={handleContentBottomInsetUpdate}
        panResponderPositionY={596}
      />
    )
    act(() => {
      emitter.emit('keyboardWillChangeFrame', keyboardOpenEvent)
    })
    const container = getByTestId('container')
    expect(container.props.style).toHaveProperty('bottom', 300)
    expect(handleContentBottomInsetUpdate).toHaveBeenLastCalledWith(312)
  })
})
