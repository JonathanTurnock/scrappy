import { app, BrowserWindow, Menu } from "electron"
import * as logger from "electron-log"
import { isDev, isServe } from "./env-helpers"

export let window: BrowserWindow | null = null

export const createWindow = (): BrowserWindow => {
  logger.info("Creating Window")
  // const size = screen.getPrimaryDisplay().workAreaSize

  window = new BrowserWindow({
    // x: 0,
    // y: 0,
    // width: size.width,
    // height: size.height,
    webPreferences: {
      allowRunningInsecureContent: false,
      contextIsolation: true,
      enableRemoteModule: false,
      nativeWindowOpen: false,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      safeDialogs: true,
      sandbox: true,
      webSecurity: true,
      webviewTag: false,
      devTools: isDev,
    },
    fullscreen: false,
    autoHideMenuBar: true,
  })

  if (isServe) {
    logger.info('Loading from "http://localhost:3000"')
    window.loadURL("http://localhost:3000")
  } else {
    logger.info(`Loading from "app://scrappy/index.html"`)
    window.loadURL("app://scrappy/index.html")
  }

  if (!isDev) {
    Menu.setApplicationMenu(new Menu())
  }

  window.on("closed", () => {
    logger.info("Window Closed, Quitting Application")
    app.quit()
  })

  return window
}
