import React, { useMemo, useState } from "react"
import {
  Breadcrumb,
  DetailsList,
  IColumn,
  Icon,
  SearchBox,
  Selection,
  SelectionMode,
  Stack,
  FontIcon,
  mergeStyleSets,
} from "@fluentui/react"
import {
  ActionBarContainer,
  ActionBarItem,
  fdConfirm,
  fdInput,
  SFlex,
  SHorizontalActionStack,
} from "../../@ui-components"
import { useAllScrapsSubscription, useScrapOperations } from "../../database"
import { getShortId } from "../../utils/getShortId"
import { ScrapEntity } from "../../types"
import { useHistory } from "react-router-dom"
import { useBoolean } from "@fluentui/react-hooks"
import { theme } from "../../theme"

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
const controlStyles = {
  root: {
    margin: "0 30px 20px 0",
    maxWidth: "300px",
  },
}

const icons: Record<string, string> = {
  markdown: "MarkDownLanguage",
  json: "FileCode",
  yaml: "FileYML",
}

const columns: IColumn[] = [
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
  { key: "name", name: "Name", minWidth: 150, fieldName: "name" },
  {
    key: "created",
    name: "Created",
    minWidth: 150,
    maxWidth: 150,
    fieldName: "created",
    onRender: ({ created }: { created: number }) => (
      <span>{new Date(created).toLocaleString()}</span>
    ),
  },
  {
    key: "starred",
    name: "Starred",
    minWidth: 50,
    maxWidth: 50,
    fieldName: "starred",
    onRender: ({ starred }: { starred: boolean }) => {
      return starred ? <Icon iconName={"FavoriteStar"} /> : <></>
    },
  },
  {
    key: "locked",
    name: "Locked",
    minWidth: 50,
    maxWidth: 50,
    fieldName: "locked",
    onRender: ({ locked }: { locked: boolean }) => {
      return locked ? <Icon iconName={"Lock"} /> : <></>
    },
  },
]

export const ScrapListPage: React.FC = () => {
  const scraps = useAllScrapsSubscription()
  const { save, deleteOne, deleteMany } = useScrapOperations()
  const { push, location } = useHistory()
  const [currentSelection, setCurrentSelection] = useState<ScrapEntity[]>([])
  const [multiSelect, { toggle: toggleMultiSelect }] = useBoolean(false)

  const selection = useMemo(() => {
    return new Selection<ScrapEntity>({
      getKey: ({ id }) => id,
      onSelectionChanged: () => {
        setCurrentSelection(selection.getSelection() as ScrapEntity[])
      },
    })
  }, [])

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
    const selectedScrap = currentSelection[0]
    const confirm = await fdConfirm({
      title: "Delete Scrap",
      text: `Are you sure you want to delete ${selectedScrap.name}?`,
    })
    if (confirm) {
      await deleteOne(selectedScrap)
    }
  }

  const handleDeleteMany = async () => {
    const confirm = await fdConfirm({
      title: "Delete Scraps",
      text: `Are you sure you want to delete ${currentSelection.length} scraps?`,
    })
    if (confirm) {
      await deleteMany(currentSelection)
    }
  }

  const handleOpen = async (scrap: ScrapEntity) => {
    push(`/scrap/${scrap.id}`, location)
  }

  return (
    <SFlex style={{ flexDirection: "column" }}>
      <ActionBarContainer>
        <ActionBarItem icon="Add" name="New Scrap" onClick={handleAdd} />
        {currentSelection.length === 1 && (
          <ActionBarItem icon="Rename" name="Rename Scrap" onClick={handleRename} />
        )}
        {currentSelection.length === 1 && (
          <ActionBarItem icon="Delete" name="Delete Scrap" onClick={handleDelete} />
        )}
        {currentSelection.length > 1 && (
          <ActionBarItem icon="Delete" name="Delete Scraps" onClick={handleDeleteMany} />
        )}
        <ActionBarItem icon="MultiSelect" name="Select" onClick={toggleMultiSelect} />
        <SFlex className="align-items-end justify-content-end align-items-center px-2">
          <SearchBox
            placeholder="Search"
            size={25}
            onSearch={handleFilter}
            onClear={() => handleFilter("")}
          />
        </SFlex>
      </ActionBarContainer>
      <Stack className="container">
        <Breadcrumb items={[{ key: "scraps", text: "Scraps" }]} />
        <DetailsList
          // @ts-ignore
          selection={selection}
          items={scraps}
          columns={columns}
          onItemInvoked={handleOpen}
          selectionMode={multiSelect ? SelectionMode.multiple : SelectionMode.none}
        />
      </Stack>
    </SFlex>
  )
}
