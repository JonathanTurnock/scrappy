import React, { useMemo } from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import { Stack } from "@fluentui/react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { useTheme } from "@fluentui/react-theme-provider"
import { Language } from "../../../types"

export type IMarkdownView = {
  content: string
  contentType: Language
}
export const MarkdownView: React.FC<IMarkdownView> = ({ contentType, content }) => {
  const { isInverted, palette } = useTheme()

  const renderers = useMemo(
    () => ({
      code: ({ language, value }: any) => {
        return (
          <SyntaxHighlighter
            style={isInverted ? atomOneDark : atomOneLight}
            language={language}
            children={value}
          />
        )
      },
    }),
    [isInverted]
  )

  const renderedContent = useMemo(() => {
    switch (contentType) {
      case "json":
        return content
      default:
        return content
    }
  }, [contentType])

  return (
    <Stack
      style={{ flex: "auto" }}
      className="markdown-body"
      styles={{
        root: {
          color: `${palette.black} !important`,
          padding: "1rem",
        },
      }}
    >
      <ReactMarkdown renderers={renderers} plugins={[gfm]} children={renderedContent} />
    </Stack>
  )
}
