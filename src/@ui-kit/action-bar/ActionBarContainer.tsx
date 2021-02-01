import React from "react"
import { Stack } from "@fluentui/react"
import { useTheme } from "@fluentui/react-theme-provider"

export type IActionBar = {
  horizontal?: boolean
}
export const ActionBarContainer: React.FC<IActionBar> = ({ children, horizontal = true }) => {
  const { palette } = useTheme()

  return (
    <Stack
      horizontal={horizontal}
      tokens={{ childrenGap: "0.5rem" }}
      styles={{
        root: {
          padding: "0.5rem",
          borderBottom: `${palette.neutralLight} solid 1px`,
        },
      }}
    >
      {children}
    </Stack>
  )
}
