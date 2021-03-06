import React from "react"
import { ActionBarContainer, ActionBarItem } from "../../../@ui-kit"
import { SearchBox, Stack } from "@fluentui/react"

export type IActionBar = {
  onAdd: () => void
  onRename: () => void
  onDelete: () => void
  onToggleSelection: () => void
  onExport: () => void
  onImport: () => void
  onFilter: (filterText: string) => void
  selectionCount: number
}
export const DesktopActionBar: React.FC<IActionBar> = ({
  onAdd,
  onRename,
  onDelete,
  onToggleSelection,
  onExport,
  onImport,
  onFilter,
  selectionCount,
}) => {
  return (
    <ActionBarContainer>
      <Stack horizontal>
        <ActionBarItem icon="Add" name="New Scrap" onClick={onAdd} />
        {selectionCount === 1 && (
          <ActionBarItem icon="Rename" name="Rename Scrap" onClick={onRename} />
        )}
        {selectionCount > 0 && (
          <ActionBarItem
            icon="Delete"
            name={selectionCount > 1 ? "Delete Scraps" : "Delete Scrap"}
            onClick={onDelete}
          />
        )}
        <ActionBarItem icon="MultiSelect" name="Select" onClick={onToggleSelection} />
        <ActionBarItem icon="Upload" name="Import" onClick={onImport} />
        {selectionCount > 0 && (
          <ActionBarItem
            icon="Download"
            name={selectionCount > 1 ? "Export All" : "Export"}
            onClick={onExport}
          />
        )}
      </Stack>
      <Stack
        style={{ paddingRight: "0.5rem", flex: "auto" }}
        horizontalAlign={"end"}
        verticalAlign={"center"}
      >
        <SearchBox
          placeholder="Search"
          size={30}
          onSearch={onFilter}
          onClear={() => onFilter("")}
        />
      </Stack>
    </ActionBarContainer>
  )
}
