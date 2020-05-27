import React from 'react'
import { NativeEventEmitter } from 'react-native'
import { act, render } from 'react-native-testing-library'
import { keyboardEvent } from '../../jest/fixtures'
import { KeyboardAccessoryView } from '../KeyboardAccessoryView'

const emitter = new NativeEventEmitter()

describe('keyboard accessory view', () => {
  it('sticks to the bottom with a closed keyboard', () => {
    expect.assertions(1)
    const { getByTestId } = render(<KeyboardAccessoryView />)
    const container = getByTestId('container')
    expect(container.props.style).toHaveProperty('bottom', 0)
  })

  it('sticks to the keyboard top with an open keyboard', () => {
    expect.assertions(1)
    const { getByTestId } = render(<KeyboardAccessoryView />)
    act(() => {
      emitter.emit('keyboardWillChangeFrame', keyboardEvent)
    })
    const container = getByTestId('container')
    expect(container.props.style).toHaveProperty('bottom', 346)
  })

  it('sticks to the keyboard top with an open keyboard and active pan', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <KeyboardAccessoryView panResponderPositionY={596} />
    )
    act(() => {
      emitter.emit('keyboardWillChangeFrame', keyboardEvent)
    })
    const container = getByTestId('container')
    expect(container.props.style).toHaveProperty('bottom', 300)
  })
})
