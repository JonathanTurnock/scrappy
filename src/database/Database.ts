import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from "rxdb"
import { RxCollectionCreatorBase } from "rxdb/dist/types/types"
import { RxDBValidateZSchemaPlugin } from "rxdb/plugins/validate-z-schema"
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder"
import pouchdbAdapterMemory from "pouchdb-adapter-memory"
import pouchdbAdapterIdb from "pouchdb-adapter-idb"

addRxPlugin(pouchdbAdapterMemory)
addRxPlugin(pouchdbAdapterIdb)
addRxPlugin(RxDBValidateZSchemaPlugin)
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

  async addSchemas(schemas: Record<string, RxCollectionCreatorBase>) {
    this._collections = await this._database.addCollections(schemas)
  }

  static async getDatabase(
    databaseName: string,
    { inMemory = false, password }: { inMemory: boolean; password?: string }
  ) {
    const database = await createRxDatabase({
      name: databaseName,
      adapter: inMemory ? "memory" : "idb",
      ignoreDuplicate: true,
      password,
    })
    return new Database(database)
  }
}
