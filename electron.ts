import { app, protocol } from "electron"
import { resolve } from "path"
import { info } from "electron-log"
import { createWindow } from "./main/create-window"
import appProtocol from "./main/app.protocol"

info("Logging Directory", resolve(app.getPath("logs")))

protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: { secure: true, standard: true },
  },
])

app.on("ready", () => {
  protocol.registerFileProtocol("app", appProtocol(resolve(__dirname)))
  createWindow()
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event) => {
    event.preventDefault()
  })
})

app.on("activate", () => {
  if (window === null) {
    createWindow()
  }
})
