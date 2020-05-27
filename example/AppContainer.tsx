import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import App from './src'

const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  )
}

export default AppContainer
