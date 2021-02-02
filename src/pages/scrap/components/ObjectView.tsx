import React, { useMemo } from "react"
import {
  DirectionalHint,
  IconButton,
  Label,
  Separator,
  Stack,
  Text,
  TextField,
  Toggle,
  TooltipHost,
} from "@fluentui/react"
import YAML from "yaml"
import { clamp, isObject, map } from "lodash"
import { capitalCase } from "change-case"
import { Language } from "../../../types"
import { ErrorBoundary } from "./ErrorBoundary"
import { write as copyToClipboard } from "clipboardy"

const getVariant = (depth: number) => {
  switch (depth) {
    case 1:
      return "xxLarge"
    case 2:
      return "xLarge"
    case 3:
      return "large"
    default:
      return "large"
  }
}

export type IObjectField = { title: string; object: any; depth: number }
export const ObjectField: React.FC<IObjectField> = ({ title, object, depth }) => {
  const mapValue = (key: string, value: any) => {
    if (isObject(value)) {
      return <ObjectField key={key} title={key} object={value} depth={depth + 1} />
    } else {
      return <KeyValueField key={key} k={key} v={value} />
    }
  }

  return (
    <Stack style={{ paddingTop: "0.5rem" }}>
      <Text variant={getVariant(depth)}>{capitalCase(title)}</Text>
      <Separator />
      <Stack tokens={{ childrenGap: "0.5rem" }}>{map(object, (v, k) => mapValue(k, v))}</Stack>
    </Stack>
  )
}

export type IKeyValueField = {
  k: string
  v: string | number | boolean
}
const KeyValueField: React.FC<IKeyValueField> = ({ k, v }) => {
  let label: string
  try {
    label = k && capitalCase(k)
  } catch (e) {
    label = ""
  }

  const type = useMemo(() => {
    if (k.match(/(^pass|pass$)/)) {
      return "password"
    }
    return undefined
  }, [k])

  const onRenderLabel = (): JSX.Element => {
    return (
      <Stack horizontal tokens={{ childrenGap: "0.5rem" }}>
        <Label>{label}</Label>
        <TooltipHost content={"Copy to Clipboard"} directionalHint={DirectionalHint.bottomCenter}>
          <IconButton
            iconProps={{ iconName: "Copy" }}
            onClick={() => {
              copyToClipboard(v.toString())
            }}
          />
        </TooltipHost>
      </Stack>
    )
  }

  switch (typeof v) {
    case "boolean":
      return <Toggle label={label} checked={v} />
    default:
      return (
        <TextField
          readOnly
          canRevealPassword
          type={type}
          multiline={v.toString().includes("\n")}
          rows={clamp(v.toString().split("\n").length, 0, 10)}
          value={v.toString()}
          onRenderLabel={() => onRenderLabel()}
        />
      )
  }
}

export type IObjectView = { contentType: Language; content: string }
export const ObjectView: React.FC<IObjectView> = ({ contentType, content }) => {
  const contentObject = useMemo(() => {
    try {
      switch (contentType) {
        case "json":
          return JSON.parse(content)
        case "yaml":
          return YAML.parse(content)
      }
    } catch (e) {
      console.log(e)
      return {}
    }
  }, [contentType])

  const mapValue = (key: string, value: any) => {
    if (isObject(value)) {
      return <ObjectField key={key} title={key} object={value} depth={1} />
    } else {
      return <KeyValueField key={key} k={key} v={value} />
    }
  }

  return (
    <Stack tokens={{ childrenGap: "1rem", padding: "1rem" }}>
      <ErrorBoundary>{map(contentObject, (v, k) => mapValue(k, v))}</ErrorBoundary>
    </Stack>
  )
}
