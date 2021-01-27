import React from "react"
import styled from "styled-components"
import { IconButton } from "@fluentui/react"
import { palette } from "../../theme"
import { fdConfirm } from "../dialogs"

const WaffleButton = styled(IconButton)`
  height: 48px;
  width: 48px;
  color: ${palette.white};

  i {
    color: ${palette.white};
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    color: rgba(255, 255, 255, 0.7);
  }
`

export type IWaffle = {
  onExit: () => void
}
export const Waffle: React.FC<IWaffle> = ({ onExit }) => {
  const handleClick = async () => {
    const result = await fdConfirm({
      title: "Exit",
      text: "Are you sure you want to exit?",
    })
    result && onExit()
  }

  return (
    <WaffleButton
      iconProps={{
        iconName: "WaffleOffice365",
      }}
      onClick={handleClick}
    />
  )
}
