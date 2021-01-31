import "./index.scss"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import { RxCollectionCreatorBase } from "rxdb/dist/types/types"
import App from "./App"
import { store } from "./app/store"
import * as serviceWorker from "./serviceWorker"
import { DatabaseProvider, scrapsCollection } from "./database"

const DATABASE_NAME = "scrappydb"
const SCHEMAS: Record<string, RxCollectionCreatorBase> = {
  scraps: scrapsCollection,
}

const DATABASE_OPTS = { inMemory: false, password: undefined }

ReactDOM.render(
  <DatabaseProvider databaseName={DATABASE_NAME} schemas={SCHEMAS} options={DATABASE_OPTS}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </DatabaseProvider>,
  document.getElementById("app-root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
