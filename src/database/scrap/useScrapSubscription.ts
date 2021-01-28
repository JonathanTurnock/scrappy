import { useEffect, useState } from "react"
import { useCollection } from "../hooks"
import { ScrapEntity } from "../../types"
import { toScrapEntity } from "./mappers"

export const useScrapSubscription = ({
  id,
}: {
  id: string
}): [ScrapEntity | undefined, { error?: string }] => {
  const collection = useCollection<ScrapEntity>("scraps")
  const [result, setResult] = useState<ScrapEntity | undefined>()
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    if (id) {
      collection.findOne({ selector: { id } }).$.subscribe((result) => {
        if (result) {
          setResult(toScrapEntity(result))
        } else {
          setError(`Unable to fetch Scrap with id ${id}`)
          setResult(undefined)
        }
      })
    } else {
      throw new Error("Scrap ID is not defined!!, failed to fetch data")
    }
  }, [collection, id])

  return [result, { error }]
}
