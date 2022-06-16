const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    uid: {
        type: String,
        unique: true
    },
    Barbara: {
        hp: {
            type: Number,
            default: 0
        },
        bonusHeal: {
            type: Number,
            default: 0
        },
        bonusRecHeal: {
            type: Number,
            default: 0
        },
        talantE: {
            type: Number,
            default: 0
        },
        talantQ: {
            type: Number,
            default: 0
        },
        Heal: {
            type: Number,
            default: 0
        },
        HealRec: {
            type: Number,
            default: 0
        },
        HealPerTick: {
            type: Number,
            default: 0
        },
        HealRecPerTick: {
            type: Number,
            default: 0
        },
        HealPerAtck: {
            type: Number,
            default: 0
        },
        HealRecPerAtck: {
            type: Number,
            default: 0
        },
    },
    Bennet: {
        hp: {
            type: Number,
            default: 0
        },
        at: {
            type: Number,
            default: 0
        },
        HealPerTick: {
            type: Number,
            default: 0
        },
        talantQ: {
            type: Number,
            default: 0
        },
        AP: {
            type: Number,
            default: 0
        },
        constellation: {
            type: Number,
            default: 0
        },
    },
    Jean: {
        at: {
            type: Number,
            default: 0
        },
        bonusHeal: {
            type: Number,
            default: 0
        },
        bonusRecHeal: {
            type: Number,
            default: 0
        },
        talantQ: {
            type: Number,
            default: 0
        },
        Heal: {
            type: Number,
            default: 0
        },
        HealRec: {
            type: Number,
            default: 0
        },
        HealPerTick: {
            type: Number,
            default: 0
        },
        HealPerAtck: {
            type: Number,
            default: 0
        },
        HealRecPerTick: {
            type: Number,
            default: 0
        },
        HealRecPerAtck: {
            type: Number,
            default: 0
        },
    },
    Diona: {
        hp: {
            type: Number,
            default: 0
        },
        bonusHeal: {
            type: Number,
            default: 0
        },
        bonusRecHeal: {
            type: Number,
            default: 0
        },
        talantE: {
            type: Number,
            default: 0
        },
        talantQ: {
            type: Number,
            default: 0
        },
        constellation: {
            type: Number,
            default: 0
        },
        Shield: {
            type: Number,
            default: 0
        },
        LongShield: {
            type: Number,
            default: 0
        },
        HealPerTick: {
            type: Number,
            default: 0
        },
        HealRecPerTick: {
            type: Number,
            default: 0
        },
    },
    Kokomi: {
        hp: {
            type: Number,
            default: 0
        },
        bonusHeal: {
            type: Number,
            default: 0
        },
        bonusRecHeal: {
            type: Number,
            default: 0
        },
        talantE: {
            type: Number,
            default: 0
        },
        talantQ: {
            type: Number,
            default: 0
        },
        HealPerTick: {
            type: Number,
            default: 0
        },
        HealRecPerTick: {
            type: Number,
            default: 0
        },
        HealPerAtck: {
            type: Number,
            default: 0
        },
        HealRecPerAtck: {
            type: Number,
            default: 0
        },
    },
    Noelle: {
        def: {
            type: Number,
            default: 0
        },
        bonusHeal: {
            type: Number,
            default: 0
        },
        bonusRecHeal: {
            type: Number,
            default: 0
        },
        talantE: {
            type: Number,
            default: 0
        },
        Shield: {
            type: Number,
            default: 0
        },
        Heal: {
            type: Number,
            default: 0
        },
        HealRec: {
            type: Number,
            default: 0
        },
        HealPerAtck: {
            type: Number,
            default: 0
        },
        HealRecPerAtck: {
            type: Number,
            default: 0
        },
    },
    Sara: {
        at: {
            type: Number,
            default: 0
        },
        talantE: {
            type: Number,
            default: 0
        },
        AP: {
            type: Number,
            default: 0
        },
        constellation: {
            type: Number,
            default: 0
        },
        CE: {
            type: Number,
            default: 0
        },
    },
    Sayu: {
        at: {
            type: Number,
            default: 0
        },
        moe: {
            type: Number,
            default: 0
        },
        constellation: {
            type: Number,
            default: 0
        },
        bonusHeal: {
            type: Number,
            default: 0
        },
        bonusRecHeal: {
            type: Number,
            default: 0
        },
        Heal: {
            type: Number,
            default: 0
        },
        HealRec: {
            type: Number,
            default: 0
        },
        HealPerTick: {
            type: Number,
            default: 0
        },
        HealPerAtck: {
            type: Number,
            default: 0
        },
        HealRecPerTick: {
            type: Number,
            default: 0
        },
        HealRecPerAtck: {
            type: Number,
            default: 0
        },
    },
    Xingqiu: {
        hp: {
            type: Number,
            default: 0
        },
        Heal: {
            type: Number,
            default: 0
        },
        HealRec: {
            type: Number,
            default: 0
        },
    },
    Qiqi: {
        at: {
            type: Number,
            default: 0
        },
        bonusHeal: {
            type: Number,
            default: 0
        },
        bonusRecHeal: {
            type: Number,
            default: 0
        },
        talantE: {
            type: Number,
            default: 0
        },
        Heal: {
            type: Number,
            default: 0
        },
        HealRec: {
            type: Number,
            default: 0
        },
        HealPerAtck: {
            type: Number,
            default: 0
        },
        HealRecPerAtck: {
            type: Number,
            default: 0
        },
    },
    Zhongli: {
        hp: {
            type: Number,
            default: 0
        },
        talantE: {
            type: Number,
            default: 0
        },
        Shield: {
            type: Number,
            default: 0
        },
    },
    Shenhe: {
        at: {
            type: Number,
            default: 0
        },
        talantE: {
            type: Number,
            default: 0
        },
        CE: {
            type: Number,
            default: 0
        },
    },
    YunJin: {
        def: {
            type: Number,
            default: 0
        },
        hp: {
            type: Number,
            default: 0
        },
        talantE: {
            type: Number,
            default: 0
        },
        talantQ: {
            type: Number,
            default: 0
        },
        Shield: {
            type: Number,
            default: 0
        },
        AP: {
            type: Number,
            default: 0
        },
        t1: {
            type: Number,
            default: 0
        },
        t2: {
            type: Number,
            default: 0
        },
        t3: {
            type: Number,
            default: 0
        },
        t4: {
            type: Number,
            default: 0
        },
    },
})

mongoose.model('characters', schema)