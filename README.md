# Mendix-Front-End-CLI

## What It can/should Do

This is made to try and simplify Project Setup for Mac Users running Mendix Studio Pro with Parallels, among other things, it also attempts to help with local dev work by running app in simulators on the Developers device.

### Install / Usage

```bash
npm i PACKAGE_NAME -g
```

OR

```bash
npx PACKAGE_NAME
```

### It can

- Generate in `.env` file to link your widget created with `yo` on your mac to your mendix app on your Windows C drive.
  [Mac Only]

- Startup, Open and Install the Mendix Dev App in Android Studio [Mac and Windows]

- Startup, Open and Install the Mendix Dev App in IOS Simulator [Mac Only]

_Ps. Just run `yarn setup || npm run setup` and You will be prompted on what you can do._

We try to make it as easy as possible this does require that you setup your dev environment correctly.

## Setup Android Studio on [Mac]

<details>
  <summary>Open Setup Steps</summary>
- Download and Install following the recommended React Native Setup that can be found here

[React Native Setup](https://reactnative.dev/docs/environment-setup)

#### In Short

- Install Homebrew [Brew](https://brew.sh/) _(Ps. If you don't know what it is,spoiler ⏰ its great!)_

- `brew install node && brew install watchman`

- `brew cask install adoptopenjdk/openjdk/adoptopenjdk8`

- Download Android Studio (https://developer.android.com/studio/index.html)

  - Android SDK
  - Android SDK Platform
  - Android Virtual Device

  **This is the most important part and ensure you get it right**

  Add the following lines to your `$HOME/.bash_profile` or `$HOME/.bashrc` (if you are using zsh then `~/.zprofile` or `~/.zshrc`) config file

  ```
  export PATH=$HOME/bin:/usr/local/bin:$PATH
  export PATH="${HOME}/Library/Android/sdk/tools:${HOME}/Library/Android/sdk/pl$
  export ANDROID_SDK=$HOME/Library/Android/sdk
  export PATH=$ANDROID_SDK/emulator:$ANDROID_SDK/tools:$PATH
  export PATH=$PATH:~/Library/Android/sdk/platform-tools/
  ```

  This should work if you did not change the path to the SDK

  _Restart_ your terminal and run `adb` if it returns a long list you are fine if not...
    </details>

## Setup XCode on [Mac]

<details>
  <summary>Open Setup Steps</summary>

[React Native Setup](https://reactnative.dev/docs/environment-setup)

</details>

## Setup Android Studio on [Windows]

<details>
  <summary>Open Setup Steps</summary>
[React Native Setup](https://reactnative.dev/docs/environment-setup)
  </details>

## TO_DO

🔘 Test on Mac

⚪️ Test on Windows

⚪️ Remote Download app and apk - (ATM its in the project file)

⚪️ Finish IOS Setup

⚪️ Add Kill commands for Devices

⚪️ Add Reboot commands for Devices

⚪️ Version Check current Package with remote and prompt user to upgrade. _(Not major if user use NPX)_
