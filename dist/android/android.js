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
exports.checkIfBootHasCompleted = exports.listAllAppsOnDevice = exports.openMendixApp = exports.installMendixApp = exports.startupSimulator = exports.witchSimulatorIsInstalled = void 0;
const spawn_async_1 = __importDefault(require("@expo/spawn-async"));
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
exports.witchSimulatorIsInstalled = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stdout } = yield spawn_async_1.default("emulator", ["-list-avds"]);
        return stdout;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.startupSimulator = ({ selectedDevice, spinner }) => __awaiter(void 0, void 0, void 0, function* () {
    child_process_1.exec(`emulator -avd ${selectedDevice}`, (err, stdout, stderr) => {
        if (err) {
            spinner.fail("Something Went Wrong");
            return;
        }
    });
});
exports.installMendixApp = ({ afterBootSpinner }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stdout } = yield spawn_async_1.default("adb", [
            "install-multiple",
            getIDofApk("1.apk"),
            getIDofApk("2.apk"),
            getIDofApk("3.apk"),
            getIDofApk("4.apk"),
            getIDofApk("5.apk"),
        ]);
        return stdout;
    }
    catch (error) {
        console.log("error", error);
        afterBootSpinner.fail("Something Went Wrong with App Install");
        throw new Error(error);
    }
});
const getIDofApk = (name) => {
    return path_1.default.join(__dirname, "..", "apks", name);
};
exports.openMendixApp = ({ openMendixAppSpinner, installedAppName, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stdout } = yield spawn_async_1.default("adb", [
            "shell",
            "monkey",
            `-p ${installedAppName}`,
            "-v 1",
        ]);
        return stdout;
    }
    catch (error) {
        openMendixAppSpinner.fail("Mendix App could not be Opened");
        throw new Error(error);
    }
});
exports.listAllAppsOnDevice = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stdout } = yield spawn_async_1.default("adb", ["shell", "pm list packages"]);
        const allApps = stdout.split("\n").find((x) => {
            if (x.includes("mendix"))
                return x;
        });
        if (allApps) {
            return allApps.split("package:")[1];
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("error", error);
    }
});
exports.checkIfBootHasCompleted = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield spawn_async_1.default("adb", [
            "shell",
            "am broadcast",
            "-a android.intent.action.ACTION_BOOT_COMPLETED",
        ]);
        return result;
    }
    catch (error) {
        return error;
    }
});
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
//# sourceMappingURL=android.js.map