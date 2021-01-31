import React from "react"
import { Stack, Text } from "@fluentui/react"
import styled from "styled-components"

const BrandImage = styled.img`
  height: 32px;
  width: 32px;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.2));
`

const BrandStack = styled(Stack)`
  display: flex;
  padding: 0.25rem 0.25rem 0.25rem 1rem;
  align-items: center;
`

const BrandName = styled(Text)`
  font-family: "Rock Salt", sans-serif;
  user-select: none;
  padding-left: 1rem;
  font-size: 16px;
`

export type INavBrand = {}
export const NavBrand: React.FC<INavBrand> = ({}) => {
  return (
    <BrandStack horizontal>
      <BrandImage src={"/favicon.512x512.png"} alt={"brand-logo"} />
      <BrandName>Scrappy</BrandName>
    </BrandStack>
  )
}
