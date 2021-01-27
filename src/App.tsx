import React, { useRef } from "react"
import Editor from "@monaco-editor/react"

function App() {
  const editorRef = useRef(null)

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
  }

  const handleSave = () => {
    // @ts-ignore
    console.log(editorRef?.current?.getValue())
  }

  return (
    <div className="App">
      <Editor height="500px" defaultLanguage="json" onMount={handleEditorDidMount} />
      <button onClick={handleSave}>Save!</button>
    </div>
  )
}

export default App
