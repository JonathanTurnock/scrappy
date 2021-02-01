import React from "react"
import { ActionBarContainer, ActionBarItem } from "../../../@ui-kit"
import { SearchBox, Stack } from "@fluentui/react"
import { IActionBar } from "./DesktopActionBar"

export const MobileActionBar: React.FC<IActionBar> = ({
  onAdd,
  onRename,
  onDelete,
  onToggleSelection,
  onFilter,
  selectionCount,
}) => {
  return (
    <ActionBarContainer horizontal={false}>
      <Stack style={{ flex: "auto" }} horizontalAlign={"stretch"} verticalAlign={"center"}>
        <SearchBox
          underlined={true}
          placeholder="Search"
          onSearch={onFilter}
          onClear={() => onFilter("")}
        />
      </Stack>
      <Stack horizontal={true} horizontalAlign={"center"} tokens={{ childrenGap: "0.5rem" }}>
        <ActionBarItem icon="Add" name="New" onClick={onAdd} />
        {selectionCount === 1 && <ActionBarItem icon="Rename" name="Rename" onClick={onRename} />}
        {selectionCount > 0 && (
          <ActionBarItem
            icon="Delete"
            name={selectionCount > 1 ? "Delete All" : "Delete"}
            onClick={onDelete}
          />
        )}
        <ActionBarItem icon="MultiSelect" name="Select" onClick={onToggleSelection} />
      </Stack>
    </ActionBarContainer>
  )
}
