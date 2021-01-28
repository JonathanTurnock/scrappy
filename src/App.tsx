import React, { useMemo } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import { ScrapListPage, ScrapPage } from "./pages"
import { INavLink, INavLinkGroup, initializeIcons, Nav, Text } from "@fluentui/react"
import styled from "styled-components"
import { theme } from "./theme"

initializeIcons()

const AppContainer = styled.div`
  flex: auto;
  display: grid;
  grid-template-columns: 200px auto;
  overflow: hidden;
`

const NavFrame = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  background-color: ${theme.palette.neutralLighter};
`

const Main = styled.main`
  display: flex;
  flex: auto;
  overflow: inherit;
`

type IReactRouterNavLinkGroup = Omit<INavLinkGroup, "links"> & { links: Omit<INavLink, "url">[] }

const App = () => {
  const { push } = useHistory()

  const navLinkGroups: IReactRouterNavLinkGroup[] = useMemo(
    () => [
      {
        links: [
          {
            key: "scraps",
            name: "Scraps",
            icon: "TextDocument",
            onClick: () => push("/"),
          },
        ],
      },
    ],
    []
  )

  return (
    <AppContainer>
      <NavFrame>
        <Text className="p-2 no-user-select" variant="xLargePlus">
          sCrappy
        </Text>
        <Nav groups={navLinkGroups as INavLinkGroup[]} />
      </NavFrame>
      <Main>
        <Switch>
          <Route path="/scrap/:id" component={ScrapPage} />
          <Route path="/" component={ScrapListPage} />
        </Switch>
      </Main>
    </AppContainer>
  )
}

export default App
