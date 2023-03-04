import {BrowserWindow, app} from 'electron';
const dotenv = require('dotenv').config();

let window: BrowserWindow;

app.on('ready', (event) => {
  window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      // enableRemoteModule: true,
    },
  });
  window.setMenu(null); // No system menu.
  window.loadFile('dist/app/index.html'); // cwd is wherever you called `electron start` from.

  if (dotenv.parsed.BREADITOR_DEV_MODE) {
    const devtoolsWindow = new BrowserWindow();
    window.webContents.setDevToolsWebContents(devtoolsWindow.webContents);
    window.webContents.openDevTools({mode: 'detach'});

    // Set the devtools position when the parent window has finished loading.
    window.webContents.once('did-finish-load', function () {
      console.log('Main window did-finish-load.');

      if (
        dotenv.parsed.MAIN_WINDOW_X != undefined &&
        dotenv.parsed.MAIN_WINDOW_Y != undefined &&
        dotenv.parsed.MAIN_WINDOW_W != undefined &&
        dotenv.parsed.MAIN_WINDOW_H != undefined
      ) {
        console.log('Main window set size.');

        const x = parseInt(dotenv.parsed.MAIN_WINDOW_X, 10);
        const y = parseInt(dotenv.parsed.MAIN_WINDOW_Y, 10);
        const w = parseInt(dotenv.parsed.MAIN_WINDOW_W, 10);
        const h = parseInt(dotenv.parsed.MAIN_WINDOW_H, 10);

        window.setPosition(x, y);
        window.setSize(w, h);
      }
    });

    devtoolsWindow.webContents.once('did-finish-load', function () {
      console.log('devtoolsWindow did-finish-load.');
      if (
        dotenv.parsed.INSPECTOR_WINDOW_X != undefined &&
        dotenv.parsed.INSPECTOR_WINDOW_Y != undefined &&
        dotenv.parsed.INSPECTOR_WINDOW_W != undefined &&
        dotenv.parsed.INSPECTOR_WINDOW_H != undefined
      ) {
        console.log('devtoolsWindow set size.');

        const x = parseInt(dotenv.parsed.INSPECTOR_WINDOW_X, 10);
        const y = parseInt(dotenv.parsed.INSPECTOR_WINDOW_Y, 10);
        const w = parseInt(dotenv.parsed.INSPECTOR_WINDOW_W, 10);
        const h = parseInt(dotenv.parsed.INSPECTOR_WINDOW_H, 10);

        devtoolsWindow.setPosition(x, y);
        devtoolsWindow.setSize(w, h);
      }
    });

    console.log('Lol, Development.');
  } else {
    console.log('Lol, Production.');
  }
});
