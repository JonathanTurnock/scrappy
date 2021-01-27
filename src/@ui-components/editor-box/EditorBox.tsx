import React, { MutableRefObject, Ref, useRef } from "react"
import Editor, { Monaco } from "@monaco-editor/react"
import { editor } from "monaco-editor"

export type IEditorBox = {
  language: string
  onChanges?: (content: string) => void
  editorRef?: MutableRefObject<editor.IStandaloneCodeEditor | undefined>
  monacoRef?: MutableRefObject<Monaco | undefined>
}
export const EditorBox: React.FC<IEditorBox> = ({ language, editorRef, monacoRef, onChanges }) => {
  const _eRef = useRef<editor.IStandaloneCodeEditor>()
  const _mRef = useRef<Monaco>()

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    _eRef.current = editor
    _mRef.current = monaco

    if (editorRef) {
      editorRef.current = editor
    }
    if (monacoRef) {
      monacoRef.current = monaco
    }
  }

  return (
    <Editor
      height={"250px"}
      language={language}
      onMount={handleEditorDidMount}
      onChange={(value, ev) => {
        onChanges && onChanges(value || "")
      }}
    />
  )
}
