const { app, BrowserWindow } = require('electron')
const {ipcMain, ipcRenderer} = require('electron')

// electron-reload
require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
})

//--------------------------

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function changeWindow (path, dimensions, attr) {
    const win = new BrowserWindow({
        width: dimensions.width,
        height: dimensions.height,
        minHeight: dimensions.height,
        minWidth: dimensions.width,
        alwaysOnTop: true,
        // icon: './assets/icon.png',
        frame: false,
        alwaysOnTop: false,
        
        titleBarOverlay: {
            color: '#2f3241',
    symbolColor: '#74b1be'
        },
        webPreferences: {
          nodeIntegration: true,
          webviewTag: true,
          enableRemoteModule: true,
          nativeWindowOpen: true,
          contextIsolation:false,
      }
      
    })
  
    // win.setMenu(null)
    win.setResizable(true)
    // win.maximize()
    win.loadURL(`file://${__dirname}/${path}`)

}


app.whenReady().then(() => {
    changeWindow('index.html', {width:1200, height:800})
})