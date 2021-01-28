import { ScrapEntity } from "../../types"

export const toScrapEntity = ({
  id,
  created,
  name,
  starred,
  locked,
  content,
  contentType,
}: any): ScrapEntity => ({
  id,
  created,
  name,
  starred,
  locked,
  content,
  contentType,
})
