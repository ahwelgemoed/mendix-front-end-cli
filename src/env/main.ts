import stringify from "dotenv-stringify";
import { promises as fs } from "fs";
import inquirer from "inquirer";
import { envConfigs } from "./envConfig";

export const mainEnvProcess = async () => {
  const { env } = await inquirer.prompt([
    {
      type: "list",
      message: "What type Of ENV do you want",
      name: "env",
      choices: Object.keys(envConfigs),
    },
  ]);
  const userSelected = await envConfigs[env];
  const stringifyObj = await stringify(userSelected);
  await fs.writeFile(".env", stringifyObj);
  console.log(`
      ---------
      ✅ .env Generated - Remember to set the Path to Windows
      🚀 #GO_MAKE_IT
      ---------
      `);
};
