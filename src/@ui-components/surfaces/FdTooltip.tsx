import React from "react"
import { TooltipHost } from "@fluentui/react"

export const FdTooltip: React.FC<{ message: string }> = ({ message, children }) => {
  return (
    <TooltipHost content={message} styles={{ root: { display: "flex" } }}>
      {children}
    </TooltipHost>
  )
}
