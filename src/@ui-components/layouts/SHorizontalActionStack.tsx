import { Stack } from "@fluentui/react"
import React from "react"
import { theme } from "../../theme"

export const SHorizontalActionStack: React.FC = ({ children }) => {
  return (
    <Stack horizontal styles={{ root: { height: theme.sizing.height.standard } }}>
      {children}
    </Stack>
  )
}
