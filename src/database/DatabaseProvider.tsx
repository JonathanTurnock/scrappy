import React, { useEffect, useState } from "react"
import { Database } from "./Database"
import { DatabaseError } from "./components"
import { DatabaseContext } from "./DatabaseContext"
import { LoadingScreen } from "../@ui-kit"
import { RxCollectionCreatorBase } from "rxdb/dist/types/types"
import { passwordInput } from "../@ui-kit/dialogs/PasswordInputDialog"
import { InitPhase } from "./hooks"

export const DatabaseProvider: React.FC<{
  databaseName: string
  schemas: Record<string, RxCollectionCreatorBase>
  options: { inMemory: boolean; password?: string }
  lockState: InitPhase
  onLock: () => void
  onUnlock: () => void
}> = ({ databaseName, schemas, options, children, lockState, onLock, onUnlock }) => {
  const [db, setDb] = useState<Database>()
  const [error, setError] = useState<Error | null>()

  useEffect(() => {
    if (lockState === InitPhase.UNLOCKING) {
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
          onUnlock()
        })
        .catch((error) => {
          setError(error)
        })
    }
  }, [databaseName, options, schemas, lockState])

  const doRender = () => {
    if (db && !error) {
      return <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
    }

    if (error) {
      return <DatabaseError message={error.message} onReset={onLock} />
    }

    if (!db && !error) {
      return <LoadingScreen />
    }

    return <></>
  }

  return doRender()
}
