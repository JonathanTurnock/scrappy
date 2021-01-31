import React, { useState } from "react"
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0"
import { DefaultButton, Text } from "@fluentui/react"
import { AwaitableDialogProps } from "../types"
import {
  fdSelectionInput,
  ISelectionInputDialog,
  SelectionInputDialog,
} from "./SelectionInputDialog"

const Container: React.FC = () => {
  const [result, setResult] = useState<string>("")
  const handleOpen = async () => {
    const result = await fdSelectionInput({
      title: "Whats your Grade?",
      label: "Grade",
      options: [
        { key: "ONE", text: "One" },
        { key: "TWO", text: "Two" },
        { key: "THREE", text: "Three" },
      ],
      defaultSelectedKey: "ONE",
    })
    setResult(result)
  }

  return (
    <div>
      <div>
        <DefaultButton onClick={handleOpen} text="open" />
      </div>
      <Text>Result: {result}</Text>
    </div>
  )
}

export default {
  title: "UiKit/Dialogs",
  component: SelectionInputDialog,
} as Meta

const Template: Story<ISelectionInputDialog & AwaitableDialogProps<string>> = (args) => (
  <SelectionInputDialog {...args} />
)

const AwaitTemplate: Story = (args) => <Container {...args} />

export const selectionInput = Template.bind({})
selectionInput.args = {
  title: "Whats your Grade?",
  label: "Grade",
  options: [
    { key: "ONE", text: "One" },
    { key: "TWO", text: "Two" },
    { key: "THREE", text: "Three" },
  ],
  defaultSelectedKey: "ONE",
  onSubmit: console.log,
  onDismiss: console.log,
  hidden: true,
}

export const awaitSelectionInput = AwaitTemplate.bind({})
awaitSelectionInput.args = {}
