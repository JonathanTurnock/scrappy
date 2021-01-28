const args = process.argv.slice(1);
export const isServe = args.some((val) => val === "--serve");

export const isDev = require("electron-is-dev");
