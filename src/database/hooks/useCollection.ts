import { useContext } from "react"
import { DatabaseContext } from "../DatabaseContext"
import { RxCollection } from "rxdb"

/**
 * Use the given collection and return the RxCollection instance so that collection operations
 * can be used
 *
 * @example
 *  const collection: RxCollection<Theatre> = useCollection<Theatre>("theatres")
 *
 * @param collection
 */
export const useCollection = <T>(collection: string): RxCollection<T> => {
  const { collections } = useContext(DatabaseContext)
  return collections[collection]
}
