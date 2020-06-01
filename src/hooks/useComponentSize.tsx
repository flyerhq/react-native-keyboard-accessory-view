import * as React from 'react'
import { LayoutChangeEvent } from 'react-native'

export const useComponentSize = () => {
  const [size, setSize] = React.useState({ height: 0, width: 0 })

  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout
    setSize({ height, width })
  }, [])

  return { onLayout, size }
}
