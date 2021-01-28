import { app, protocol } from "electron"
import { resolve } from "path"
import { info } from "electron-log"
import { startServer } from "./main/start-server"
import { localImages } from "./main/file-protocols"
import { createWindow } from "./main/create-window"
import { isDev } from "./main/env-helpers"

info("Logging Directory", resolve(app.getPath("logs")))

app.allowRendererProcessReuse = true

app.whenReady().then(() => {
  protocol.registerFileProtocol("file", localImages([".png", ".jpg", ".jpeg", ".gif"]))
})

app.on("ready", () => {
  setTimeout(createWindow, 400)
  if (!isDev) {
    setTimeout(startServer, 400)
  }
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (window === null) {
    createWindow()
  }
})
