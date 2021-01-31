import React, { MouseEvent, useEffect, useState } from "react"
import {
  ContextualMenu,
  DirectionalHint,
  IContextualMenuItem,
  IContextualMenuProps,
} from "@fluentui/react"

export type ProvinceContextMenuProps = {
  mouseEvent?: MouseEvent
  items: IContextualMenuItem[]
  onDismiss: () => void
}
export const FdContextMenu: React.FC<ProvinceContextMenuProps> = ({
  mouseEvent,
  items,
  onDismiss,
}) => {
  const [contextualMenuProps, setContextualMenuProps] = useState<IContextualMenuProps>()

  useEffect(() => {
    if (mouseEvent) {
      const contextualMenuProps: IContextualMenuProps = {
        // @ts-ignore
        target: (mouseEvent?.originalEvent && mouseEvent.originalEvent) || mouseEvent, // originalEvent is produced by Mapbox MapMouseEvent
        directionalHint: DirectionalHint.bottomLeftEdge,
        items,
        onDismiss: () => {
          setContextualMenuProps(undefined)
          onDismiss()
        },
      }
      setContextualMenuProps(contextualMenuProps)
    }
  }, [mouseEvent, onDismiss])

  return <>{contextualMenuProps && <ContextualMenu {...contextualMenuProps} />}</>
}
