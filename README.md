# React Native Keyboard Accessory View

[![npm](https://img.shields.io/npm/v/@flyerhq/react-native-keyboard-accessory-view)](https://www.npmjs.com/package/@flyerhq/react-native-keyboard-accessory-view)
[![build](https://github.com/flyerhq/react-native-keyboard-accessory-view/workflows/build/badge.svg)](https://github.com/flyerhq/react-native-keyboard-accessory-view/actions?query=workflow%3Abuild)
[![Maintainability](https://api.codeclimate.com/v1/badges/642bed5d3abacc8b750e/maintainability)](https://codeclimate.com/github/flyerhq/react-native-keyboard-accessory-view/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/642bed5d3abacc8b750e/test_coverage)](https://codeclimate.com/github/flyerhq/react-native-keyboard-accessory-view/test_coverage)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&suffix=%&query=$.typeCoverage.is&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fflyerhq%2Freact-native-keyboard-accessory-view%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)

Keyboard accessory (sticky) view for your React Native app. Supports interactive dismiss on iOS, respects safe area and works in both portrait and landscape, on both iOS and Android.

![keyboard-accessory-view](https://user-images.githubusercontent.com/14123304/83332826-a761ef80-a29d-11ea-910b-b1025ae3aac9.gif)

## Getting Started

This library depends on `react-native-safe-area-context`. If you use [React Navigation](https://reactnavigation.org) you probably already have it in your dependencies, so you're good to go. If not, please follow the instructions [here](https://github.com/th3rdwave/react-native-safe-area-context) to install it. Then run:

```bash
yarn add @flyerhq/react-native-keyboard-accessory-view
```

## Usage

```TypeScript
import {
  KeyboardAccessoryView,
  usePanResponder,
} from '@flyerhq/react-native-keyboard-accessory-view'
// ...
const { panHandlers, positionY } = usePanResponder()
const [contentBottomInset, setContentBottomInset] = useState(0)
// ...
return (
  <>
    // Can be anything scrollable
    <ScrollView
      contentContainerStyle={{
        paddingBottom: contentBottomInset,
      }}
      keyboardDismissMode='interactive'
      scrollIndicatorInsets={{ bottom: contentBottomInset }}
      {...panHandlers}
    />
    <KeyboardAccessoryView
      onContentBottomInsetUpdate={setContentBottomInset}
      panResponderPositionY={positionY}
    >
      // Your accessory view
    </KeyboardAccessoryView>
  </>
)
```

Let's break it down.

`usePanResponder` is used to track a finger position on a screen and to adjust `KeyboardAccessoryView` bottom position to go with a keyboard interactive dismiss. Under the hood, it creates [PanResponder](https://reactnative.dev/docs/panresponder) which tracks the Y position. It returns this position and `panHandlers` which should be spread under anything scrollable (e.g. `ScrollView`, `FlatList`). On Android, an empty object is returned in `panHandlers` since we don't have interactive dismiss and don't want to add unnecessary responders.

`KeyboardAccessoryView` optionally accepts `panResponderPositionY` returned from the `usePanResponder` hook. If you don't provide this value, the accessory view will not stick to the keyboard during interactive dismiss, but it will still work correctly on keyboard show/hide events. **If you don't need interactive dismiss support you don't need to provide `panResponderPositionY` and use `usePanResponder` hook.**

Additionally, `KeyboardAccessoryView` provides a `onContentBottomInsetUpdate` callback which can be used to position scrollable content above the keyboard.

## Props

### `KeyboardAccessoryView`

- `style` (optional) - accepts [View Style Props](https://reactnative.dev/docs/view-style-props). Used to style the view which includes both content container and safe area insets. A common use case will be setting `backgroundColor` so the content container and safe area insets are of the matching color.

- `contentContainerStyle` (optional) - accepts [View Style Props](https://reactnative.dev/docs/view-style-props). Used to style the content container, but not the safe area insets.

- `onContentBottomInsetUpdate` (optional) - accepts a function with a number parameter. See the description above.

- `panResponderPositionY` (optional) - accepts a number. See the description above.

## License

[MIT](LICENSE)
