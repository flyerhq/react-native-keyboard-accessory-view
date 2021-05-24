# example

## Getting Started

```bash
yarn
```

for iOS:

```bash
npx pod-install
```

To run the app use:

```bash
yarn ios
```

or

```bash
yarn android
```

## Updating project

1. Remove current `example` project
2. Create a project named `example` using [react-native-better-template](https://github.com/demchenkoalex/react-native-better-template)
3. Revert `README.md` so you can see this guide
4. In `tsconfig.json` add

```json
"baseUrl": ".",
"paths": {
  "@flyerhq/react-native-keyboard-accessory-view": ["../src"]
},
```

5. Check the difference in `metro.config.js` and combine all
6. Revert `App.tsx`
