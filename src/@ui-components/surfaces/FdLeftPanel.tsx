import React from "react"
import { FdPanel } from "./FdPanel"
import styled from "styled-components"
import { sizing } from "../../theme"
import { Text } from "@fluentui/react"

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: ${sizing.height.standard};
  min-height: ${sizing.height.standard};
  padding: 0 14px 0 14px;
`

const TitleText = styled(Text)`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0;
  text-align: left;
`

export type IFdLeftPanel = {
  title?: string
}
export const FdLeftPanel: React.FC<IFdLeftPanel> = ({ title, children }) => {
  return (
    <FdPanel>
      <Title>
        <TitleText>{title}</TitleText>
      </Title>
      {children}
    </FdPanel>
  )
}
