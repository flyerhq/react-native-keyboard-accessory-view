# React Native Keyboard Accessory View

[![npm](https://img.shields.io/npm/v/@flyerhq/react-native-keyboard-accessory-view)](https://www.npmjs.com/package/@flyerhq/react-native-keyboard-accessory-view)
[![build](https://github.com/flyerhq/react-native-keyboard-accessory-view/workflows/build/badge.svg)](https://github.com/flyerhq/react-native-keyboard-accessory-view/actions?query=workflow%3Abuild)
[![Maintainability](https://api.codeclimate.com/v1/badges/642bed5d3abacc8b750e/maintainability)](https://codeclimate.com/github/flyerhq/react-native-keyboard-accessory-view/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/642bed5d3abacc8b750e/test_coverage)](https://codeclimate.com/github/flyerhq/react-native-keyboard-accessory-view/test_coverage)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&suffix=%&query=$.typeCoverage.is&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fflyerhq%2Freact-native-keyboard-accessory-view%2Fmain%2Fpackage.json)](https://github.com/plantain-00/type-coverage)

Keyboard accessory (sticky) view for your React Native app. Supports interactive dismiss on iOS, respects safe area and works in both portrait and landscape, on both iOS and Android.

![keyboard-accessory-view](https://user-images.githubusercontent.com/14123304/83332826-a761ef80-a29d-11ea-910b-b1025ae3aac9.gif)

## Getting Started

This library depends on `react-native-safe-area-context`. If you use [React Navigation](https://reactnavigation.org) you probably already have it in your dependencies, so you're good to go. If not, please follow the instructions [here](https://github.com/th3rdwave/react-native-safe-area-context) to install it. Then run:

```sh
yarn add @flyerhq/react-native-keyboard-accessory-view
```

## Usage

```ts
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view'
import { GestureResponderHandlers } from 'react-native'
// ...
const renderScrollable = (panHandlers: GestureResponderHandlers) => (
  // Can be anything scrollable
  <ScrollView keyboardDismissMode='interactive' {...panHandlers} />
)
// ...
return (
  <KeyboardAccessoryView renderScrollable={renderScrollable}>
    // Your accessory view
  </KeyboardAccessoryView>
)
```

### Handling wrong offsets

Sometimes when you use a tab bar or similar component, the accessory view does not work correctly. In order to fix this, you need to use a combination of next props: `contentContainerStyle`, `contentOffsetKeyboardClosed`, `contentOffsetKeyboardOpened` and `spaceBetweenKeyboardAndAccessoryView`.

First of all, you need to decide if you need this extra safe area margin at the bottom (as you can see the size of the accessory view is different when the keyboard is open and closed, that's because when it's closed, safe area bottom margin is added). If you have, for example, a tab bar, most likely you don't need this margin, because safe is area already occupied by the tab bar. To remove it pass this style: `contentContainerStyle={{ marginBottom: 0 }}`.

When the first step is done, you need to check if you have a space between the accessory view and the keyboard, when the latter is opened. If you do, pass the offset to the `spaceBetweenKeyboardAndAccessoryView` prop. Usually, it can be calculated based on a bottom safe area inset from [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) and/or the height of the tab bar, for example.

Lastly, validate if the content above the accessory view has correct offsets, if no, you can adjust it using `contentOffsetKeyboardClosed` and `contentOffsetKeyboardOpened` props. Sometimes offsets are correct for the one keyboard state, use one of these props if this is the case. As with the `spaceBetweenKeyboardAndAccessoryView` prop, offsets are calculated based on the bottom safe area inset and/or the height of the tab bar, for example.

## Props

### `KeyboardAccessoryView`

- `renderScrollable` (required) - accepts a `ReactNode`. Your scrollable component.

- `style` (optional) - accepts [View Style Props](https://reactnative.dev/docs/view-style-props). Use to style the view which includes both content container and safe area insets. A common use case will be setting `backgroundColor` so the content container and safe area insets are of the matching color.

- `contentContainerStyle` (optional) - accepts [View Style Props](https://reactnative.dev/docs/view-style-props). Use to style the content container, but not the safe area insets.

- `contentOffsetKeyboardClosed` (optional) - accepts a number. Use to adjust content offset when the keyboard is open. Read more [here](#handling-wrong-offsets).

- `contentOffsetKeyboardOpened` (optional) - accepts a number. Use to adjust content offset when the keyboard is closed. Read more [here](#handling-wrong-offsets).

- `renderBackground` (optional) - accepts a function returning React node. This is useful when you want to have a custom node as a background (e.g. `<ImageBackground style={StyleSheet.absoluteFill} />` ). Remember about absolute positioning.

- `scrollableContainerStyle` (optional) - accepts [View Style Props](https://reactnative.dev/docs/view-style-props). Use to style the container wrapping a scrollable component passed in `renderScrollable`. In case you want scrollable to fill the entire container try passing `flex: 1` here.

- `spaceBetweenKeyboardAndAccessoryView` (optional) - accepts a number. Use to adjust space between the accessory view and the keyboard, when the latter is open. Read more [here](#handling-wrong-offsets).

- `useListenersOnAndroid` (optional) - accepts a boolean. By default, Android OS will resize the window when the keyboard is open and accessory view will automatically be positioned above the keyboard. This behavior can be amended, so if for some reason accessory view doesn't appear on top of the keyboard, try setting this prop, it will calculate the content height based on a keyboard listener. Has no impact on iOS.

## License

[MIT](LICENSE)
