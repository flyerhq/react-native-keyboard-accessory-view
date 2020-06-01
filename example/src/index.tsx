import {
  KeyboardAccessoryView,
  usePanResponder,
} from '@flyerhq/react-native-keyboard-accessory-view'
import React, { useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'

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
  const [contentBottomInset, setContentBottomInset] = useState(0)

  const keyExtractor = (item: Item) => item.id

  const renderItem = ({ item }: { item: Item }) => (
    <Text style={styles.text}>{item.message}</Text>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        keyboardDismissMode='interactive'
        contentContainerStyle={{
          paddingBottom: contentBottomInset,
        }}
        scrollIndicatorInsets={{ bottom: contentBottomInset }}
        showsHorizontalScrollIndicator={false}
        {...panHandlers}
      />
      <KeyboardAccessoryView
        onContentBottomInsetUpdate={setContentBottomInset}
        panResponderPositionY={positionY}
        style={styles.keyboardAccessoryView}
      >
        <TextInput style={styles.textInput} />
      </KeyboardAccessoryView>
    </SafeAreaView>
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
    flex: 1,
    paddingHorizontal: 16,
    color: 'white',
    height: 50,
  },
})

export default App
