import { join, normalize } from "path"
import { existsSync } from "fs"
import * as logger from "electron-log"

const isPathInside = require("is-path-inside")

// @ts-ignore
export default (serveFrom) => (req, callback) => {
  const reqUrl = new URL(req.url)
  console.log(reqUrl)
  logger.debug(`Serving Request for APP Resource: ${reqUrl}`)
  const absPath = join(serveFrom, normalize(reqUrl.pathname))
  logger.info(`Resolved App Resource to: ${absPath}`)
  if (isPathInside(absPath, serveFrom) && existsSync(absPath)) {
    return callback({ path: absPath })
  } else {
    throw new Error(`${absPath} does not exist or is not inside the app folder`)
  }
}
