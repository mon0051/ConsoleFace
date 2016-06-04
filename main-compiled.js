'use strict';

var electron = require('electron');

var app = electron.app;

var BrowserWindow = electron.BrowserWindow;

var mainWindow = void 0;

function createWindow() {
  "use strict";

  mainWindow = new BrowserWindow({ width: 1200, height: 800 });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  "use strict";

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  "use strict";

  if (mainWindow === null) {
    createWindow();
  }
});

//# sourceMappingURL=main-compiled.js.map