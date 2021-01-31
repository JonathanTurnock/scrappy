import React, { MutableRefObject, useEffect, useRef, useState } from "react"
import Editor, { Monaco } from "@monaco-editor/react"
import { editor, KeyCode, KeyMod } from "monaco-editor"

import { format } from "prettier/standalone"
import markdown from "prettier/parser-markdown"
import yaml from "prettier/parser-yaml"
import babel from "prettier/parser-babel"
import YAML from "yaml"

export type IEditorBox = {
  language: string
  defaultValue: string
  onLanguageChange: (newLanguage: string) => void
  onChanges?: (content: string) => void
  editorRef?: MutableRefObject<editor.IStandaloneCodeEditor | undefined>
  monacoRef?: MutableRefObject<Monaco | undefined>
}
export const EditorBox: React.FC<IEditorBox> = ({
  language,
  defaultValue,
  onLanguageChange,
  onChanges,
  editorRef,
  monacoRef,
}) => {
  const [trigger, setTrigger] = useState<number>()
  const _eRef = useRef<editor.IStandaloneCodeEditor>()
  const _mRef = useRef<Monaco>()

  useEffect(() => {
    console.log("Adding Action", language)
    const action = _eRef.current?.addAction({
      id: "app-prettier-format",
      label: "Reformat with Prettier",
      contextMenuGroupId: "1_modification",
      contextMenuOrder: 1,
      keybindings: [KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_F],
      run(editor: editor.ICodeEditor): void | Promise<void> {
        editor.setValue(
          format(editor.getValue(), {
            parser: language,
            plugins: [markdown, yaml, babel],
          })
        )
      },
    })

    return () => {
      action?.dispose()
    }
  }, [language, _eRef.current, trigger])

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    _eRef.current = editor
    _mRef.current = monaco

    if (editorRef) {
      editorRef.current = editor
    }
    if (monacoRef) {
      monacoRef.current = monaco
    }

    editor.addAction({
      id: "app-yaml-2-json",
      label: "Convert: YAML > JSON",
      contextMenuGroupId: "1_modification",
      contextMenuOrder: 2,
      run(e: editor.ICodeEditor): void | Promise<void> {
        e.setValue(JSON.stringify(YAML.parse(e.getValue()), null, 2))
        onLanguageChange("json")
      },
    })

    editor.addAction({
      id: "app-json-2-yaml",
      label: "Convert: JSON > YAML",
      contextMenuGroupId: "1_modification",
      contextMenuOrder: 3,
      run(e: editor.ICodeEditor): void | Promise<void> {
        e.setValue(YAML.stringify(JSON.parse(e.getValue())))
        onLanguageChange("yaml")
      },
    })

    setTrigger(new Date().getTime())
  }

  return (
    <Editor
      options={{ fontSize: 16, fontFamily: "Inconsolata", automaticLayout: true }}
      wrapperClassName={"app-monaco-editor"}
      language={language}
      height={"inherit"}
      onMount={handleEditorDidMount}
      defaultValue={defaultValue}
      onChange={(value) => {
        onChanges && onChanges(value || "")
      }}
    />
  )
}
