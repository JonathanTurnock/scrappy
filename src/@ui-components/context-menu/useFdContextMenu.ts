import { useState } from "react"
import { IContextualMenuItem } from "@fluentui/react"

export const useFdContextMenu = <T>(items: IContextualMenuItem[]) => {
  const [mouseEvent, setMouseEvent] = useState<T | undefined>(undefined)

  const handleContextMenuEvent = (event: T) => {
    // @ts-ignore
    event.stopPropagation && event.stopPropagation()
    // @ts-ignore
    event.preventDefault && event.preventDefault()
    setMouseEvent(event)
  }

  const handleDismiss = () => {
    setMouseEvent(undefined)
  }

  return { mouseEvent, onContextMenu: handleContextMenuEvent, onDismiss: handleDismiss, items }
}
