import React, { MouseEventHandler } from "react"
import { FdListItemExpander, IListItemExpander } from "./FdListItemExpander"
import { ListItem, ListItemPrimaryContent, ListItemSecondaryContent } from "./FdList"
import { Text } from "@fluentui/react"

export type IExpandableListItem = {
  primary: string
  secondary?: string
  onExpander: IListItemExpander
  onContextMenu: MouseEventHandler
}
export const FdExpandableListItem: React.FC<IExpandableListItem> = ({
  primary,
  secondary,
  onExpander,
  onContextMenu,
}) => {
  return (
    <ListItem onContextMenu={onContextMenu}>
      <FdListItemExpander {...onExpander} />
      <ListItemPrimaryContent>
        <Text style={{ fontWeight: onExpander.isExpanded ? 600 : undefined }}>{primary}</Text>
      </ListItemPrimaryContent>
      {secondary && (
        <ListItemSecondaryContent>
          <Text>{secondary}</Text>
        </ListItemSecondaryContent>
      )}
    </ListItem>
  )
}
