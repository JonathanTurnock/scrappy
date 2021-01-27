import React from "react"
import { Waffle } from "./Waffle"
import { ApplicationBarContainer } from "./ApplicationBarContainer"
import { AppName } from "./AppName"

export type IApplicationBar = {
  name: string
  onExit: () => void
}
export const ApplicationBar: React.FC<IApplicationBar> = ({ name, onExit }) => {
  return (
    <ApplicationBarContainer>
      <Waffle onExit={onExit} />
      <AppName name={name} />
    </ApplicationBarContainer>
  )
}
