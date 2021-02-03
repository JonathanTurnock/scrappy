import React from "react"
import { Panel, Stack } from "@fluentui/react"
import { Title } from "./Title"
import { Labels } from "./Labels"

export type IScrapDetails = {
  isOpen: boolean
  onDismiss: () => void
  title: string
  onTitleChange: (newTitle: string) => void
  labels: string[]
  onLabelsChange: (newLabels: string[]) => void
}
export const ScrapDetails: React.FC<IScrapDetails> = ({
  isOpen,
  onDismiss,
  title,
  onTitleChange,
  labels,
  onLabelsChange,
}) => {
  return (
    <Panel
      isLightDismiss
      headerText="Details"
      isOpen={isOpen}
      onDismiss={onDismiss}
      closeButtonAriaLabel="Close"
    >
      <Stack style={{ paddingTop: "0.5rem" }} tokens={{ childrenGap: "0.5rem" }}>
        <Title value={title} onChange={onTitleChange} />
        <Labels labels={labels} onChange={onLabelsChange} />
      </Stack>
    </Panel>
  )
}
