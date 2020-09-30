import spawnAsync from "@expo/spawn-async";
import { exec } from "child_process";
import path from "path";

export const witchSimulatorIsInstalled = async () => {
  try {
    const { stdout } = await spawnAsync("emulator", ["-list-avds"]);
    return stdout;
  } catch (error) {
    throw new Error(error);
  }
};

export const startupSimulator = async ({ selectedDevice, spinner }) => {
  exec(`emulator -avd ${selectedDevice}`, (err, stdout, stderr) => {
    if (err) {
      spinner.fail("Something Went Wrong");
      return;
    }
  });
};

export const installMendixApp = async ({ afterBootSpinner }) => {
  try {
    const { stdout } = await spawnAsync("adb", [
      "install-multiple",
      getIDofApk("1.apk"),
      getIDofApk("2.apk"),
      getIDofApk("3.apk"),
      getIDofApk("4.apk"),
      getIDofApk("5.apk"),
    ]);
    return stdout;
  } catch (error) {
    console.log("error", error);
    afterBootSpinner.fail("Something Went Wrong with App Install");
    throw new Error(error);
  }
};
const getIDofApk = (name: string): string => {
  return path.join(__dirname, "..", "apks", name);
};

export const openMendixApp = async ({
  openMendixAppSpinner,
  installedAppName,
}) => {
  try {
    const { stdout } = await spawnAsync("adb", [
      "shell",
      "monkey",
      `-p ${installedAppName}`,
      "-v 1",
    ]);
    return stdout;
  } catch (error) {
    openMendixAppSpinner.fail("Mendix App could not be Opened");
    throw new Error(error);
  }
};

export const listAllAppsOnDevice = async () => {
  try {
    const { stdout } = await spawnAsync("adb", ["shell", "pm list packages"]);
    const allApps = stdout.split("\n").find((x) => {
      if (x.includes("mendix")) return x;
    });
    if (allApps) {
      return allApps.split("package:")[1];
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const checkIfBootHasCompleted = async () => {
  try {
    const result = await spawnAsync("adb", [
      "shell",
      "am broadcast",
      "-a android.intent.action.ACTION_BOOT_COMPLETED",
    ]);
    return result;
  } catch (error) {
    return error;
  }
};

// adb shell pm list packages

// adb shell monkey -p com.mendix.developerapp.min88 -v 1

//  cd ~/Library/Android/sdk/emulator
//./emulator -list-avds
// list out names Promoped user input
// Pixel_3a_API_30_x86

// emulator -avd avd_name

// ADD ANDROID TO PATH !!!

// adb devices // list booted devices
// adb shell
