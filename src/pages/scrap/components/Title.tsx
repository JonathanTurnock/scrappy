import React from "react"
import { TextField } from "@fluentui/react"

export type ITitle = {
  value: string
  onChange: (newTitle: string) => void
}
export const Title: React.FC<ITitle> = ({ value, onChange }) => {
  return (
    <TextField
      underlined
      onChange={({ target }: any) => onChange(target.value)}
      value={value}
      styles={{ field: { fontSize: "24px" } }}
    />
  )
}
