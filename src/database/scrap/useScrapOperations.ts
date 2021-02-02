import { useCollection } from "../hooks"
import { ScrapEntity } from "../../types"
import { RxDocument } from "rxdb"

export const useScrapOperations = (): {
  bulkInsert: (scraps: ScrapEntity[]) => Promise<{ success: RxDocument<any, {}>[]; error: any[] }>
  save: (scrap: ScrapEntity) => Promise<ScrapEntity>
  deleteOne: (scrap: ScrapEntity) => Promise<void>
  deleteMany: (scraps: ScrapEntity[]) => Promise<void>
} => {
  const collection = useCollection<ScrapEntity | any>("scraps")

  const bulkInsert = async (
    scraps: ScrapEntity[]
  ): Promise<{ success: RxDocument<any, {}>[]; error: any[] }> => {
    await deleteMany(scraps)
    return await collection.bulkInsert(scraps)
  }

  const save = async (scrap: ScrapEntity): Promise<ScrapEntity> => {
    return await collection.upsert(scrap)
  }

  const deleteOne = async (scrap: ScrapEntity): Promise<void> => {
    await collection.find({ selector: { id: scrap.id } }).remove()
  }

  const deleteMany = async (scraps: ScrapEntity[]): Promise<void> => {
    await collection
      .find()
      .where({ id: { $in: scraps.map(({ id }) => id) } })
      .remove()
  }

  return {
    save,
    bulkInsert,
    deleteOne,
    deleteMany,
  }
}
