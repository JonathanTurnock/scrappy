import React from "react"
import { Spinner, Stack } from "@fluentui/react"

export const LoadingScreen: React.FC = () => {
  return (
    <Stack style={{ flex: "auto" }} horizontalAlign="center" verticalAlign="center">
      <Spinner label="Please wait..." />
    </Stack>
  )
}
