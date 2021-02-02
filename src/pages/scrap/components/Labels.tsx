import React from "react"
import { IBasePickerSuggestionsProps, Label, Stack, TagPicker } from "@fluentui/react"

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested labels",
}

export type ILabels = {
  onChange: (labels: string[]) => void
  labels?: string[]
  availableLabels?: string[]
}
export const Labels: React.FC<ILabels> = ({ onChange, labels, availableLabels = [] }) => {
  return (
    <Stack style={{ padding: "0.5rem" }}>
      <Label>Labels</Label>
      <TagPicker
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
