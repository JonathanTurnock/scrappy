import React from "react"

import { FontIcon, IColumn, mergeStyleSets } from "@fluentui/react"

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: "16px",
  },
  fileIconCell: {
    textAlign: "center",
    selectors: {
      "&:before": {
        content: ".",
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0px",
        visibility: "hidden",
      },
    },
  },
  fileIconImg: {
    verticalAlign: "middle",
    maxHeight: "16px",
    maxWidth: "16px",
  },
  controlWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  exampleToggle: {
    display: "inline-block",
    marginBottom: "10px",
    marginRight: "30px",
  },
  selectionDetails: {
    marginBottom: "20px",
  },
})

const icons: Record<string, string> = {
  markdown: "MarkDownLanguage",
  json: "FileCode",
  yaml: "FileYML",
}

export const columns: IColumn[] = [
  {
    key: "icon",
    name: "Scrap Type",
    className: classNames.fileIconCell,
    iconClassName: classNames.fileIconHeaderIcon,
    iconName: "Page",
    isIconOnly: true,
    fieldName: "contentType",
    minWidth: 16,
    maxWidth: 16,
    onRender: ({ contentType }) => {
      return <FontIcon iconName={icons[contentType]} className={classNames.fileIconImg} />
    },
  },
  { key: "name", name: "Name", minWidth: 16, fieldName: "name" },
  {
    key: "labels",
    name: "Labels",
    minWidth: 100,
    maxWidth: 100,
    fieldName: "labels",
    onRender: ({ labels }: { labels: string[] }) => labels.join(", "),
  },
  {
    key: "created",
    name: "Created",
    minWidth: 120,
    maxWidth: 120,
    fieldName: "created",
    onRender: ({ created }: { created: number }) => (
      <span>{new Date(created).toLocaleString()}</span>
    ),
  },
]
