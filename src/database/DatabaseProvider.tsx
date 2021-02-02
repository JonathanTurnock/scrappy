import React, { useEffect, useState } from "react"
import { Database } from "./Database"
import { DatabaseError } from "./components"
import { DatabaseContext } from "./DatabaseContext"
import { LoadingScreen } from "../@ui-kit"
import { RxCollectionCreatorBase } from "rxdb/dist/types/types"
import { passwordInput } from "../@ui-kit/dialogs/PasswordInputDialog"

export const DatabaseProvider: React.FC<{
  databaseName: string
  schemas: Record<string, RxCollectionCreatorBase>
  options: { inMemory: boolean; password?: string }
}> = ({ databaseName, schemas, options, children }) => {
  const [reload, setReload] = useState(new Date().getTime())
  const [db, setDb] = useState<Database>()
  const [error, setError] = useState<Error | null>()

  useEffect(() => {
    const init = async () => {
      const password = await passwordInput({ title: "Master Password", label: "Password" })
      const db = await Database.getDatabase(databaseName, { ...options, password })
      await db.addSchemas(schemas)
      return db
    }
    init()
      .then((db) => {
        setDb(db)
        setError(null)
      })
      .catch((error) => {
        setError(error)
      })
  }, [databaseName, options, schemas, reload])

  const doRender = () => {
    if (db && !error) {
      return <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
    }

    if (error) {
      return (
        <DatabaseError message={error.message} onReset={() => setReload(new Date().getTime())} />
      )
    }

    if (!db && !error) {
      return <LoadingScreen />
    }

    return <></>
  }

  return doRender()
}
