import { getTheme, ITheme } from "@fluentui/react"

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
