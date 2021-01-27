import { useEffect, useState } from "react"
import { useCollection } from "../hooks"
import { ScrapEntity } from "../../types"

/**
 * Convenience Hook to return all Scraps from the database
 */
export const useAllScrapsSubscription = (): ScrapEntity[] => {
  const collection = useCollection<ScrapEntity>("scraps")
  const [results, setResults] = useState<ScrapEntity[]>([])

  useEffect(() => {
    collection.find({ selector: {}, sort: [{ created: "asc" }] }).$.subscribe((results) => {
      setResults(results.map((it) => it))
    })
  }, [collection])

  return results
}
