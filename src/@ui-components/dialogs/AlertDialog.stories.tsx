import React, { useState } from "react"
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0"
import { DefaultButton, Text } from "@fluentui/react"
import { fdAlert, FdAlertDialog, IAlertDialog } from "./FdAlertDialog"
import { AwaitableDialogProps } from "../types"

const Container: React.FC = () => {
  const [result, setResult] = useState<boolean>(false)
  const handleOpen = async () => {
    const result = await fdAlert({
      text: "You cant go there, sorry!",
      title: "Hey!",
    })
    setResult(result)
  }

  return (
    <div>
      <div>
        <DefaultButton onClick={handleOpen} text="open" />
      </div>
      <Text>Result: {result ? "true" : "false"}</Text>
    </div>
  )
}

export default {
  title: "AsyncDialogs/Alert",
  component: FdAlertDialog,
} as Meta

// @ts-ignore
const Template: Story<IAlertDialog & AwaitableDialogProps<boolean>> = (args) => (
  <FdAlertDialog {...args} />
)

const AwaitTemplate: Story = (args) => <Container {...args} />

export const alert = Template.bind({})
alert.args = {
  text: "You cant go there, sorry!",
  title: "Hey!",
  onSubmit: console.log,
  onDismiss: console.log,
  hidden: true,
}

export const awaitAlert = AwaitTemplate.bind({})
awaitAlert.args = {}
