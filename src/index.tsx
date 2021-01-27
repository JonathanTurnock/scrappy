import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./App"
import { store } from "./app/store"
import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"
import { DatabaseProvider } from "./database"

const DATABASE_NAME = "scrappydb"
const SCHEMAS = {
  scraps: process.env.PUBLIC_URL + "/schemas/scrap.schema.yml",
}
const DATABASE_OPTS = { inMemory: true }

ReactDOM.render(
  <DatabaseProvider databaseName={DATABASE_NAME} schemas={SCHEMAS} options={DATABASE_OPTS}>
    <Provider store={store}>
      <App />
    </Provider>
  </DatabaseProvider>,
  document.getElementById("app-root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
