import { useEffect, useState } from "react"
import { useCollection } from "../hooks"
import { ScrapEntity } from "../../types"

export const useScrapSubscription = ({ id }: { id: string }): ScrapEntity | undefined => {
  const collection = useCollection<ScrapEntity>("scraps")
  const [result, setResult] = useState<ScrapEntity | undefined>()

  useEffect(() => {
    if (id) {
      collection.findOne({ selector: { id } }).$.subscribe((result) => {
        if (result) {
          setResult(result)
        } else {
          setResult(undefined)
        }
      })
    } else {
      throw new Error("Scrap ID is not defined!!, failed to fetch data")
    }
  }, [collection, id])

  return result
}
