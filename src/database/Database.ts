import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from "rxdb"
import { RxCollectionCreatorBase } from "rxdb/dist/types/types"
import { RxDBValidatePlugin } from "rxdb/plugins/validate"
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder"

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
