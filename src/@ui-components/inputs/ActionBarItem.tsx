import React from "react"
import { CommandBarButton } from "@fluentui/react"

export type IActionBarItem = {
  icon: string
  name: string
  onClick: () => void
}
export const ActionBarItem: React.FC<IActionBarItem> = ({ icon, name, onClick }) => {
  return <CommandBarButton iconProps={{ iconName: icon }} text={name} onClick={onClick} />
}
