import { ITheme } from "./AppThemeProvider"
import { useEffect, useState } from "react"

const themeTransitions: Record<ITheme, ITheme> = {
  system: "dark",
  dark: "light",
  light: "system",
}

export type IUseThemeControllerCallbacks = {
  nextTheme: () => void
}

export const useThemeController = (): [ITheme, IUseThemeControllerCallbacks] => {
  const [theme, setTheme] = useState<ITheme>((localStorage.getItem("theme") as ITheme) || "system")

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  const nextTheme = () => {
    setTheme(themeTransitions[theme])
  }

  return [theme, { nextTheme }]
}
