const { app, BrowserWindow } = require("electron");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { ipcMain } = require("electron");
const { dialog } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Disable the default menubar
  win.setMenu(null);
}

app.on("ready", createWindow);

ipcMain.on("errmsg", (event, arg) => {
  console.log("Message received from " + event.sender + ":" + arg);

  dialog.showErrorBox("Error", arg);
});
