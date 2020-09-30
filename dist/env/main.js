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
exports.mainEnvProcess = void 0;
const dotenv_stringify_1 = __importDefault(require("dotenv-stringify"));
const fs_1 = require("fs");
const inquirer_1 = __importDefault(require("inquirer"));
const envConfig_1 = require("./envConfig");
exports.mainEnvProcess = () => __awaiter(void 0, void 0, void 0, function* () {
    const { env } = yield inquirer_1.default.prompt([
        {
            type: "list",
            message: "What type Of ENV do you want",
            name: "env",
            choices: Object.keys(envConfig_1.envConfigs),
        },
    ]);
    const userSelected = yield envConfig_1.envConfigs[env];
    const stringifyObj = yield dotenv_stringify_1.default(userSelected);
    yield fs_1.promises.writeFile(".env", stringifyObj);
    console.log(`
      ---------
      ✅ .env Generated - Remember to set the Path to Windows
      🚀 #GO_MAKE_IT
      ---------
      `);
});
//# sourceMappingURL=main.js.map