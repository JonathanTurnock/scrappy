export type Language = "markdown" | "yaml" | "json"
export type ScrapEntity = {
  id: string
  created: number
  groupName: string
  name: string
  starred: boolean
  locked: boolean
  archived: boolean
  contentType: Language
  content: string
  labels: string[]
}
