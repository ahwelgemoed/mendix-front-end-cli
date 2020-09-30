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
exports.mainIosProcess = void 0;
const ora_1 = __importDefault(require("ora"));
const ios_1 = require("./ios");
exports.mainIosProcess = () => __awaiter(void 0, void 0, void 0, function* () {
    const spinner = ora_1.default("Starting Up Device").start();
    const waitingForStartup = ora_1.default("Working Some Magic");
    const getIdOfApp = ora_1.default("Getting Device ID");
    const installMendixAppSpinner = ora_1.default("Installing Mendix App");
    const lastDevice = yield ios_1.openLastUsedDevice({ spinner });
    if (lastDevice.status === 0) {
        spinner.succeed(`Found Booted Device`);
        waitingForStartup.start();
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            waitingForStartup.stop();
            const idOfOpenDevice = yield ios_1.getIdOfOpenDevice({ getIdOfApp });
            if (idOfOpenDevice) {
                getIdOfApp.succeed(`Booted Device`);
                installMendixAppSpinner.start();
                const installedApp = yield ios_1.installMendixAppOnIos({ idOfOpenDevice }); // TO DO
                if (installedApp) {
                    installMendixAppSpinner.succeed("App Installed");
                }
            }
        }), ios_1.TIME_TO_WAIT_FOR_SIM_BOOT);
    }
});
//# sourceMappingURL=main.js.map