import React from "react"
import { TextField } from "@fluentui/react"

export type ITitle = {
  value: string
  onChange: (newTitle: string) => void
}
export const Title: React.FC<ITitle> = ({ value, onChange }) => {
  return (
    <TextField label="Title" onChange={({ target }: any) => onChange(target.value)} value={value} />
  )
}
