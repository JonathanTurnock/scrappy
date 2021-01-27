import styled from "styled-components"
import { palette } from "../../theme"

export const FdPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  background-color: ${palette.white};
  user-select: none;
  overflow-y: inherit;
`
