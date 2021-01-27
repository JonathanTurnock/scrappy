import React from "react"
import { HashRouter, Route, Switch } from "react-router-dom"
import { ScrapListPage, ScrapPage } from "./pages"
import { initializeIcons } from "@fluentui/react"

initializeIcons()

const App = () => (
  <HashRouter basename="scrappy/">
    <Switch>
      <Route path="/scrap/:id" component={ScrapPage} />
      <Route path="/" component={ScrapListPage} />
    </Switch>
  </HashRouter>
)

export default App
