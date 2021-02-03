"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path_1 = require("path");
var electron_log_1 = require("electron-log");
var create_window_1 = require("./main/create-window");
var app_protocol_1 = require("./main/app.protocol");
electron_log_1.info("Logging Directory", path_1.resolve(electron_1.app.getPath("logs")));
var win;
electron_1.protocol.registerSchemesAsPrivileged([
    {
        scheme: "app",
        privileges: { secure: true, standard: true }
    },
]);
electron_1.app.on("ready", function () {
    electron_1.protocol.registerFileProtocol("app", app_protocol_1["default"](path_1.resolve(__dirname)));
    win = create_window_1.createWindow();
    win.on("closed", function () {
        win = undefined;
    });
});
electron_1.app.on("activate", function () {
    if (!win) {
        win = create_window_1.createWindow();
        win.on("closed", function () {
            win = undefined;
        });
    }
});
electron_1.app.on("web-contents-created", function (event, contents) {
    contents.on("will-navigate", function (event) {
        event.preventDefault();
    });
});
