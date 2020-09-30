#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const inquirer_1 = __importDefault(require("inquirer"));
const os_1 = __importDefault(require("os"));
const yargs = __importStar(require("yargs"));
const argv = yargs.options({
    android: { type: "string" },
    env: { type: "string" },
    ios: { type: "string" },
}).argv;
const USER_PLATFORM = os_1.default.platform();
// Android
const main_1 = require("./android/main");
// env
const main_2 = require("./env/main");
// ios
const main_3 = require("./ios/main");
// Very Anonymous Function Invoking itself
(() => __awaiter(void 0, void 0, void 0, function* () {
    clear_1.default();
    console.log(chalk_1.default.blueBright(figlet_1.default.textSync("Mendix-FE-CLI", { horizontalLayout: "full" })));
    if (!argv._[0]) {
        const options = {
            ENV: () => main_2.mainEnvProcess(),
            Android: () => main_1.mainAndroidProcess(),
            iOS: () => main_3.mainIosProcess(),
        };
        const { noArgs } = yield inquirer_1.default.prompt([
            {
                choices: Object.keys(options),
                message: "What do you want to do",
                name: "noArgs",
                type: "list",
            },
        ]);
        const userSelected = yield options[noArgs];
        if (userSelected) {
            yield userSelected();
        }
    }
}))();
// http://10.211.55.3:8080
//# sourceMappingURL=app.js.map