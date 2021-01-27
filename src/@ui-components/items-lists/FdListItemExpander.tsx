import { IconButton } from "@fluentui/react"
import React from "react"
import styled from "styled-components"
import { palette, sizing } from "../../theme"

const ExpanderIcon = styled(IconButton)`
  width: ${sizing.width.standard};
  height: 100%;

  cursor: initial;
  color: ${palette.neutralDark};

  .rotatable {
    transform-origin: 50% 50%;
    transition: transform 0.1s linear 0s;
    transform: rotate(0deg);
  }

  .rotated {
    transform-origin: 50% 50%;
    transition: transform 0.1s linear 0s;
    transform: rotate(90deg);
  }

  :hover {
    background: rgba(0, 0, 0, 0.035);
    color: ${palette.neutralDark};
  }
`

export type IListItemExpander = {
  onExpand: () => void
  onCollapse: () => void
  isExpanded: boolean
}
export const FdListItemExpander: React.FC<IListItemExpander> = ({
  onExpand,
  onCollapse,
  isExpanded,
}) => {
  const handleClick = () => {
    isExpanded ? onCollapse() : onExpand()
  }

  return (
    <ExpanderIcon
      style={{ width: sizing.width.standard, height: "100%" }}
      styles={{ icon: { fontSize: "small" } }}
      iconProps={{
        iconName: "ChevronRightMed",
        className: isExpanded ? "rotated" : "rotatable",
      }}
      onClick={handleClick}
    />
  )
}
