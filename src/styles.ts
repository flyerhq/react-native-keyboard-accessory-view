import { StyleSheet } from 'react-native'

const styles = ({
  bottom,
  keyboardHeight,
  left,
  right,
}: {
  bottom: number
  keyboardHeight: number
  left: number
  right: number
}) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
    },
    contentContainer: {
      flex: 1,
      marginBottom: keyboardHeight > 0 ? 0 : bottom,
      marginLeft: left,
      marginRight: right,
    },
  })

export default styles
