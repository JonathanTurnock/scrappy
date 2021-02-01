import React from "react"
import { CommandBarButton } from "@fluentui/react"
import { sizing } from "../../theme"

export type IActionBarItem = {
  icon: string
  name: string
  onClick: () => void
}
export const ActionBarItem: React.FC<IActionBarItem> = ({ icon, name, onClick }) => {
  return (
    <CommandBarButton
      style={{ minHeight: sizing.height.standard }}
      iconProps={{ iconName: icon }}
      text={name}
      onClick={onClick}
    />
  )
}
