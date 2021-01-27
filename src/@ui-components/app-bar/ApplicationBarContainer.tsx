import React from "react"
import styled from "styled-components"
import { SFlex } from "../layouts"
import { palette } from "../../theme"

const AppBarContainer = styled(SFlex)`
  display: flex;
  flex: auto;
  flex-direction: row;
  align-items: center;
  background-color: ${palette.themePrimary};
  color: ${palette.white};
`

export type IApplicationBarContainer = {}
export const ApplicationBarContainer: React.FC<IApplicationBarContainer> = ({ children }) => {
  return <AppBarContainer>{children}</AppBarContainer>
}
