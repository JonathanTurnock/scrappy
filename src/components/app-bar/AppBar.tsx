import React from "react"
import { IconButton, Stack, Text, TooltipHost } from "@fluentui/react"
import styled from "styled-components"
import { lightTheme } from "../../theme"
import { ITheme } from "../../@ui-kit"
import { capitalCase } from "change-case"

const { palette } = lightTheme

const BurgerButton = styled(IconButton)`
  height: 48px;
  width: 48px;
  color: ${palette.white};

  i {
    color: ${palette.white};
  }

  &:hover {
    border-radius: 0;
    background-color: ${palette.neutralPrimaryAlt};
    color: ${palette.neutralPrimary};
  }
`

const BarButton = styled(IconButton)`
  color: ${palette.white};

  i {
    color: ${palette.white};
  }

  &:hover {
    background-color: ${palette.neutralPrimaryAlt};
    color: ${palette.neutralPrimary};
  }
`

const BrandName = styled(Text)`
  font-family: "Rock Salt", sans-serif;
  user-select: none;
  padding-left: 1rem;
  font-size: 16px;
  color: ${palette.white};
  cursor: pointer;
`

const themeIcons: Record<ITheme, string> = {
  dark: "CircleRing",
  light: "CircleFill",
  system: "CircleHalfFull",
}

export type IAppBar = {
  theme: ITheme
  onToggleTheme: () => void
  onBurger: () => void
  unlocked: boolean
  onToggleLock: () => void
  onBrand?: () => void
}
export const AppBar: React.FC<IAppBar> = ({
  onBrand,
  onBurger,
  unlocked,
  onToggleLock,
  theme,
  onToggleTheme,
}) => {
  return (
    <Stack
      horizontal
      verticalAlign="center"
      style={{
        backgroundColor: palette.neutralPrimary,
      }}
    >
      <BurgerButton
        onClick={onBurger}
        iconProps={{
          iconName: "WaffleOffice365",
        }}
      />
      <BrandName onClick={onBrand}>Scrappy</BrandName>
      <Stack
        horizontal
        style={{ flex: "auto", padding: "0 0.5rem 0 0.5rem" }}
        horizontalAlign="end"
        verticalAlign="center"
      >
        <TooltipHost content={unlocked ? "Lock Database" : "Unlock Database"}>
          <BarButton
            onClick={onToggleLock}
            iconProps={{ iconName: unlocked ? "UnLock" : "Lock" }}
          />
        </TooltipHost>
        <TooltipHost content={`${capitalCase(theme)} Theme`}>
          <BarButton onClick={onToggleTheme} iconProps={{ iconName: themeIcons[theme] }} />
        </TooltipHost>
      </Stack>
    </Stack>
  )
}
