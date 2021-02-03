import React, { useEffect, useState } from "react"
import { ThemeProvider } from "@fluentui/react-theme-provider"
import { darkTheme, lightTheme } from "../../theme"
import { loadTheme } from "@fluentui/react"
import { useMediaQuery } from "react-responsive"

export type ITheme = "light" | "dark" | "system"

export type IAppThemeProvider = {
  userTheme: ITheme
}
export const AppThemeProvider: React.FC<IAppThemeProvider> = ({ userTheme, children }) => {
  const darkSystem = useMediaQuery({ query: "(prefers-color-scheme: dark)" })
  const [theme, setTheme] = useState(
    userTheme === "dark" || (userTheme === "system" && darkSystem) ? darkTheme : lightTheme
  )

  useEffect(() => {
    if (userTheme === "dark" || (darkSystem && userTheme === "system")) {
      setTheme(darkTheme)
      loadTheme(darkTheme)
      document.body.style.backgroundColor = darkTheme.palette.white
    } else {
      setTheme(lightTheme)
      loadTheme(lightTheme)
    }
    document.body.style.backgroundColor = lightTheme.palette.white
  }, [darkSystem, userTheme])

  return (
    <ThemeProvider theme={theme} style={{ display: "flex", flex: "auto" }}>
      {children}
    </ThemeProvider>
  )
}
