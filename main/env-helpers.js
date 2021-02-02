"use strict";
exports.__esModule = true;
var args = process.argv.slice(1);
exports.isServe = args.some(function (val) { return val === "--serve"; });
exports.isDev = require("electron-is-dev");
