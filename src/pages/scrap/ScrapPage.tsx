import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Breadcrumb, Pivot, PivotItem, Stack } from "@fluentui/react"
import styled from "styled-components"
import { useScrapOperations, useScrapSubscription } from "../../database"
import { fdAlert } from "../../@ui-kit"
import { ActionBar } from "./components/ActionBar"
import { MarkdownView } from "./components/MarkdownView"
import { ObjectView } from "./components/ObjectView"
import { EditView } from "./components/EditView"
import { Labels } from "./components/Labels"
import { Title } from "./components/Title"

const ScrapTabs = styled(Pivot)`
  display: flex;
  flex-direction: column;
  flex: auto;
  overflow: hidden;

  & > div[role="tabpanel"] {
    display: flex;
    flex: auto;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  & > div[role="tabpanel"] > .scrap-tab {
    display: flex;
    flex: auto;
    flex-direction: column;
    padding: 0.5rem;
    overflow-x: hidden;
  }
`

export const ScrapPage: React.FC = () => {
  const { push } = useHistory()
  const { id } = useParams()
  const [scrap, { error }] = useScrapSubscription({ id })
  const { save } = useScrapOperations()
  const [liveTitle, setLiveTitle] = useState(scrap?.name)
  const [liveContent, setLiveContent] = useState(scrap?.content)
  const [contentType, setContentType] = useState(scrap?.contentType)
  const [labels, setLabels] = useState(scrap?.labels || [])

  useEffect(() => {
    if (scrap) {
      setLiveTitle(scrap.name)
      setLiveContent(scrap.content)
      setContentType(scrap.contentType)
      setLabels(scrap.labels)
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

  const handleSave = async () => {
    if (scrap && liveTitle && contentType) {
      save({
        ...scrap,
        name: liveTitle,
        content: liveContent || "",
        contentType,
        labels: labels,
      }).catch((e) => {
        fdAlert({ title: "Failed to Save", text: e.message })
      })
    } else {
      fdAlert({ title: "Failed to Save", text: "No Content Type Defined" })
    }
  }

  return (
    <Stack style={{ flex: "auto", overflow: "hidden" }}>
      {scrap && contentType && (
        <>
          <ActionBar onSave={handleSave} />
          <Stack style={{ overflow: "hidden" }} className="container flex-fill">
            <Breadcrumb
              items={[
                { key: "scraps", text: "Scraps", onClick: () => push("/scraps") },
                { key: "scrap", text: scrap.name },
              ]}
            />
            <Stack style={{ paddingTop: "1rem" }} tokens={{ childrenGap: "0.5rem" }}>
              <Title value={liveTitle || ""} onChange={setLiveTitle} />
              <Labels onChange={setLabels} labels={labels} />
            </Stack>
            <ScrapTabs>
              <PivotItem className="scrap-tab" headerText="View" itemIcon="TextDocument">
                {(contentType === "markdown" && (
                  <MarkdownView contentType={contentType} content={liveContent || ""} />
                )) || <ObjectView contentType={contentType} content={liveContent || ""} />}
              </PivotItem>
              <PivotItem className="scrap-tab" headerText="Edit" itemIcon="FileCode">
                <EditView
                  language={contentType}
                  onLanguageChange={setContentType}
                  content={liveContent}
                  onContentChange={setLiveContent}
                />
              </PivotItem>
            </ScrapTabs>
          </Stack>
        </>
      )}
    </Stack>
  )
}
