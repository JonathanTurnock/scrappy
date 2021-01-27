import React, { useEffect, useMemo, useState } from "react"
import { ApplicationBar } from "../../@ui-components/app-bar"
import styled from "styled-components"
import {
  DetailsList,
  IColumn,
  Icon,
  Pivot,
  PivotItem,
  SearchBox,
  SelectionMode,
  Text,
  Breadcrumb,
} from "@fluentui/react"
import {
  ActionBarItem,
  fdConfirm,
  fdInput,
  SFlex,
  SHorizontalActionStack,
} from "../../@ui-components"
import { range, random, filter } from "lodash"
import { LoremIpsum } from "lorem-ipsum"
import { useAllScrapsSubscription, useScrapOperations } from "../../database"
import { getShortId } from "../../utils/getShortId"

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

const Scene = styled.div`
  flex: auto;
  display: grid;
  grid-template-rows: 48px auto;
  overflow: inherit;
`

const Header = styled.header`
  display: flex;
  flex: auto;
`

const Main = styled.main`
  display: flex;
  flex: auto;
  overflow: inherit;
`

const columns: IColumn[] = [
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
  const { save, deleteOne } = useScrapOperations()

  const starredScraps = useMemo(() => filter(scraps, "starred"), [scraps])

  const handleFilter = (filterText: string) => {
    console.log(filterText)
  }

  const handleAdd = async () => {
    const name = await fdInput({
      title: "Add Scrap",
      label: "Scrap Name",
    })
    if (name) {
      const result = await save({ id: getShortId(), name, created: new Date().getTime() })
      console.log(result)
    }
  }

  const handleDelete = async () => {
    const confirm = await fdConfirm({
      title: "Delete Scrap",
      text: "Are you sure you want to delete scrap?",
    })
    console.log(`Deleting Scrap ${confirm}`)
  }

  return (
    <Scene>
      <Header>
        <ApplicationBar name="sCrappy" onExit={() => console.log("Exit Clicked")} />
      </Header>
      <Main>
        <div className="container">
          <SHorizontalActionStack>
            <SFlex>
              <ActionBarItem icon="Add" name="New Scrap" onClick={handleAdd} />
              <ActionBarItem icon="Delete" name="Delete Scrap" onClick={handleDelete} />
            </SFlex>
            <SFlex className="align-items-end justify-content-end">
              <SearchBox
                placeholder="Search"
                size={25}
                onSearch={handleFilter}
                onClear={() => handleFilter("")}
                underlined={true}
              />
            </SFlex>
          </SHorizontalActionStack>
          <SFlex className="p-2 justify-content-between align-items-end">
            <Breadcrumb items={[{ key: "scraps", text: "Scraps" }]} />
          </SFlex>
          <Pivot>
            <PivotItem headerText="All Scraps" itemCount={scraps.length} itemIcon="AlignJustify">
              <DetailsList
                selectionMode={SelectionMode.multiple}
                items={scraps}
                columns={columns}
              />
            </PivotItem>
            <PivotItem
              headerText="Starred Scraps"
              itemCount={starredScraps.length}
              itemIcon="FavoriteStar"
            >
              <DetailsList
                selectionMode={SelectionMode.multiple}
                items={starredScraps}
                columns={columns}
              />
            </PivotItem>
          </Pivot>
          <SFlex className="justify-content-center align-items-center">
            <Text className="p-4 text-black-50" variant={"small"}>
              {"----sCrappy----"}
            </Text>
          </SFlex>
        </div>
      </Main>
    </Scene>
  )
}
