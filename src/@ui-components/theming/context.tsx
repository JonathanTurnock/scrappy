import React, { createContext, useContext } from "react"
import { IExtendedTheme, theme } from "../../theme"

export type IFdThemeContext = {
  theme: IExtendedTheme
}
export const FdThemeContext = createContext<IFdThemeContext>({ theme })

export const FdThemeContextProvider: React.FC<{ theme: IExtendedTheme }> = ({
  theme,
  children,
}) => {
  return <FdThemeContext.Provider value={{ theme }}>{children}</FdThemeContext.Provider>
}

export const useFdTheme = () => useContext<IFdThemeContext>(FdThemeContext)
