import React, { useState } from "react"
import { Breadcrumb, Stack } from "@fluentui/react"
import { useHistory } from "react-router-dom"
import { useBoolean } from "@fluentui/react-hooks"
import { useMediaQuery } from "react-responsive"
import { fdConfirm, fdInput } from "../../@ui-kit"
import { useAllScrapsSubscription, useScrapOperations } from "../../database"
import { getShortId } from "../../utils/getShortId"
import { ScrapEntity } from "../../types"
import { ScrapList } from "./components/ScrapList"
import { DesktopActionBar } from "./components/DesktopActionBar"
import { MobileActionBar } from "./components/MobileActionBar"

export const ScrapListPage: React.FC = () => {
  const scraps = useAllScrapsSubscription()
  const { save, deleteMany } = useScrapOperations()
  const { push, location } = useHistory()
  const [currentSelection, setCurrentSelection] = useState<ScrapEntity[]>([])
  const [multiSelect, { toggle: toggleMultiSelect }] = useBoolean(false)

  const handleFilter = (filterText: string) => {
    console.log(filterText)
  }

  const handleAdd = async () => {
    const name = await fdInput({
      title: "Add Scrap",
      label: "Scrap Name",
    })
    if (name) {
      await save({
        id: getShortId(),
        name,
        created: new Date().getTime(),
        content: "",
        locked: false,
        starred: false,
        contentType: "markdown",
      })
    }
  }

  const handleRename = async () => {
    const selectedScrap = currentSelection[0]
    const name = await fdInput({
      title: "Rename Scrap",
      label: "Scrap Name",
      defaultValue: selectedScrap.name,
    })
    if (name) {
      await save({ ...selectedScrap, name })
    }
  }

  const handleDelete = async () => {
    const text =
      currentSelection.length > 1
        ? `Are you sure you want to delete ${currentSelection.length} scraps?`
        : `Are you sure you want to delete ${currentSelection[0].name}?`
    const confirm = await fdConfirm({
      title: "Delete Scrap",
      text,
    })
    if (confirm) {
      await deleteMany(currentSelection)
    }
  }

  const handleOpen = async (scrap: ScrapEntity) => {
    push(`/scrap/${scrap.id}`, location)
  }

  const ActionBar = useMediaQuery({ minWidth: 768 }) ? DesktopActionBar : MobileActionBar
  return (
    <Stack style={{ flex: "auto" }}>
      <ActionBar
        onAdd={handleAdd}
        onRename={handleRename}
        onDelete={handleDelete}
        onToggleSelection={toggleMultiSelect}
        onFilter={handleFilter}
        selectionCount={currentSelection.length}
      />
      <Stack className="container">
        <Breadcrumb items={[{ key: "scraps", text: "Scraps" }]} />
        <ScrapList
          scraps={scraps}
          onSelectionChange={setCurrentSelection}
          onOpen={handleOpen}
          selectionEnabled={multiSelect}
        />
      </Stack>
    </Stack>
  )
}
