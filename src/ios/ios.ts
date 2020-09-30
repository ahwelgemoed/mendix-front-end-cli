import spawnAsync from "@expo/spawn-async";
import path from "path";

export const TIME_TO_WAIT_FOR_SIM_BOOT = 10 * 1000;

export const openLastUsedDevice = async ({ spinner }) => {
  try {
    const stdout = await spawnAsync("open", ["-a", "simulator"]);
    return stdout;
  } catch (error) {
    spinner.fail("Something Went Wrong");
    throw new Error(error);
  }
};
export const listAllIosDevices = async () => {
  try {
    const stdout = await spawnAsync("xcrun", ["simctl", "list"]);
    return stdout;
  } catch (error) {
    throw new Error(error);
  }
};
export const getIdOfOpenDevice = async ({ getIdOfApp }) => {
  try {
    getIdOfApp.start();
    const { stdout } = await listAllIosDevices();
    const allDevices = await stdout.split("\n");
    const firstBootedDevice = await allDevices.find((x) => {
      return x.includes("Booted");
    });
    const idOfOpenDevice =
      firstBootedDevice && (await firstBootedDevice.split(/[()]+/)[1]);
    return idOfOpenDevice;
  } catch (error) {
    getIdOfApp.fail("Something Went Wrong");
    throw new Error(error);
  }
};
// xcrun simctl install 7FAB6CD2-70D0-416F-9C50-4C7C23B2ABCD Users/<username>/Downloads/test.app
export const installMendixAppOnIos = async ({ idOfOpenDevice }) => {
  try {
    const stdout = await spawnAsync("xcrun", [
      "simctl",
      "install",
      idOfOpenDevice,
      pathToIosApp(),
    ]);
    return stdout;
  } catch (error) {
    throw new Error(error);
  }
};

const pathToIosApp = () => {
  return path.join(__dirname, "..", "apks", "DeveloperApp.app");
};

// open -a simulator
// Download your app and add it in a location that they can access the path.
// example: Users/<username>/Downloads/test.app

// Get the device ID xcrun simctl list devices example 7FAB6CD2-70D0-416F-9C50-4C7C23B2ABCD
// With a valid simulator id, run xcrun simctl install 7FAB6CD2-70D0-416F-9C50-4C7C23B2ABCD
// Users/<username>/Downloads/test.app
// The app should install and they should be able to open the app.
// Open IOS SIMULATOR
// INSTALL Mendix APP
// OPEN Menix APP
