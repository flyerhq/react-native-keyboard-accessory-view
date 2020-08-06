import { act, render } from '@testing-library/react-native'
import React from 'react'
import { NativeEventEmitter } from 'react-native'
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
})
