const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');


let mainWindow;

let createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            // 关闭安全策略,保证能够正常启动remote
            enableRemoteModule: true,
            enableRemoteModule: true,
        }
    });
    const loadURL = isDev ? 'http://localhost:3000' : null;
    mainWindow.loadURL(loadURL);
    // mainWindow.webContents.openDevTools({ mode: 'bottom' });
}

app.whenReady().then(createWindow)