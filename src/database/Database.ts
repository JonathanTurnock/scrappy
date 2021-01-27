import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from "rxdb"
import { Aigle } from "aigle"
import { RxCollectionCreatorBase } from "rxdb/dist/types/types"
import { hydrateSchema } from "./helpers"
import { RxDBValidatePlugin } from "rxdb/plugins/validate"
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder"

const { mapValues } = Aigle

addRxPlugin(require("pouchdb-adapter-memory"))
addRxPlugin(require("pouchdb-adapter-idb"))
addRxPlugin(RxDBValidatePlugin)
addRxPlugin(RxDBQueryBuilderPlugin)

export class Database {
  private _database: RxDatabase

  private _collections: { [p: string]: RxCollection } = {}

  get collections() {
    return this._collections
  }

  constructor(_database: RxDatabase) {
    this._database = _database
  }

  async addSchemas(schemas: Record<string, string>) {
    const hydratedSchemas = ((await mapValues(schemas, hydrateSchema)) as unknown) as {
      [name: string]: RxCollectionCreatorBase
    }
    this._collections = await this._database.addCollections(hydratedSchemas)
  }

  static async getDatabase(databaseName: string, { inMemory = false }: { inMemory: boolean }) {
    const database = await createRxDatabase({
      name: databaseName,
      adapter: inMemory ? "memory" : "idb",
      ignoreDuplicate: true,
    })
    return new Database(database)
  }
}
