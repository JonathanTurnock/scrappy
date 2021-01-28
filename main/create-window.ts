import { app, BrowserWindow, Menu, screen } from "electron"
import * as logger from "electron-log"
import { isDev, isServe } from "./env-helpers"
import { resolve } from "path"
import { format } from "url"

export let window: BrowserWindow | null = null

export const createWindow = (): BrowserWindow => {
  logger.info("Creating Window")
  const size = screen.getPrimaryDisplay().workAreaSize

  window = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      webSecurity: false,
      devTools: isDev,
    },
    fullscreen: false,
    autoHideMenuBar: true,
    titleBarStyle: "hiddenInset",
  })

  if (isServe) {
    logger.info('Loading from "http://localhost:3000"')
    window.loadURL("http://localhost:3000")
  } else {
    logger.info(`Loading from ${resolve(__dirname, "../index.html")}`)
    window.loadURL(
      format({
        pathname: resolve(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true,
      })
    )
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
