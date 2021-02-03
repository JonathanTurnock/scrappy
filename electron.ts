import { app, BrowserWindow, protocol } from "electron"
import { resolve } from "path"
import { info } from "electron-log"
import { createWindow } from "./main/create-window"
import appProtocol from "./main/app.protocol"

info("Logging Directory", resolve(app.getPath("logs")))

let win: BrowserWindow

protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: { secure: true, standard: true },
  },
])

app.on("ready", () => {
  protocol.registerFileProtocol("app", appProtocol(resolve(__dirname)))
  win = createWindow()
})

app.on("activate", () => {
  if (win === null) {
    win = createWindow()
  }
})

app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event) => {
    event.preventDefault()
  })
})
