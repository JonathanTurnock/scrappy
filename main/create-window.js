"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var logger = require("electron-log");
var env_helpers_1 = require("./env-helpers");
exports.window = null;
exports.createWindow = function () {
    logger.info("Creating Window");
    // const size = screen.getPrimaryDisplay().workAreaSize
    exports.window = new electron_1.BrowserWindow({
        // x: 0,
        // y: 0,
        // width: size.width,
        // height: size.height,
        webPreferences: {
            allowRunningInsecureContent: false,
            contextIsolation: true,
            enableRemoteModule: false,
            nativeWindowOpen: false,
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            nodeIntegrationInSubFrames: false,
            safeDialogs: true,
            sandbox: true,
            webSecurity: true,
            webviewTag: false,
            devTools: env_helpers_1.isDev
        },
        fullscreen: false,
        autoHideMenuBar: true
    });
    if (env_helpers_1.isServe) {
        logger.info('Loading from "http://localhost:3000"');
        exports.window.loadURL("http://localhost:3000");
    }
    else {
        logger.info("Loading from \"app://local/scrappy/index.html\"");
        exports.window.loadURL("app://local/scrappy/index.html");
    }
    if (!env_helpers_1.isDev) {
        electron_1.Menu.setApplicationMenu(new electron_1.Menu());
    }
    exports.window.on("closed", function () {
        logger.info("Window Closed, Quitting Application");
        electron_1.app.quit();
    });
    return exports.window;
};
