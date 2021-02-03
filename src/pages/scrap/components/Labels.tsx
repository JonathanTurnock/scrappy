import React from "react"
import { IBasePickerSuggestionsProps, Label, Stack, TagPicker } from "@fluentui/react"

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested labels",
}

export type ILabels = {
  onChange: (labels: string[]) => void
  labels?: string[]
  availableLabels?: string[]
  noLabel?: boolean
}
export const Labels: React.FC<ILabels> = ({ noLabel, onChange, labels, availableLabels = [] }) => {
  return (
    <Stack>
      {!noLabel && <Label>Labels</Label>}
      <TagPicker
        styles={{ text: { border: "none" } }}
        selectedItems={labels?.map((label) => ({ key: label, name: label }))}
        pickerSuggestionsProps={pickerSuggestionsProps}
        onResolveSuggestions={(filter) => {
          const matchingLabels = availableLabels
            .filter((label) => label.startsWith(filter))
            .map((label) => ({
              key: label,
              name: label,
            }))

          return [
            ...matchingLabels,
            {
              key: filter,
              name: filter,
            },
          ]
        }}
        onChange={(items) => {
          onChange(items?.map(({ key }) => key.toString()) || [])
        }}
      />
    </Stack>
  )
}
