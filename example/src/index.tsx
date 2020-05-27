import React from 'react'
import { ScrollView, StyleSheet, TextInput } from 'react-native'
import {
  KeyboardAccessoryView,
  usePanResponder,
} from 'react-native-keyboard-accessory-view'

const App = () => {
  const { panHandlers, positionY } = usePanResponder()

  return (
    <>
      <ScrollView keyboardDismissMode='interactive' {...panHandlers} />
      <KeyboardAccessoryView
        panResponderPositionY={positionY}
        style={styles.keyboardAccessoryView}
      >
        <TextInput style={styles.textInput} />
      </KeyboardAccessoryView>
    </>
  )
}

const styles = StyleSheet.create({
  keyboardAccessoryView: {
    backgroundColor: 'black',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    color: 'white',
    height: 50,
  },
})

export default App
