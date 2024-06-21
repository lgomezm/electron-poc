const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    selectPath: () => ipcRenderer.invoke('selectPath'),
    install: (path) => ipcRenderer.invoke('install', path),
    // we can also expose variables, not just functions
})
