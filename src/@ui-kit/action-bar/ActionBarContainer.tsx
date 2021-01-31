import React from "react"
import { Stack } from "@fluentui/react"
import { sizing } from "../../theme"
import { useTheme } from "@fluentui/react-theme-provider"

export type IActionBar = {}
export const ActionBarContainer: React.FC<IActionBar> = ({ children }) => {
  const { palette } = useTheme()

  return (
    <Stack
      horizontal
      styles={{
        root: {
          height: sizing.height.standard,
          borderBottom: `${palette.neutralLight} solid 1px`,
        },
      }}
    >
      {children}
    </Stack>
  )
}
