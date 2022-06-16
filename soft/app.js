const path = require('path')
const url = require('url')
const { app,
        BrowserWindow,
        Tray,
        Menu,
        nativeImage,
        Notification,
        systemPreferences,
        clipboard,
        
      }         = require('electron')
const fs        = require('fs')
const fse       = require('fs-extra')
const env       = require('windows-env')
const axios     = require('axios')


const config = require('./config.js')


let mainWin, settingsWin
let wishesLinks = []


let mainOpts = {
    file: `index.html`,
    window: {
        width: 900,
		height: 600,
    }
}
let settingsOpts = {
    file: `settings.html`,
    window: {
        width: 600,
		height: 900,
    }
}


const menuMain = [
  {
    label: 'Основное',
    submenu: [
      { label: 'Закрыть', role: 'quit' }
    ]
  },
]

const menu = Menu.buildFromTemplate(menuMain)
Menu.setApplicationMenu(menu)

app.setName(`Nyanpasu`)
app.whenReady().then(() => {
    const icon = nativeImage.createFromPath(PATH(`/imgs/favicon.ico`))
    tray = new Tray(icon)
    
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Открыть', click: () => { 
                if (BrowserWindow.getAllWindows().length === 0) {
                    CreateWindow(mainWin, mainOpts)
                }
            }
        },
        {label: 'Настройки', click: () => { 
//                if (BrowserWindow.getAllWindows().length === 0) {
                    CreateWindow(settingsWin, settingsOpts)
//                }
            }
        },
        {type: 'separator'},
        {label: 'Закрыть', click: () => { app.quit() } },
    ])
    tray.setContextMenu(contextMenu)
    tray.setTitle('Nyanpasu')
    tray.setToolTip('Nyanpasu')
    tray.on('double-click', () => {
//        console.log(BrowserWindow.getAllWindows()[0])
        
        if (BrowserWindow.getAllWindows().length === 0) {
            CreateWindow(mainWin, mainOpts)
        }
    })
}).then()
.then(() => {
    
//        ReadWishes().then(links => {
//            wishesLinks = links
//            if (wishesLinks[0] != '') {
//                toClip(wishesLinks[0]).then(() => {
//                    showNotification(`Крутки`, `Ссылка круток скопирована в буффер обмена!`)
//                })
//            }
//        })
//    setInterval(function() {
//        ReadWishes()
//    }, 300000)
//    showNotification('У ВАС ЧИЧА', '150 СМОЛЫ')
    
})

app.on('window-all-closed', () => {
    
    
//  if (process.platform !== 'darwin') {
//    app.quit()
//  }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        CreateWindow(mainWin, mainOpts)
    }
})

// функции приложения
function showNotification(title, body) {
    new Notification({ title: `Nyanpasy | ${title}`, body }).show()
}
function toClip(text) {
    return new Promise(function(resolve, reject) {
        clipboard.writeText(text)
        resolve()
    })
}
function CreateWindow(window, options) {
    window = new BrowserWindow({
        height: options.window.height,
        width: options.window.width,
        icon: PATH(`/imgs/favicon.ico`),
        webPreferences: {
            preload: PATH(`preload.js`),
            
        },
    })
    window.loadURL(url.format({
        pathname: PATH(options.file),
        protocol: 'file:',
        slashes: true
	}))
	window.on('closed', () => {
		window = null
	})
}
// побочные функции
function ReadWishes() {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.join(env.USERPROFILE, config.urlGenshin), 'utf8', (err, data) => {
            if (err) throw err
            // поиск ссылок
            let indexes = getListIdx(data, config.urlWishes)
            let indexesEnds = getListIdx(data, config.urlEnd)
            // обработка ссылок
            let tempLinks = getLinks(data, indexes, indexesEnds)
            let links = tempLinks.filter(function(item, pos) {
                return tempLinks.indexOf(item) == pos;
            })
            // вывод ссылок
            resolve(links)
        })
    })
}
function getListIdx(str, substr) {
    let listIdx = []
    let lastIndex = -1
    while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
        listIdx.push(lastIndex)
    }
    return listIdx
}
function getLinks(text, indexes, indexesEnds) {
    let links = []
    let lenEnd = config.urlEnd.length
    let tid = 0
    while (tid !== indexes.length) {
        links.push(text.substring(indexes[tid], indexesEnds[tid] + lenEnd))
        tid++
    }
    return links
}

// помогаторы сокращалки
function PATH(p) {
    return path.join(__dirname, p)
}