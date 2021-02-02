"use strict";
exports.__esModule = true;
var path_1 = require("path");
var fs_1 = require("fs");
var logger = require("electron-log");
var isPathInside = require("is-path-inside");
// @ts-ignore
exports["default"] = (function (serveFrom) { return function (req, callback) {
    var reqUrl = new URL(req.url);
    console.log(reqUrl);
    logger.debug("Serving Request for APP Resource: " + reqUrl);
    var absPath = path_1.join(serveFrom, path_1.normalize(reqUrl.pathname.replace("/scrappy", "")));
    logger.info("Resolved App Resource to: " + absPath);
    if (isPathInside(absPath, serveFrom) && fs_1.existsSync(absPath)) {
        return callback({ path: absPath });
    }
    else {
        throw new Error(absPath + " does not exist or is not inside the app folder");
    }
}; });
