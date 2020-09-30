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
  const getIdOfApp = ora("Getting ID");

  const lastDevice = await openLastUsedDevice({ spinner });
  if (lastDevice.status === 0) {
    spinner.succeed(`Device Booted`);
    waitingForStartup.start();
    setTimeout(async () => {
      waitingForStartup.stop();
      const idOfOpenDevice = await getIdOfOpenDevice({ getIdOfApp });
      if (idOfOpenDevice) {
        getIdOfApp.succeed(`Booted Device ID`);
        await installMendixAppOnIos({ idOfOpenDevice }); // TO DO
      }
    }, TIME_TO_WAIT_FOR_SIM_BOOT);
  }
};
