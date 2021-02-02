import React, { useMemo } from "react"
import { Icon, IconButton, Stack, Text } from "@fluentui/react"
import { useTheme } from "@fluentui/react-theme-provider"

export const DatabaseError: React.FC<{ message: string; onReset: () => void }> = ({
  message,
  onReset,
}) => {
  const { palette } = useTheme()
  const displayedMessage = useMemo(() => {
    if (message.includes("another instance on this adapter has a different password")) {
      return "Invalid Password"
    }
    return message
  }, [message])

  return (
    <Stack
      horizontal
      horizontalAlign="center"
      verticalAlign="center"
      style={{ flex: "auto" }}
      tokens={{ childrenGap: "0.5rem" }}
    >
      <Icon iconName="Warning" style={{ color: palette.red }} />
      <Text variant="mediumPlus" style={{ textAlign: "center" }}>
        {displayedMessage}
      </Text>
      <IconButton
        iconProps={{ iconName: "Refresh" }}
        onClick={() => {
          onReset()
        }}
      />
    </Stack>
  )
}
