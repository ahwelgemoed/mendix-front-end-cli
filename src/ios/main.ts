import ora from "ora";

import {
  getIdOfOpenDevice,
  installMendixAppOnIos,
  openLastUsedDevice,
  TIME_TO_WAIT_FOR_SIM_BOOT,
} from "./ios";

export const mainIosProcess = async () => {
  const spinner = ora("Starting Up Device").start();
  const waitingForStartup = ora("Working Some Magic");
  const getIdOfApp = ora("Getting Device ID");
  const installMendixAppSpinner = ora("Installing Mendix App");

  const lastDevice = await openLastUsedDevice({ spinner });
  if (lastDevice.status === 0) {
    spinner.succeed(`Found Booted Device`);
    waitingForStartup.start();
    setTimeout(async () => {
      waitingForStartup.stop();
      const idOfOpenDevice = await getIdOfOpenDevice({ getIdOfApp });
      if (idOfOpenDevice) {
        getIdOfApp.succeed(`Booted Device`);
        installMendixAppSpinner.start();
        const installedApp = await installMendixAppOnIos({ idOfOpenDevice }); // TO DO
        if (installedApp) {
          installMendixAppSpinner.succeed("App Installed");
        }
      }
    }, TIME_TO_WAIT_FOR_SIM_BOOT);
  }
};
