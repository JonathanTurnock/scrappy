import React from "react"
import { Icon, Text } from "@fluentui/react"

export const DatabaseError: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
      <Icon iconName="Warning" />
      <Text variant="mediumPlus">Failed to Initialize the Database</Text>
      <Text variant="mediumPlus">{message}</Text>
    </div>
  )
}
