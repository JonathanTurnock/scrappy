import { Text } from "@fluentui/react"
import styled from "styled-components"

export const LimitedText = styled(Text)`
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
`
