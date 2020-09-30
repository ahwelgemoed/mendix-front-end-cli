"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installMendixAppOnIos = exports.getIdOfOpenDevice = exports.listAllIosDevices = exports.openLastUsedDevice = exports.TIME_TO_WAIT_FOR_SIM_BOOT = void 0;
const spawn_async_1 = __importDefault(require("@expo/spawn-async"));
const path_1 = __importDefault(require("path"));
exports.TIME_TO_WAIT_FOR_SIM_BOOT = 10 * 1000;
exports.openLastUsedDevice = ({ spinner }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stdout = yield spawn_async_1.default("open", ["-a", "simulator"]);
        return stdout;
    }
    catch (error) {
        spinner.fail("Something Went Wrong Opening Device");
        throw new Error(error);
    }
});
exports.listAllIosDevices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stdout = yield spawn_async_1.default("xcrun", ["simctl", "list"]);
        return stdout;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getIdOfOpenDevice = ({ getIdOfApp }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        getIdOfApp.start();
        const { stdout } = yield exports.listAllIosDevices();
        const allDevices = yield stdout.split("\n");
        const firstBootedDevice = yield allDevices.find((x) => {
            return x.includes("Booted");
        });
        const idOfOpenDevice = firstBootedDevice && (yield firstBootedDevice.split(/[()]+/)[1]);
        return idOfOpenDevice;
    }
    catch (error) {
        getIdOfApp.fail("Something Went Wrong");
        throw new Error(error);
    }
});
// xcrun simctl install 7FAB6CD2-70D0-416F-9C50-4C7C23B2ABCD Users/<username>/Downloads/test.app
exports.installMendixAppOnIos = ({ idOfOpenDevice }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stdout = yield spawn_async_1.default("xcrun", [
            "simctl",
            "install",
            idOfOpenDevice,
            pathToIosApp(),
        ]);
        return stdout;
    }
    catch (error) {
        throw new Error(error);
    }
});
const pathToIosApp = () => {
    return path_1.default.join(__dirname, "..", "apks", "DeveloperApp.app");
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
//# sourceMappingURL=ios.js.map