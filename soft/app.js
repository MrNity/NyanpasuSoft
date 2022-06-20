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
//const cors      = require('cors')
const { exec } = require('child_process')


const config    = require('./config.js')
const Nyanpasu  = require('./libs/nyanpasu.js')

const hour      = 3600000
const halfHour  = 1800000
const minute    = 60000

let flagGenshin = false
let mainWin, settingsWin
let wishesLinks = []


let mainOpts = {
    file: `views/index.html`,
    window: {
        width: 900,
		height: 600,
    }
}
let settingsOpts = {
    file: `views/settings.html`,
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

//app.use(cors())

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
    
//    setInterval(function() {
//        NofifyOnStart()
//    }, 60000)

    
//    axios.post(`https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&size=20&gacha_id=49763b105936b36e522abc232fb293b6c07654&timestamp=1653954796&lang=ru&device_type=pc&ext=%7b%22loc%22%3a%7b%22x%22%3a336.6330261230469%2c%22y%22%3a204.59329223632813%2c%22z%22%3a332.7401123046875%7d%2c%22platform%22%3a%22WinST%22%7d&game_version=OSRELWin2.7.0_R8029328_S7887865_D8059922&plat_type=pc&region=os_euro&authkey=CxA9rSHzSgg7T%2b7iXwX3pSEiCugByx5tYSPUnbPEknbVmgqyJcN43%2bxnP%2bAGBI4jvEvIooNZXEFOjckvKu%2fCIl6y7%2fvU1iBM4Oe%2bGTT%2fX69RlcjQjFo85zbKazIVIwUL6XYewPZPVFdGytSi6FftP4b1ECpXnCP3Ojh2dabVWqXk4kbR3PepbKmOGoxugEwA3Ji%2f809ZvgQ50Xu9cVJbtWa%2fvx%2b2SN3YebMNHJT5sfkIm1NrBQ4cUr3OKNnl%2bp9POVXADO%2bUBt7pgwI%2fEDA853fHGWF6TYHdP%2feWkBYZ0WPPzXEf1tsEsglPT0tE6wYZuYGBGJtSNt%2b5vegLBN2xyjSy7A93RU4Na1xx44TGUIGAEFkYjQDMPsm2YUjcgr8pk3NTsCvQb9J8USz9OCTRCfYzAGRCR%2fVYDvHDWUvkRaDetABOvyfKFiqL933jWiuS947iMJ30odIPxzrc%2bNFy0bUUpsoyXM5geU9sRaimHx72XVqcOHQVxY36dB5vnocFIil2zizDgmJIe8OMcso5QzAJilcHkWHDM%2b58SoKyzeW214xNinWbezJxCLvgFMvZSP0T34%2fXsl6Q%2f5xG1pcfwOnQ0Ph%2bJAiGsFrqTsvAyaTiRY6DD4p3ilhUzJRpfe7ewSwYXGbwzNAH7kESc6ipds3jQsBgZVyynsKfzOqqK%2fiqxJhTlxxfD0XrB1MyFE6Xtm%2fWK4NoJHZTxYhh9awAqQyF%2frd3cEKVQUjFILouDhIfhg47KXlYYB4kKiPcNUNKOcT8NxKgccWliDMYIO%2fhf%2fppNNv7UGaa7I2S3b3TbxTFjDCttLtInyfCPbIPpIbjirLDFxRowYB2bNDJGIJ1gSBWU6kBp4iqQkgKlcMZb4nmbyGGcFIwsYx79VYceBq0nw0bWu7RihNhdvjTfASfeqkKUW78INb4Z5NzEO0zOOuqTgpyI97VJ72wzWalRicongB6OQOfLI4suv1787sIMmFA1KCa7aNEHTygtCUrm3Obj5hQ8nrvSQBcEN9Kjt%2f2ccR1Yy8QhFVhUj5JEjhrZxttHfyG9cxZMQ2pnDVAVTCCzzQTFZSaegJsaFyC1r3IeBwW%2bXEt4dllrAXL8ZA94qstjeg2V7qMKw22FJrRn7Dg2dhY0YXdTf8Z1YgE0Pu3qo7C52EAQxY7h0UzC4HRmoU%2b2BmAGSYBb2nUuzpfXAO%2fM2k%2bbd65DDnpRUx%2bcGUawUZA7AFQ8emEcCNNYESfWFdmapuLcHVHnpZyeT%2bEcESjVzTWnB4I6TapL1koREf9K%2fTenF586%2fHP5LcVzpg4UA1X9B97yJJmwxpWt832ilHH9XRFJUG46ammxpASvtdswEiwyUaYDh91eF%2f2owBwIA%3d%3d&game_biz=hk4e_global#/log`, {
//        headers: { 'Content-Type': 'application/json' },
//    }).then(res => {
//        
//        console.log(res)
//        
//    })
    
//    setInterval(function() {
//        Wishes()
//    }, 15000)
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
            preload: PATH(`js/preload.js`),
        },
    })
    window.loadURL(url.format({
        pathname: PATH(options.file),
        protocol: 'file:',
        slashes: true
	}))
    window.webContents.openDevTools()
	window.on('closed', () => {
		window = null
	})
}
// побочные функции
function Wishes() {
    ReadWishes().then(links => {
        wishesLinks = links
        axios.post(`${config.urlServer}/links`, {
            links
        }).then(resolve => {
            // если подгрузились новые крутки 
            if (resolve.data == 'New') {
                showNotification(`Крутки`, `Новая история круток подгружена!`)
            }
            // копирование ссылки на крутки
//            if (wishesLinks[0] != '') {
//                toClip(wishesLinks[0]).then(() => {
//                    showNotification(`Крутки`, `Ссылка круток скопирована в буффер обмена!`)
//                })
//            }
        }).catch(error => {
            console.error(error)
        })
    })
}
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
            // возврат ссылок
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
function Processes() {
    return new Promise(function(resolve, reject) {
        exec(`tasklist /v /fi "STATUS eq running"`, (err, stdout, stderr) => {
            if (err || stderr)
                return console.error(err || stderr)

            let genshin = stdout.match(/GenshinImpact.exe/gi)

            resolve(genshin) 
        })
    })
}
function NofifyOnStart() {
    Processes().then(process => {
        if (process != null && !flagGenshin) {
            flagGenshin = true
            // функционал для напоминания при запуске игры

            showNotification(`Напоминание`, `Тебе надо слить смолу в артерии!`)
            //
        }
        if (process == null && flagGenshin) {
            flagGenshin = false
        }
    })
}