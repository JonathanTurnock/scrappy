import React, { useMemo, useState } from "react"
import { Breadcrumb, Stack } from "@fluentui/react"
import { useHistory } from "react-router-dom"
import { useBoolean } from "@fluentui/react-hooks"
import { useMediaQuery } from "react-responsive"
import { fdAlert, fdConfirm, fdFileInput, fdInput } from "../../@ui-kit"
import { useAllScrapsSubscription, useScrapOperations } from "../../database"
import { getShortId } from "../../utils/getShortId"
import { ScrapEntity } from "../../types"
import { ScrapList } from "./components/ScrapList"
import { DesktopActionBar } from "./components/DesktopActionBar"
import { MobileActionBar } from "./components/MobileActionBar"
import download from "js-file-download"
import { Aigle } from "aigle"
import { passwordInput } from "../../@ui-kit/dialogs/PasswordInputDialog"
import { AES, enc } from "crypto-js"

const { eachSeries } = Aigle

export const ScrapListPage: React.FC = () => {
  const scraps = useAllScrapsSubscription()
  const { save, deleteMany, bulkInsert } = useScrapOperations()
  const { push, location } = useHistory()
  const [currentSelection, setCurrentSelection] = useState<ScrapEntity[]>([])
  const [multiSelect, { toggle: toggleMultiSelect }] = useBoolean(false)
  const [filterBy, setFilterBy] = useState<string>()

  const listedScraps = useMemo(() => {
    return scraps.filter(({ name, labels }) => {
      if (!filterBy) return true

      if (name.includes(filterBy)) {
        return true
      }

      if (labels.includes(filterBy)) {
        return true
      }

      return false
    })
  }, [scraps, filterBy])

  const handleFilter = (filterText: string) => {
    if (filterText && filterText.length > 0) {
      setFilterBy(filterText)
    } else {
      setFilterBy(undefined)
    }
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
        labels: [],
        groupName: "",
        archived: false,
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

  const handleExport = async () => {
    const password = await passwordInput({ title: "Encrypt Export", label: "Password" })
    const encryptedContent = AES.encrypt(JSON.stringify(currentSelection), password)
    download(encryptedContent, `scraps.enc`, "application/json")
  }

  const handleImport = async () => {
    const files = await fdFileInput({})
    await eachSeries(files, async (file: File) => {
      const password = await passwordInput({
        title: `Decrypt Export File ${file.name}`,
        label: "Password",
      })
      const decryptedContent = AES.decrypt(await file.text(), password)
      bulkInsert(JSON.parse(enc.Utf8.stringify(decryptedContent)))
        .then(({ error }) => {
          if (error.length > 0) {
            const errorStr = error.map(({ id, message }) => `${id}: ${message}`).join("\n - ")
            fdAlert({ title: "Import", text: `Errors Occurred:\n - ${errorStr}` })
          } else {
            fdAlert({ title: "Import", text: "Successful Import" })
          }
        })
        .catch((e) => {
          fdAlert({ title: "Import", text: `Failed Import ${e.message}` })
        })
    })
  }

  const ActionBar = useMediaQuery({ minWidth: 768 }) ? DesktopActionBar : MobileActionBar
  return (
    <Stack style={{ flex: "auto" }}>
      <ActionBar
        onAdd={handleAdd}
        onRename={handleRename}
        onDelete={handleDelete}
        onToggleSelection={toggleMultiSelect}
        onExport={handleExport}
        onImport={handleImport}
        onFilter={handleFilter}
        selectionCount={currentSelection.length}
      />
      <Stack className="container overflow-hidden">
        <Breadcrumb items={[{ key: "scraps", text: "Scraps" }]} />
        <ScrapList
          scraps={listedScraps}
          onSelectionChange={setCurrentSelection}
          onOpen={handleOpen}
          selectionEnabled={multiSelect}
        />
      </Stack>
    </Stack>
  )
}
