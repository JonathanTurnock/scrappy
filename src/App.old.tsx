import React, { useRef, useState } from "react"
import { editor } from "monaco-editor"
import { EditorBox } from "./@ui-components/editor-box/EditorBox"
import ReactMarkdown from "react-markdown"
const gfm = require("remark-gfm")
import { DatabaseProvider } from "./database"

const DATABASE_NAME = "scrappydb"
const SCHEMAS = {
  scraps: process.env.PUBLIC_URL + "/schemas/scrap.schema.yml",
}
const DATABASE_OPTS = { inMemory: false }

function App() {
  const [language, setLanguage] = useState<string>("markdown")
  const [content, setContent] = useState<string>()
  const editorRef = useRef<editor.IStandaloneCodeEditor>()

  const handleSave = () => {
    console.log(editorRef?.current?.getValue())
    setContent(editorRef?.current?.getValue())
  }

  return (
    <DatabaseProvider databaseName={DATABASE_NAME} schemas={SCHEMAS} options={DATABASE_OPTS}>
      <div className="App">
        <select
          name="cars"
          id="cars"
          onChange={(event) => {
            setLanguage(event.target.value)
          }}
        >
          <option value="markdown">Markdown</option>
          <option value="yaml">Yaml</option>
          <option value="json">JSON</option>
        </select>
        <EditorBox language={language} editorRef={editorRef} onChanges={setContent} />
        <button onClick={handleSave}>Save!</button>
        <ReactMarkdown plugins={[gfm]} children={content || ""} />
      </div>
    </DatabaseProvider>
  )
}

export default App
