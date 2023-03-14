/* special file. Whee. */
const {contextBridge, ipcRenderer /*, ipcMain*/} = require('electron');

console.log('preload.ts!');

contextBridge.exposeInMainWorld('electronAPI', {
  appClose: () => {
    ipcRenderer.send('app-close');
  },
  appMinimize: () => {
    ipcRenderer.send('app-minimize');
  },
  appMaximize: () => {
    ipcRenderer.send('app-maximize');
  },
});
