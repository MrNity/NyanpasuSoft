// ----- Подключенные библиотеки -----
const express           = require('express')
const session           = require('express-session')
const bodyParser        = require('body-parser')
const MongoStore        = require('connect-mongo')(session)
const path              = require('path')
const http              = require('http')
const https             = require('https')
const axios             = require('axios')
const mongoose          = require('mongoose')
const crypto            = require('crypto')
const fse               = require('fs-extra')
const TelegramBot       = require('node-telegram-bot-api')

// -----------------------------
// FILES
const config            = require('./config')
const fileCids          = './cids.json'
const TOKEN             = config.TELEGRAM_BOT

// -----------------------------
// CONSTANTSр
const app               = express()
const server            = http.createServer(app)

const port              = config.PORT
const https_port        = config.HTTPS_PORT

const DB_OPTS           = {useNewUrlParser: true, useUnifiedTopology: true}

// -----------------------------
// START DATABASE
//mongoose.connect(config.DB_URL, DB_OPTS).then (() => {
//    console.log(`База данных подключена`)
//}).catch((e) => {
//   console.error(e)
//})
// STARTUP TESTS 


let LINKS = []

//setInterval(function() {
//    console.log({LINKS})
//}, 1000)

// -----------------------------
// BOT
const bot = new TelegramBot(`${TOKEN}`, {polling: true})
// -----------------------------

const help = `Доступные команды:\n\n/on - Включить оповещения\n/off - Выключить оповещения`
const link = `https://genshin.hoyoverse.com/ru/gift?code=`

// COMANDS
bot.onText(/\/myid/, (msg) => {
    const cid = msg.chat.id
    sendHTML(cid, `Ваш <b>CHAT ID: ${cid}</b>`)
})
bot.onText(/\/on/, (msg) => {
    let chatId = cid(msg)
    fse.ensureFile(fileCids).then(() => {
        fse.readJson(fileCids).then(text => {
            let cids = text.cids
            let cidIndex = cids.indexOf(chatId)
            if (cidIndex != -1) {
                sendHTML(chatId, `Уведомления уже <b>включены</b>!\n\nЧтобы выключить нажмите /off`)
            } else {
                cids.push(chatId)
                fs.writeFile(fileCids, JSON.stringify({cids}), function (err) {
                    if (err) {
                        newError(error)
                    }
                    sendHTML(chatId, `Уведомления <b>включены</b>!\n\nЧтобы выключить обратно /off`)
                })
            }
        })
    })
})
bot.onText(/\/off/, (msg) => {
    let chatId = cid(msg)
    fse.ensureFile(fileCids).then(() => {
        fse.readJson(fileCids).then(text => {
            let cids = text.cids
            let cidIndex = cids.indexOf(chatId)
            if (cidIndex != -1) {
                cids.splice(cidIndex, 1)
                fs.writeFile(fileCids, JSON.stringify({cids}), function (err) {
                    if (err) {
                        newError(error)
                    }
                    sendHTML(chatId, `Уведомления <b>выключены</b>!\n\nЧтобы выключить обратно /on`)
                })
            } else {
                sendHTML(chatId, `Уведомления уже <b>выключены</b>!\n\nЧтобы включить нажмите /on`)
            }
        })
    })
})
bot.onText(/\/start/, msg => {
    let chatId = cid(msg)
    let name = msg.from.first_name
    
    sendHTML(chatId, `Добро пожаловать!\n${help}`)
})
bot.onText(/\/code/, (msg, [source, match]) => {
    let chatId = cid(msg)
//    \s(\w+[^\d+])
//    let message = msg.text
//    let sss = message.substr(6, message.length)
//    let code = sss.match(/(\w+[^\d+])/)[0]
//    let sd = message.substr(6+code.length, message.length)
//    let date = sd.match(/\d/)
    bot.sendMessage(chatId, `Введите код!`).then(() => {
        GetText(chatId).then(code => {
//            console.log({code})
            if (code != '-') {
                fse.ensureFile(fileCids).then(() => {
                    fse.readJson(fileCids).then(text => {
                        let cids = text.cids

                        cids.forEach(id => {
                            sendHTML(id, `Новый промокод!\n\n<a href="${link}${code}">${code}</a>`)
                        })
                    })
                })
            }

        })
    })
    
})
















// -----------------------------
// ПОДКЛЮЧЕНИЕ ФАЙЛОВ СХЕМ
require('./schemas/accounts')
require('./schemas/characters')
require('./schemas/users')
// -----------------------------
// СОЗДАНИЕ ПЕРЕМЕННЫХ МОДЕЛЕЙ
const Account           = mongoose.model('accounts')
const Character         = mongoose.model('characters')

const User              = mongoose.model('users')
// -----------------------------
// НАСТРОЙКА ПРИЛОЖЕНИЯ
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.disable('x-powered-by')

