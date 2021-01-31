import React from "react"
import styled from "styled-components"
import { useTheme } from "@fluentui/react-theme-provider"

export const Panel = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
`

export type ISideNavPanel = {}
export const SideNavPanel: React.FC<ISideNavPanel> = ({ children }) => {
  const { palette } = useTheme()

  return <Panel style={{ backgroundColor: palette.neutralLighter }}>{children}</Panel>
}
