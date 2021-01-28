import "reflect-metadata"
import "es6-shim"
import "../src/index.scss"
import { initializeIcons } from "@fluentui/react"

initializeIcons()

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
