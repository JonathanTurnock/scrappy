import React, { useCallback, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Breadcrumb, MessageBarType, Pivot, PivotItem, Stack } from "@fluentui/react"
import styled from "styled-components"
import { useScrapOperations, useScrapSubscription } from "../../database"
import { fdAlert } from "../../@ui-kit"
import { ActionBar } from "./components/ActionBar"
import { MarkdownView } from "./components/MarkdownView"
import { ObjectView } from "./components/ObjectView"
import { EditView } from "./components/EditView"
import { ScrapDetails } from "./components/ScrapDetails"
import { useBoolean } from "@fluentui/react-hooks"
import { useHotkeys } from "react-hotkeys-hook"
import { Labels } from "./components/Labels"
import { useToasts } from "../../@ui-kit/notifications/useToasts"

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
  const [detailsIsOpen, { toggle: toggleDetails }] = useBoolean(false)
  const { push } = useHistory()
  const { id } = useParams()
  const [scrap, { error }] = useScrapSubscription({ id })
  const { save } = useScrapOperations()
  const [liveTitle, setLiveTitle] = useState(scrap?.name)
  const [liveContent, setLiveContent] = useState(scrap?.content)
  const [contentType, setContentType] = useState(scrap?.contentType)
  const [labels, setLabels] = useState(scrap?.labels || [])
  const { showToast } = useToasts()

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

  const handleSave = useCallback(() => {
    if (scrap && liveTitle && contentType) {
      save({
        ...scrap,
        name: liveTitle,
        content: liveContent || "",
        contentType,
        labels: labels,
      })
        .catch((e) => {
          fdAlert({ title: "Failed to Save", text: e.message })
        })
        .then(() => {
          showToast("Saved", { type: MessageBarType.success })
        })
    } else {
      fdAlert({ title: "Failed to Save", text: "No Content Type Defined" })
    }
  }, [liveTitle, liveContent, contentType, labels])

  useHotkeys(
    "ctrl+s",
    () => {
      handleSave()
    },
    [liveTitle, labels, liveContent, contentType]
  )

  return (
    <Stack style={{ flex: "auto", overflow: "hidden" }}>
      {scrap && contentType && (
        <>
          <ActionBar onSave={handleSave} onDetails={toggleDetails} />
          <Stack style={{ overflow: "hidden" }} className="container flex-fill">
            <Stack
              style={{
                display: "grid",
                gridTemplateRows: "1fr 1fr",
                alignItems: "center",
              }}
            >
              <Breadcrumb
                style={{ minWidth: "50%" }}
                items={[
                  { key: "scraps", text: "Scraps", onClick: () => push("/scraps") },
                  { key: "scrap", text: scrap.name },
                ]}
              />
              <Labels noLabel onChange={setLabels} labels={labels} />
            </Stack>
            <ScrapDetails
              isOpen={detailsIsOpen}
              onDismiss={toggleDetails}
              title={liveTitle || ""}
              onTitleChange={setLiveTitle}
              labels={labels}
              onLabelsChange={setLabels}
            />
            <ScrapTabs>
              <PivotItem className="scrap-tab" headerText="View" itemIcon="TextDocument">
                {(() => {
                  switch (contentType) {
                    case "markdown":
                      return <MarkdownView contentType={contentType} content={liveContent || ""} />
                    case "yaml":
                    case "json":
                      return <ObjectView contentType={contentType} content={liveContent || ""} />
                  }
                })()}
              </PivotItem>
              <PivotItem className="scrap-tab" headerText="Edit" itemIcon="FileCode">
                <EditView
                  language={contentType}
                  onLanguageChange={setContentType}
                  content={liveContent}
                  onContentChange={setLiveContent}
                  onSave={() => {
                    handleSave()
                  }}
                />
              </PivotItem>
            </ScrapTabs>
          </Stack>
        </>
      )}
    </Stack>
  )
}
