import React, { useMemo } from "react"
import { DetailsList, Selection, SelectionMode } from "@fluentui/react"
import { ScrapEntity } from "../../../types"
import { columns } from "./ScrapList.columns"

export type IScrapList = {
  scraps: ScrapEntity[]
  onOpen: (scrap: ScrapEntity) => void
  onSelectionChange: (selectedScraps: ScrapEntity[]) => void
  selectionEnabled: boolean
}
export const ScrapList: React.FC<IScrapList> = ({
  scraps,
  onOpen,
  onSelectionChange,
  selectionEnabled,
}) => {
  const selection = useMemo(() => {
    return new Selection<ScrapEntity>({
      getKey: ({ id }) => id,
      onSelectionChanged: () => {
        onSelectionChange(selection.getSelection() as ScrapEntity[])
      },
    })
  }, [])

  return (
    <DetailsList
      // @ts-ignore
      selection={selection}
      items={scraps}
      columns={columns}
      onItemInvoked={onOpen}
      selectionMode={selectionEnabled ? SelectionMode.multiple : SelectionMode.none}
      styles={{ root: { userSelect: "none" } }}
    />
  )
}
