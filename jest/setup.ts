import { LayoutAnimation } from 'react-native'

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

jest.spyOn(LayoutAnimation, 'configureNext').mockImplementation()
