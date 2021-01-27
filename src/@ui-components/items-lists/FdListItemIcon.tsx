import React, { CSSProperties } from "react"
import styled from "styled-components"
import { IconButton } from "@fluentui/react"
import { palette, sizing, theme } from "../../theme"

const Icon = styled(IconButton)`
  width: ${sizing.width.standardIcon};
  height: ${sizing.width.standardIcon};

  cursor: initial;
  color: ${palette.neutralDark};

  :hover {
    background: rgba(0, 0, 0, 0);
    color: ${palette.neutralDark};
  }
`

export const FdListItemIcon: React.FC<{
  icon: string
  style?: CSSProperties
  isWarning?: boolean
  iconSize?: string
}> = ({ icon, isWarning = false, style, iconSize = sizing.height.compactIcon }) => {
  return (
    <div
      style={{
        width: theme.sizing.width.standard,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Icon
        style={{
          color: isWarning ? theme.palette.red : theme.palette.neutralDark,
          ...style,
        }}
        iconProps={{
          iconName: icon,
        }}
        styles={{
          icon: {
            fontSize: iconSize,
            lineHeight: sizing.height.standardIcon,
            height: sizing.height.standardIcon,
            width: sizing.width.standardIcon,
          },
        }}
      />
    </div>
  )
}
