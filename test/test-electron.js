const {app, BrowserWindow} = require('electron');
const {Server, Options} = require("./../dist/index");
const path = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    Server({
        state: Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine: Options.Server.Engine.SOCKETIO.Server,
        port: 213,
        io: async (io) => {

        },
        onDisconnect: async (id) => {
            console.log(`user disconnect`, JSON.stringify(id))
        },
        options: {}
    }).then(async (result) => {
        console.log(JSON.stringify(result))
    }).catch(async (e) => {
        console.error(e);
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})