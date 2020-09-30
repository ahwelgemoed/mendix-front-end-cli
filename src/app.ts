#!/usr/bin/env node
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import inquirer from "inquirer";
import os from "os";
import * as yargs from "yargs";

interface IArguments {
  _: any;
}

const argv: IArguments = yargs.options({
  android: { type: "string" },
  env: { type: "string" },
  ios: { type: "string" },
}).argv;

const USER_PLATFORM = os.platform();

// Android
import { mainAndroidProcess } from "./android/main";
// env
import { mainEnvProcess } from "./env/main";
// ios
import { mainIosProcess } from "./ios/main";
// Very Anonymous Function Invoking itself

(async () => {
  clear();
  console.log(
    chalk.blueBright(
      figlet.textSync("Mendix-FE-CLI", { horizontalLayout: "full" })
    )
  );
  if (!argv._[0]) {
    const options = {
      ENV: () => mainEnvProcess(),
      Android: () => mainAndroidProcess(),
      iOS: () => mainIosProcess(),
    };
    const { noArgs } = await inquirer.prompt([
      {
        choices: Object.keys(options),
        message: "What do you want to do",
        name: "noArgs",
        type: "list",
      },
    ]);
    const userSelected = await options[noArgs];
    if (userSelected) {
      await userSelected();
    }
  }
})();

// http://10.211.55.3:8080
