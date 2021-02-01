import React from "react"
import { ActionBarContainer, ActionBarItem } from "../../../@ui-kit"

export type IActionBar = {
  onSave: () => void
}
export const ActionBar: React.FC<IActionBar> = ({ onSave }) => {
  return (
    <ActionBarContainer>
      <ActionBarItem icon="Save" name="Save" onClick={onSave} />
    </ActionBarContainer>
  )
}
