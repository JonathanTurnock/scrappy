import React from "react"
import { ActionBarContainer, ActionBarItem } from "../../../@ui-kit"

export type IActionBar = {
  onSave: () => void
  onDetails: () => void
}
export const ActionBar: React.FC<IActionBar> = ({ onSave, onDetails }) => {
  return (
    <ActionBarContainer>
      <ActionBarItem icon="Save" name="Save" onClick={onSave} />
      <ActionBarItem icon="Info" name="Details" onClick={onDetails} />
    </ActionBarContainer>
  )
}
