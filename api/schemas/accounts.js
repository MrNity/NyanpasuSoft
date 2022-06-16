const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    idUser: {
        type: Number
    },
    uid: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        default: ''
    },
    primogems: {
        type: Number,
        default: 0
    },
    eventFate: {
        type: Number,
        default: 0
    },
    standartFate: {
        type: Number,
        default: 0
    },
    stardust: {
        type: Number,
        default: 0
    },
    starglitter: {
        type: Number,
        default: 0
    },
    genesisCrystal: {
        type: Number,
        default: 0
    },
    radiantSpincrystals: {
        type: [Number],
        default: []
    },
    resin: {
        nowResin: {
            type: Number,
            default: 0
        },
        timeToFull: {
            type: Date
        },
        timeToNeed: {
            type: Date
        }
    },
    parametricTransformer: {
        type: Date
    },
    sereniteaPot: {
        seeding: {
            type: Date
        },
        furnishings: {
            type: [Date]
        },
        realmCurrency: {
            type: Number,
            default: 0
        },
        companionshipEXP: {
            type: Number,
            default: 0
        },
        minuteToRealm: {
            type: Number,
            default: 0
        },
        minuteToCompanionship: {
            type: Number,
            default: 0
        }
    },
    
})

mongoose.model('accounts', schema)