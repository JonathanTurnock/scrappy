import React, { useEffect, useState } from "react"
import { Database } from "./Database"
import { DatabaseError } from "./components"
import { DatabaseContext } from "./DatabaseContext"
import { SLoadingScreen } from "../@ui-components/layouts/SLoadingScreen"
import { RxCollectionCreatorBase } from "rxdb/dist/types/types"

export const DatabaseProvider: React.FC<{
  databaseName: string
  schemas: Record<string, RxCollectionCreatorBase>
  options: { inMemory: boolean; password?: string }
}> = ({ databaseName, schemas, options, children }) => {
  const [db, setDb] = useState<Database>()
  const [error, setError] = useState<Error | null>()

  useEffect(() => {
    const init = async () => {
      const db = await Database.getDatabase(databaseName, options)
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
  }, [databaseName, options, schemas])

  const doRender = () => {
    if (db && !error) {
      return <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
    }

    if (error) {
      return <DatabaseError message={error.message} />
    }

    if (!db && !error) {
      return <SLoadingScreen />
    }

    return <></>
  }

  return doRender()
}