// -----------------------------
// ЗАПРОСЫ
// http://www.restapitutorial.ru/httpstatuscodes.html
// 200: OK
// 201: Created
// 204: No Content
// 304: Not Modified
// 400: Bad Request
// 401: Unauthorized
// 403: Forbidden
// 404: Not Found
// 500: Internal Server Error

// res.send({status: 200, status_text: 'OK'})
// ✔️  ✖️
// SITE STATUS ✖️

app.post('/signin', function (req, res) {
    let username = req.body.username
    let password = Crypt(req.body.password)
    
    
    
    
    
    
    
})

// --------------------------------------- USERS ---------------------------------------
app.get('/users', function (req, res) {
    
})                       // ✖️
app.get('/users/:username', function (req, res) {
    
})             // ✖️
app.delete('/users/:id', function (req, res) {
    
})                // ✖️
app.put('/users/:id', function (req, res) {
    
})                   // ✖️
app.post('/users', function (req, res) {
    
})                      // ✖️
// --------------------------------------- CHARACTERS ---------------------------------------

// --------------------------------------- ACCOUNTS ---------------------------------------

// --------------------------------------- RESIN ---------------------------------------

// --------------------------------------- SERENITEA POT ---------------------------------------

// --------------------------------------- CRYSTALS ---------------------------------------


// --------------------------------------- LINKS ---------------------------------------
app.post('/links', function (req, res) {
    let links = req.body.links
    LINKS = links
    
    
})                      // ✖️
app.get('/links', function (req, res) {
    res.send(LINKS)
    
})                      // ✖️





// -----------------------------
// START SERVER
//https.createServer({
//  key: fs.readFileSync('server.key'),
//  cert: fs.readFileSync('server.cert')
//}, app)
//.listen(https_port, function () {
//  console.log(`Сервер API был запущен на порту ${https_port}`)
//})

server.listen(port, () => {
    console.log(`Сервер API был запущен на порту ${port}`)
})

// -----------------------------
// FUNCTIONS
function Crypt(pas) {
    return crypto.createHash('sha512', pas).update(pas).digest('base64')
}
function CryptHEX(pas) {
    return crypto.createHash('sha512', pas).update(pas).digest('hex')
}

function GetDateTime(date) {
    
    let day         = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let month       = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth()
    let year        = date.getFullYear()

    let hour        = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let minute      = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let second      = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    
    return `${day}.${month}.${year} ${hour}:${minute}:${second}`
}


// FUNCTIONS FOR BOT
function cid(msg) { return msg.chat.id }
function GetText(cid) {
    return new Promise(function(resolve, reject) {
        bot.once('message', (msg) => {
            let text = msg.text
            let cid_2 = msg.chat.id
            if (cid == cid_2) {
                resolve(text)
            } else {
                GetText(cid).then(text_2 => {
                    resolve(text_2)
                })
            }
        })
    })
}

function sendHTML(chatId, html) {
    const options = {
        parse_mode: 'HTML'
    }
    bot.sendMessage(chatId, html, options)
}

function sendHTML(chatId, html) {
    return new Promise(function(resolve, rejext) {
        const options = {
            parse_mode: 'HTML'
        }
        bot.sendMessage(chatId, html, options).then(() => {
            resolve()
        })
    })
}

// FUNCTIONS GET
function GetData(Model, query = {}, sort = {}, skip = 0, limit = 0) {
    return new Promise(function(resolve, reject) {
        if (limit != 0) {
            Model.find(query).sort(sort).limit(limit).then(arr => {
                resolve(arr)
            })
        } else {
            Model.find(query).sort(sort).then(arr => {
                resolve(arr)
            })
        }
    })
}
function GetOne(Model, query = {}, sort = {}) {
    return new Promise(function(resolve, reject) {
        Model.findOne(query).sort(sort).then(el => {
            resolve(el)
        })
    })
}
function NewDataId(Model, data = {}) {
    return new Promise(function(resolve, reject) {
        Model.findOne({}).sort({id: -1}).then(last => {
            let id = !last ? 1 : last.id + 1
            data.id = id
            let newData = new Model(data)
            newData.save().then(() => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    })
}
function NewData(Model, data = {}) {
    return new Promise(function(resolve, reject) {
        let newData = new Model(data)
        newData.save().then(() => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}
function UpdateOne(Model, query = {}, new_data = {}) {
    return new Promise(function(resolve, reject) {
        Model.updateOne(query, new_data).then(() => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}
function RemoveOne(Model, query = {}) {
    return new Promise(function(resolve, reject) {
        Model.deleteOne(query).then(() => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}
function RemoveMany(Model, query = {}) {
    return new Promise(function(resolve, reject) {
        Model.deleteMany(query).then(() => {
            resolve()
        }).catch(error => {
            reject(error)
        })
    })
}