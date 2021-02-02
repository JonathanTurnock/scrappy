import React, { useEffect, useState } from "react"
import { HashRouter, Route, Switch } from "react-router-dom"
import { ThemeProvider } from "@fluentui/react-theme-provider"
import styled from "styled-components"
import { useBoolean } from "@fluentui/react-hooks"
import { ScrapListPage, ScrapPage } from "./pages"
import { SideNav } from "./nav"
import { darkTheme, lightTheme } from "./theme"
import { IconButton, loadTheme } from "@fluentui/react"
import { DatabaseProvider, scrapsCollection } from "./database"
import { RxCollectionCreatorBase } from "rxdb/dist/types/types"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { useMediaQuery } from "react-responsive"

const DATABASE_NAME = "scrappydb"
const SCHEMAS: Record<string, RxCollectionCreatorBase> = {
  scraps: scrapsCollection,
}

const DATABASE_OPTS = { inMemory: false, password: undefined }

const AppContainer = styled.div`
  flex: auto;
  display: flex;
  overflow: hidden;
`

const Main = styled.main`
  display: flex;
  flex: auto;
  overflow: inherit;
`

const App = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false)
  const prefersDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" })
  const [theme, setTheme] = useState(prefersDark ? darkTheme : lightTheme)

  useEffect(() => {
    if (prefersDark) {
      setTheme(darkTheme)
      loadTheme(darkTheme)
    } else {
      setTheme(lightTheme)
      loadTheme(lightTheme)
    }
  }, [prefersDark])

  return (
    <ThemeProvider theme={theme} style={{ display: "flex", flex: "auto" }}>
      <Provider store={store}>
        <HashRouter>
          <AppContainer>
            <SideNav isOpen={isOpen} onDismiss={dismissPanel} />
            <Main>
              <DatabaseProvider
                databaseName={DATABASE_NAME}
                schemas={SCHEMAS}
                options={DATABASE_OPTS}
              >
                <Switch>
                  <Route path="/scrap/:id" component={ScrapPage} />
                  <Route path="/" component={ScrapListPage} />
                </Switch>
              </DatabaseProvider>
            </Main>
          </AppContainer>
        </HashRouter>
        <IconButton
          onClick={openPanel}
          iconProps={{ iconName: "CollapseMenu" }}
          style={{ position: "fixed", bottom: "2rem", left: "2rem" }}
        />
      </Provider>
    </ThemeProvider>
  )
}

export default App
