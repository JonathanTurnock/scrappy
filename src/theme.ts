import { getTheme, initializeIcons, ITheme, loadTheme } from "@fluentui/react"

loadTheme({
  defaultFontStyle: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontWeight: "regular",
  },
})

initializeIcons("static/media/")

export type IExtendedTheme = {
  sizing: {
    height: { standard: string; compact: string; standardIcon: string; compactIcon: string }
    width: { standard: string; compact: string; standardIcon: string; compactIcon: string }
  }
} & ITheme

export const theme: IExtendedTheme = {
  ...getTheme(),
  sizing: {
    height: { standard: "42px", compact: "38px", standardIcon: "26px", compactIcon: "22px" },
    width: { standard: "42px", compact: "38px", standardIcon: "26px", compactIcon: "22px" },
  },
}
export const { palette, sizing } = theme
