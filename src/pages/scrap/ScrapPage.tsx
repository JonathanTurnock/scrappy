import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useScrapOperations, useScrapSubscription } from "../../database"
import {
  ActionBarContainer,
  ActionBarItem,
  fdAlert,
  SFlex,
  SHorizontalActionStack,
} from "../../@ui-components"
import { Breadcrumb, Dropdown, Pivot, PivotItem, Stack } from "@fluentui/react"
import ReactMarkdown from "react-markdown"
import { EditorBox } from "../../@ui-components/editor-box/EditorBox"
import styled from "styled-components"
const json2md = require("json2md")
const YAML = require("yaml")

const gfm = require("remark-gfm")

const ScrapTabs = styled(Pivot)`
  display: flex;
  flex-direction: column;
  flex: auto;

  & > div[role="tabpanel"] {
    display: flex;
    flex: auto;
  }

  & > div[role="tabpanel"] > .scrap-tab {
    display: flex;
    flex: auto;
    flex-direction: column;
  }
`

export const ScrapPage: React.FC = () => {
  const { push } = useHistory()
  const { id } = useParams()
  const [scrap, { error }] = useScrapSubscription({ id })
  const { save } = useScrapOperations()
  const [liveContent, setLiveContent] = useState(scrap?.content)
  const [contentType, setContentType] = useState(scrap?.contentType)

  useEffect(() => {
    if (scrap) {
      setLiveContent(scrap.content)
      setContentType(scrap.contentType)
    }
  }, [scrap])

  useEffect(() => {
    if (error) {
      fdAlert({
        title: "Failed to get Scrap",
        text: error,
      }).then(() => push("/"))
    }
  }, [scrap, error])

  // const scrap = useScrapSubscription(location.id)

  const handleSave = async () => {
    if (scrap && liveContent && contentType) {
      await save({ ...scrap, content: liveContent, contentType })
    }
  }

  const getMarkdown = (): string => {
    if (liveContent) {
      switch (contentType) {
        case "markdown":
          console.log("Parsing Markdown")
          return liveContent
        case "json":
          console.log("Parsing JSON")
          return "```json\n" + liveContent + "\n```"
        case "yaml":
          console.log("Parsing YAML")
          return "```json\n" + YAML.parse(liveContent) + "\n```"
        default:
          return ""
      }
    }
    return ""
  }

  return (
    <SFlex style={{ flexDirection: "column" }}>
      {scrap && contentType && (
        <>
          <ActionBarContainer>
            <ActionBarItem icon="Save" name="Save" onClick={handleSave} />
            <ActionBarItem
              icon="OpenPane"
              name="Details"
              onClick={() => alert("Not Implemented")}
            />
          </ActionBarContainer>
          <Stack className="container flex-fill">
            <Breadcrumb
              items={[
                { key: "scraps", text: "Scraps", onClick: () => push("/scraps") },
                { key: "scrap", text: scrap.name },
              ]}
            />
            <ScrapTabs>
              <PivotItem headerText="View" itemIcon="TextDocument">
                <SFlex className="container px-2 flex-column text-dark">
                  <ReactMarkdown plugins={[gfm]} children={getMarkdown()} />
                </SFlex>
              </PivotItem>
              <PivotItem className="scrap-tab" headerText="Edit" itemIcon="FileCode">
                <SFlex>
                  <EditorBox
                    language={contentType}
                    onLanguageChange={setContentType}
                    defaultValue={liveContent || ""}
                    onChanges={setLiveContent}
                  />
                </SFlex>
                <Stack horizontal className="p-2 justify-content-end">
                  <Dropdown
                    options={[
                      { key: "markdown", text: "Markdown" },
                      { key: "json", text: "JSON" },
                      { key: "yaml", text: "YAML" },
                    ]}
                    selectedKey={contentType}
                    onChange={(event, option) =>
                      option?.key && setContentType(option.key.toString())
                    }
                  />
                </Stack>
              </PivotItem>
            </ScrapTabs>
          </Stack>
        </>
      )}
    </SFlex>
  )
}
