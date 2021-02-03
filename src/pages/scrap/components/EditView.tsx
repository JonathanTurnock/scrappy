import React from "react"
import { Dropdown, Stack } from "@fluentui/react"
import { useTheme } from "@fluentui/react-theme-provider"
import { EditorBox } from "../../../components"
import { Language } from "../../../types"

const selectLanguageOptions = [
  { key: "markdown", text: "Markdown" },
  { key: "json", text: "JSON" },
  { key: "yaml", text: "YAML" },
]

export type IEditView = {
  language: Language
  onLanguageChange: (newLanguage: Language) => void
  content?: string
  onContentChange: (newContent: string) => void
  onSave: () => void
}
export const EditView: React.FC<IEditView> = ({
  language,
  onLanguageChange,
  content,
  onContentChange,
  onSave,
}) => {
  const { palette } = useTheme()

  return (
    <Stack
      style={{ flex: "auto" }}
      styles={{
        root: {
          color: `${palette.black} !important`,
        },
      }}
    >
      <EditorBox
        language={language}
        onLanguageChange={(language: string) => onLanguageChange(language as Language)}
        defaultValue={content || ""}
        onChanges={onContentChange}
        onSave={onSave}
      />
      <Stack horizontal className="p-2 justify-content-end">
        <Dropdown
          options={selectLanguageOptions}
          selectedKey={language}
          onChange={(event, option) =>
            option?.key && onLanguageChange(option.key.toString() as Language)
          }
        />
      </Stack>
    </Stack>
  )
}
