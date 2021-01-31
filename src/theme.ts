import { createTheme, initializeIcons } from "@fluentui/react"

const defaultFontStyle = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontWeight: "regular",
}

export const darkTheme = createTheme({
  isInverted: true,
  defaultFontStyle,
  palette: {
    themePrimary: "#d2d2d2",
    themeLighterAlt: "#d6d6d6",
    themeLighter: "#dbdbdb",
    themeLight: "#e0e0e0",
    themeTertiary: "#e5e5e5",
    themeSecondary: "#eaeaea",
    themeDarkAlt: "#efefef",
    themeDark: "#f4f4f4",
    themeDarker: "#f9f9f9",
    neutralLighterAlt: "#2d2d2d",
    neutralLighter: "#363636",
    neutralLight: "#434343",
    neutralQuaternaryAlt: "#4c4c4c",
    neutralQuaternary: "#535353",
    neutralTertiaryAlt: "#707070",
    neutralTertiary: "#c8c8c8",
    neutralSecondary: "#d0d0d0",
    neutralPrimaryAlt: "#dadada",
    neutralPrimary: "#ffffff",
    neutralDark: "#f4f4f4",
    black: "#f8f8f8",
    white: "#242424",
  },
})

export const lightTheme = createTheme({
  isInverted: false,
  defaultFontStyle,
  palette: {
    themePrimary: "#404040",
    themeLighterAlt: "#f7f7f7",
    themeLighter: "#e0e0e0",
    themeLight: "#c6c6c6",
    themeTertiary: "#8c8c8c",
    themeSecondary: "#575757",
    themeDarkAlt: "#393939",
    themeDark: "#303030",
    themeDarker: "#242424",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#595959",
    neutralSecondary: "#373737",
    neutralPrimaryAlt: "#2f2f2f",
    neutralPrimary: "#000000",
    neutralDark: "#151515",
    black: "#0b0b0b",
    white: "#ffffff",
  },
})

initializeIcons("static/media/")

export const sizing = {
  height: { standard: "42px", compact: "38px", standardIcon: "26px", compactIcon: "22px" },
  width: { standard: "42px", compact: "38px", standardIcon: "26px", compactIcon: "22px" },
}
