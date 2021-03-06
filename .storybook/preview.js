import { darkTheme, lightTheme } from "../src/theme"
import { ThemeProvider } from "@fluentui/react-theme-provider"
import { useEffect } from "react"
import { initializeIcons, loadTheme } from "@fluentui/react"
import "../src/index.scss"

initializeIcons()

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Fluent UI Theme",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      items: ["light", "dark"],
    },
  },
}

const withThemeProvider = (Story, context) => {
  const theme = context.globals.theme === "light" ? lightTheme : darkTheme

  useEffect(() => {
    loadTheme(theme)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  )
}
export const decorators = [withThemeProvider]
