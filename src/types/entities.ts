export type Language = "markdown" | "yaml" | "json"
export type ScrapEntity = {
  id: string
  created: number
  name: string
  starred: boolean
  locked: boolean
  contentType: Language
  content: string
}
