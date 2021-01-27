import React from "react"
import SVG from "react-inlinesvg"
import { sizing } from "../../theme"

export const SSvgIcon: React.FC<{ svg: string }> = ({ svg }) => {
  return (
    <SVG
      src={svg}
      style={{
        height: sizing.height.standardIcon,
        width: sizing.width.standardIcon,
        display: "flex",
      }}
    />
  )
}
