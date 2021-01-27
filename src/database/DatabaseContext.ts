import { createContext } from "react"
import { Database } from "./Database"

export const DatabaseContext = createContext<Database>({
  // @ts-ignore
  _database: null,
  _collections: {},
  collections: {},
  async addSchemas(): Promise<void> {
    throw new Error("Context Not Initialized, ensure a valid Database is passed to the Provider")
  },
})
