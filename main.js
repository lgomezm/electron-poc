const { dialog } = require('electron')
const { app, BrowserWindow, ipcMain } = require('electron/main')
const fs = require('node:fs')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    win.loadFile('index.html')

    // Open the DevTools. 
    win.webContents.openDevTools()
}

const selectPath = async () => {
    try {
        const file = await dialog.showOpenDialog({
            title: 'Select the directory to install',
            defaultPath: path.join(__dirname),
            buttonLabel: 'Select',
            filters: [
                {
                    name: 'Text Files',
                    extensions: ['txt', 'docx']
                },
            ],
            properties: ["openDirectory"]
        })
        if (!file.canceled) {
            return file.filePaths[0]
        } else {
            return null
        }
    } catch (e) {
        console.log(e)
    }
}

const install = async (installPath) => {
    try {
        const contents = fs.readFileSync('./test.txt', { encoding: 'utf-8' })
        fs.writeFileSync(path.join(installPath, 'test.txt'), contents)
        console.log('Installed in ' + installPath)
    } catch (e) {
        console.log(e)
    }
}

app.whenReady().then(() => {
    ipcMain.handle('selectPath', () => {
        return selectPath()
    })
    ipcMain.handle('install', (e, installPath) => {
        console.log(`Installing in ${installPath}`)
        install(installPath)
    })
    createWindow()

    // macOS apps generally continue running even without
    // any windows open. Activating the app when no 
    // windows are available should open a new one.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    // On Windows and Linux, closing all windows 
    // will generally quit an application entirely.
    // This happens by default in macOS (darwin).
    if (process.platform !== 'darwin') app.quit()
})
