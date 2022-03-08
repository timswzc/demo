# VolunteerApp

---

## Prerequisites

- Install Node.js https://nodejs.org/en/download/
- Install Git
  - Github Desktop (GUI version): https://desktop.github.com/
  - Git (Command line version): https://github.com/git-guides/install-git

- Install Visual Studio Code https://code.visualstudio.com/
- Install ESLint Plugin for VSCode https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- Install Expo Mobile App
  - iOS: https://apps.apple.com/us/app/expo-go/id982107779
  - Android: https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US

---

## Project Setup

- Clone the repository
  - ```git clone https://github.com/kevintongg/VolunteerApp.git```
- Running the project
  - Setup
      ``` 
      npm i -g yarn
      npm i -g expo-cli
      npm install
      ```
  - Running
    - After the initial set up, the project can be started by running the command ``` expo start ```
- Testing project on a mobile device
  - Connect your mobile device to same network as your computer
  - Scan QR code from web expo web page that opens after running
  - Open with the Expo app

---

## Native Project Build

### Android

#### Dependencies

- Android Studio
  - https://developer.android.com/studio

  ```
  yarn android
  ```

### iOS

#### Dependencies

- Xcode
  - https://developer.apple.com/xcode/
- Cocoa Pods
  - https://cocoapods.org/

  ```
  yarn ios
  ```

---

## Dependencies

- **React Native**: Used to develop applications for Android, Android TV, iOS, macOS, tvOS, Web, Windows and UWP by
  enabling developers to use the React framework along with native platform capabilities
  - https://reactnative.dev/
- **Expo**: Open-source platform for making universal native apps that run on Android, iOS, and the web. It includes a
  universal runtime and libraries that let you build native apps by writing React and JavaScript. This library will be
  used for fast testing and skips the need to build using Xcode or Android Studio, allowing for testing iOS apps on
  non-Macs
  - https://expo.dev/
- **Babel**: Toolchain that is mainly used to convert JSX/TSX into JavaScript or TypeScript
  - https://babeljs.io/
- **Jest Expo**: Framework to run unit tests for React Native
  - https://jestjs.io/
  - https://www.npmjs.com/package/jest-expo
- **ESLint**: Development framework to ensure code follows the same standards
  - https://eslint.org/
