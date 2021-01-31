import React, { useEffect, useState } from "react"
import { HashRouter, Route, Switch } from "react-router-dom"
import { ThemeProvider } from "@fluentui/react-theme-provider"
import styled from "styled-components"
import { ScrapListPage, ScrapPage } from "./pages"
import { darkTheme, lightTheme } from "./theme"
import { SideNav } from "./nav"
import { loadTheme } from "@fluentui/react"
import { DatabaseProvider, scrapsCollection } from "./database"
import { RxCollectionCreatorBase } from "rxdb/dist/types/types"
import { Provider } from "react-redux"
import { store } from "./app/store"

const DATABASE_NAME = "scrappydb"
const SCHEMAS: Record<string, RxCollectionCreatorBase> = {
  scraps: scrapsCollection,
}

const DATABASE_OPTS = { inMemory: false, password: undefined }

const AppContainer = styled.div`
  flex: auto;
  display: grid;
  grid-template-columns: 200px auto;
  overflow: hidden;
`

const Main = styled.main`
  display: flex;
  flex: auto;
  overflow: inherit;
`

const App = () => {
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? darkTheme : lightTheme
  )

  useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (e.matches) {
        setTheme(darkTheme)
      } else {
        setTheme(lightTheme)
      }
    })
  }, [])

  useEffect(() => {
    loadTheme(theme)
  }, [theme])

  return (
    <ThemeProvider theme={theme} style={{ display: "flex", flex: "auto" }}>
      <Provider store={store}>
        <DatabaseProvider databaseName={DATABASE_NAME} schemas={SCHEMAS} options={DATABASE_OPTS}>
          <AppContainer>
            <HashRouter>
              <SideNav />
              <Main>
                <Switch>
                  <Route path="/scrap/:id" component={ScrapPage} />
                  <Route path="/" component={ScrapListPage} />
                </Switch>
              </Main>
            </HashRouter>
          </AppContainer>
        </DatabaseProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default App
