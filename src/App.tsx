import React, { useMemo } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import styled from "styled-components"
import { useBoolean } from "@fluentui/react-hooks"
import { PrimaryButton } from "@fluentui/react"
import { DatabaseProvider, InitPhase, scrapsCollection, useDatabaseInitializer } from "./database"
import { RxCollectionCreatorBase } from "rxdb/dist/types/types"
import { Provider } from "react-redux"
import { AppThemeProvider, AutoStack, ToastProvider, useThemeController } from "./@ui-kit"
import { store } from "./app/store"
import { AppBar } from "./components/app-bar/AppBar"
import { SideNav } from "./nav"
import { ScrapListPage, ScrapPage } from "./pages"

const DATABASE_NAME = "scrappydb"
const SCHEMAS: Record<string, RxCollectionCreatorBase> = {
  scraps: scrapsCollection,
}

const DATABASE_OPTS = { inMemory: false, password: undefined }

const AppContainer = styled.div`
  flex: auto;
  display: grid;
  grid-template-rows: 48px auto;
  overflow: hidden;
`

const Main = styled.main`
  display: flex;
  flex: auto;
  overflow: inherit;
`

const App = () => {
  const { push } = useHistory()
  const [initPhase, transitionTo] = useDatabaseInitializer()
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false)
  const [theme, { nextTheme }] = useThemeController()

  const phaseTransitions = useMemo(
    () => ({
      [InitPhase.LOCKED]: transitionTo.unlocking,
      [InitPhase.UNLOCKING]: transitionTo.locked,
      [InitPhase.UNLOCKED]: transitionTo.locked,
    }),
    []
  )

  return (
    <AppThemeProvider userTheme={theme}>
      <Provider store={store}>
        <AppContainer>
          <AppBar
            theme={theme}
            onToggleTheme={nextTheme}
            onBurger={openPanel}
            unlocked={initPhase === InitPhase.UNLOCKED}
            onToggleLock={phaseTransitions[initPhase]}
            onBrand={() => push("/")}
          />
          <Main>
            <ToastProvider>
              {(() => {
                switch (initPhase) {
                  case InitPhase.LOCKED:
                    return (
                      <AutoStack horizontalAlign="center" verticalAlign="center">
                        <PrimaryButton onClick={transitionTo.unlocking} text="Unlock" />
                      </AutoStack>
                    )
                  case InitPhase.UNLOCKING:
                  case InitPhase.UNLOCKED:
                    return (
                      <DatabaseProvider
                        databaseName={DATABASE_NAME}
                        schemas={SCHEMAS}
                        options={DATABASE_OPTS}
                        lockState={initPhase}
                        onLock={transitionTo.locked}
                        onUnlock={transitionTo.unlocked}
                      >
                        <Switch>
                          <Route path="/scrap/:id" component={ScrapPage} />
                          <Route path="/" component={ScrapListPage} />
                        </Switch>
                      </DatabaseProvider>
                    )
                }
              })()}
            </ToastProvider>
          </Main>
        </AppContainer>
        <SideNav isOpen={isOpen} onDismiss={dismissPanel} />
      </Provider>
    </AppThemeProvider>
  )
}

export default App
