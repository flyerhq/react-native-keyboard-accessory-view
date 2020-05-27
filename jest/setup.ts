import { Dimensions, LayoutAnimation } from 'react-native'

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

jest
  .spyOn(Dimensions, 'get')
  .mockImplementation(
    jest.fn(() => ({ width: 414, height: 896, scale: 2, fontScale: 1 }))
  )
jest.spyOn(LayoutAnimation, 'configureNext').mockImplementation()
