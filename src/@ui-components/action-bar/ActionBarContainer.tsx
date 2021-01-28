import React from "react"
import { theme } from "../../theme"
import { Stack } from "@fluentui/react"

export type IActionBar = {}
export const ActionBarContainer: React.FC<IActionBar> = ({ children }) => {
  return (
    <Stack
      horizontal
      styles={{
        root: {
          height: theme.sizing.height.standard,
          borderBottom: `${theme.palette.neutralLight} solid 1px`,
        },
      }}
    >
      {children}
    </Stack>
  )
}
