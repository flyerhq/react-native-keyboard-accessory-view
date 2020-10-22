import {
  KeyboardAccessoryView,
  usePanResponder,
} from '@flyerhq/react-native-keyboard-accessory-view'
import React from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

interface Item {
  id: string
  message: string
}

const data: Item[] = [...Array(20).keys()].map((value) => ({
  id: `${value + 1}`,
  message: `example${value + 1}`,
}))

const App = () => {
  const { panHandlers, positionY } = usePanResponder()

  const keyExtractor = React.useCallback((item: Item) => item.id, [])

  const renderItem = React.useCallback(
    ({ item }: { item: Item }) => (
      <Text style={styles.text}>{item.message}</Text>
    ),
    []
  )

  const renderScrollable = React.useCallback(
    () => (
      <FlatList
        data={data}
        inverted
        keyboardDismissMode='interactive'
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        {...panHandlers}
      />
    ),
    [keyExtractor, panHandlers, renderItem]
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAccessoryView
          panResponderPositionY={positionY}
          renderScrollable={renderScrollable}
          style={styles.keyboardAccessoryView}
        >
          <TextInput style={styles.textInput} />
        </KeyboardAccessoryView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAccessoryView: {
    backgroundColor: 'black',
  },
  text: {
    padding: 24,
  },
  textInput: {
    color: 'white',
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
  },
})

export default App
