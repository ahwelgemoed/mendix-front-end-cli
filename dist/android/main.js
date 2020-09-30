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
exports.mainAndroidProcess = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const ora_1 = __importDefault(require("ora"));
const android_1 = require("./android");
exports.mainAndroidProcess = () => __awaiter(void 0, void 0, void 0, function* () {
    const listOfDevices = yield android_1.witchSimulatorIsInstalled();
    const rationalList = listOfDevices.split("\n").filter(Boolean);
    // TODO PROMPT USER TO SELECT EMULATOR
    let selectedDevice;
    if (rationalList.length <= 1) {
        selectedDevice = listOfDevices;
    }
    else {
        const { witchSimulatorToStart } = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "witchSimulatorToStart",
                message: "What Simulator To Start",
                choices: rationalList,
            },
        ]);
        selectedDevice = witchSimulatorToStart;
    }
    const spinner = ora_1.default("Starting Up Device").start();
    const afterBootSpinner = ora_1.default("Installing Mendix App");
    const openMendixAppSpinner = ora_1.default("Opening App");
    yield android_1.startupSimulator({ selectedDevice, spinner });
    spinner.text = `Starting Device`;
    let resultsStatus = 1;
    do {
        const { status } = yield android_1.checkIfBootHasCompleted();
        resultsStatus = status;
    } while (resultsStatus == 1);
    if (resultsStatus == 0) {
        spinner.succeed(`Device Booted`);
        const installedAppName = yield android_1.listAllAppsOnDevice();
        if (installedAppName) {
            openMendixAppSpinner.start();
            const openedApp = yield android_1.openMendixApp({
                installedAppName,
                openMendixAppSpinner,
            });
            if (openedApp) {
                openMendixAppSpinner.succeed(`
            --------
            ✅ Mendix App Open
            ✅ Keep this Terminal Open to Keep Android Sim Running
            🚀 #GOMAKEIT
            --------
          `);
            }
        }
        else {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                afterBootSpinner.start();
                const installedSuccess = yield android_1.installMendixApp({
                    afterBootSpinner,
                });
                if (installedSuccess.includes("Success")) {
                    afterBootSpinner.succeed(`App Installed`);
                    openMendixAppSpinner.start();
                    const installedAppName = yield android_1.listAllAppsOnDevice();
                    const openedApp = yield android_1.openMendixApp({
                        installedAppName,
                        openMendixAppSpinner,
                    });
                    if (openedApp) {
                        openMendixAppSpinner.succeed(`
            --------
            ✅ Mendix App Open
            ✅ Keep this Terminal Open to Keep Android Sim Running
            🚀 #GOMAKEIT
            --------
          `);
                    }
                }
            }), 1000);
        }
    }
});
//# sourceMappingURL=main.js.map