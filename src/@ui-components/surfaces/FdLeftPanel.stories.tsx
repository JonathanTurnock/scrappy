import React from "react"
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0"
import { FdLeftPanel, IFdLeftPanel } from "./FdLeftPanel"

export default {
  title: "Surfaces/Panels",
  component: FdLeftPanel,
} as Meta

const Template: Story<IFdLeftPanel> = (args) => (
  <FdLeftPanel {...args}>
    <h4>A Title</h4>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam at blanditiis corporis,
      deleniti mollitia nam nihil officia quas quibusdam, ratione reprehenderit soluta, tempora unde
      veniam. Accusamus odio ratione sed.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam at blanditiis corporis,
      deleniti mollitia nam nihil officia quas quibusdam, ratione reprehenderit soluta, tempora unde
      veniam. Accusamus odio ratione sed.
    </p>
  </FdLeftPanel>
)

export const leftPanel = Template.bind({})
leftPanel.args = {
  title: "Provinces & Districts",
}
