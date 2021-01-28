import * as logger from "electron-log";
import { dirname, resolve } from "path";
import { spawn } from "child_process";
import { isDev } from "./env-helpers";
import { app } from "electron";

const getServerPath = () => {
  if (isDev) {
    return resolve(__dirname, "../../../server/dist/wing-patrol-server.exe");
  } else {
    return resolve(dirname(app.getPath("exe")), "./wing-patrol-server.exe");
  }
};

export const startServer = (): void => {
  logger.info("Starting Server");

  const serverSubProcess = spawn(getServerPath());
  serverSubProcess.on("error", (e) => {
    logger.error("FAILED TO START SERVER", e);
  });
};
