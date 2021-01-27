import React from "react"
import styled from "styled-components"
import { Text } from "@fluentui/react"

const NameText = styled(Text)`
  padding-left: 10px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0;
  text-align: left;
`

export type IAppName = {
  name: string
}
export const AppName: React.FC<IAppName> = ({ name }) => {
  return <NameText>{name}</NameText>
}
