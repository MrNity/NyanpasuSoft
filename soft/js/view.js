new Vue({
    el: '#app',
    data: {
        link: '',
        
        char: '',
        hp: 0,
        at: 0,
        def: 0,
        moe: 0,
        ss: 0,
        bonusHeal: 0,
        bonusRecHeal: 0,
        bonusRecHealResonance: 0,
        //
        talantE: 1,
        talantQ: 1,
        constellation: 0,
        // 
        Shield: 0,
        LongShield: 0,
        
        AP: 0,  // Бафф силы атаки
        CE: 0,  // Бафф элементального урона
        
        //
        Heal: 0,
        HealRec: 0,
        HealRecResonance: 0,
        HealRecOnlyResonance: 0,
        
        HealPerTick: 0,
        HealRecPerTick: 0,
        HealRecPerTickResonance: 0,
        HealRecOnlyPerTickResonance: 0,
        
        HealPerAtck: 0,
        HealRecPerAtck: 0,
        HealRecPerAtckResonance: 0,
        HealRecOnlyPerAtckResonance: 0,
        //
        Barbara: {},
        Bennett: {},
        Jean: {},
        Diona: {},
        Kokomi: {},
        Noelle: {},
        Sara: {},
        Sayu: {},
        Xingqiu: {},
        Qiqi: {},
        Zhongli: {},
        Shenhe: {},
        Yunjin: {},
        showAll: false,
        
        // Accounts
        account1: {
            uid: '',
            login: '',
            enable: true,
        },
        account2: {
            uid: '',
            login: '',
            enable: false,
        },
        account3: {
            uid: '',
            login: '',
            enable: false,
        },
        
        // crystals
        Crystals: {
            Mondstadt: crystals.Mondstadt,
            Liyue: crystals.Liyue,
            Inazuma: crystals.Inazuma
        },
        Mondstadt: [],
        Liyue: [],
        Inazuma: [],
        
        LeftNumbers: [],
        
        crystallCollected: 0,
        crystallLeft: 72,
        
        crystallId: 0,
        crystallImg: '',
        
        // Resin
        constParametricTransformer: 597600000,
        constSeeding: 252000000,
        
        accountNum: 1,
        fullResin: 160,
        nowResin: 0,
        needResin: 0,
        
        timer1: {
            resin: null,
            full: null,
            toResin: {
                displayHours: 0,
                displayMinutes: 0,
                displaySeconds: 0,
                loaded: false
            },
            toFull: {
                displayHours: 0,
                displayMinutes: 0,
                displaySeconds: 0,
                loaded: false
            }
        },
        timer2: {
            resin: null,
            full: null,
            toResin: {
                displayHours: 0,
                displayMinutes: 0,
                displaySeconds: 0,
                loaded: false
            },
            toFull: {
                displayHours: 0,
                displayMinutes: 0,
                displaySeconds: 0,
                loaded: false
            }
        },
        timer3: {
            resin: null,
            full: null,
            toResin: {
                displayHours: 0,
                displayMinutes: 0,
                displaySeconds: 0,
                loaded: false
            },
            toFull: {
                displayHours: 0,
                displayMinutes: 0,
                displaySeconds: 0,
                loaded: false
            }
        },
        
        resin: {
            resin1: {
                nowResin: 0,
                needResin: 0,
                overflow: 0,

                timerToNeed: '',
                timerToFull: '',
            },
            resin2: {
                nowResin: 0,
                needResin: 0,
                overflow: 0,

                timerToNeed: '',
                timerToFull: '',
            },
            resin3: {
                nowResin: 0,
                needResin: 0,
                overflow: 0,

                timerToNeed: '',
                timerToFull: '',
            },
        },
        
        // pt
        dateTimePT1: '',
        dateTimePT2: '',
        dateTimePT3: '',
        
        parametricTransformer: {
            pt1: '',
            pt2: '',
            pt3: '',
            timerPT1: null,
            timerPT2: null,
            timerPT3: null,
        },
        timersPT: {
            pt1: {
                displayDays: 0,
                displayHours: 0,
                displayMinutes: 0,
                displaySeconds: 0,
                loaded: false
            },
            pt2: {
                displayDays: 0,
                displayHours: 0,
                displayMinutes: 0,
                displaySeconds: 0,
                loaded: false
            },
            pt3: {
                displayDays: 0,
                displayHours: 0,
                displayMinutes: 0,
                displaySeconds: 0,
                loaded: false
            },
        },
        
        // seeding
        dateTimeSeed: '',
        seeding: {
            seed1: '',
            seed2: '',
            seed3: '',
            timerSeed1: null,
            timerSeed2: null,
            timerSeed3: null,
        },
        timersSeeding: {
            seed1: {
                displayDays: 0,
                displayHours: 0,
                displayMinutes: 0,
                displaySeconds: 0,
                loaded: false
            },
            seed2: {
                displayDays: 0,
                displayHours: 0,
                displayMinutes: 0,
                displaySeconds: 0,
                loaded: false
            },
            seed3: {
                displayDays: 0,
                displayHours: 0,
                displayMinutes: 0,
                displaySeconds: 0,
                loaded: false
            },
        },
        
        // furniture
        furniture: ['2', '2', '3', '3', '4'],
        selectedFurnitures: [`2<i class="fa-solid fa-star star"></i>`, '2<i class="fa-solid fa-star star"></i>', '3<i class="fa-solid fa-star star"></i>', '3<i class="fa-solid fa-star star"></i>', '4<i class="fa-solid fa-star star"></i>'],
        
    },
    methods: {
        BarbaraCalc() {
            let lvE = +this.talantE
            let lvQ = +this.talantQ
            
            let bh = +this.bonusHeal / 100
            let brh = +this.bonusRecHeal / 100
            let brhr = +this.bonusRecHealResonance / 100
            
            let hp = +this.hp
            
            // HEAL in Q
            let heal = hp * Barbara.Q.lvl[lvQ-1].heal.base + Barbara.Q.lvl[lvQ-1].heal.flat
            
            let healBonus = heal + heal * bh
            let healRec = healBonus + heal * brh
            
            this.Heal = healBonus
            this.HealRec = healRec
            this.HealRecResonance = healRec + heal * brhr
            this.HealRecOnlyResonance = healBonus + heal * brhr
            
            // TICK in E
            let healTick = hp * Barbara.E.lvl[lvE-1].heal.base + Barbara.E.lvl[lvE-1].heal.flat
            
            let healTickBonus = healTick + healTick * bh
            let healRecPerTick = healTickBonus + healTick * brh
            
            this.HealPerTick = healTickBonus
            this.HealRecPerTick = healRecPerTick
            
            this.HealRecPerTickResonance = healRecPerTick + healTick * brhr
            this.HealRecOnlyPerTickResonance = healTickBonus + healTick * brhr
            
            // ATCK in E
            let healPerAtck = hp * Barbara.E.lvl[lvE-1].healPerAtck.base + Barbara.E.lvl[lvE-1].healPerAtck.flat
            
            let healPerAtckBonus = healPerAtck + healPerAtck * bh
            let healRecPerAtckBonus = healPerAtckBonus + healPerAtck * brh
            
            this.HealPerAtck = healPerAtckBonus
            this.HealRecPerAtck = healRecPerAtckBonus
            this.HealRecPerAtckResonance = healRecPerAtckBonus + healPerAtck * brhr
            this.HealRecOnlyPerAtckResonance = healPerAtckBonus + healPerAtck * brhr
        },
        BennettCalc() {
            let lvQ = +this.talantQ
            let constellation = +this.constellation
            
            let hp = +this.hp
            let at = +this.at
            
            let healTick = hp * Bennett.Q.lvl[lvQ-1].healPerTick.base + Bennett.Q.lvl[lvQ-1].healPerTick.flat
            this.HealPerTick = healTick
            
            let bonus = 0
            if (constellation >= 1) {
                bonus = 0.2
            }
            let ap = (at + bonus * at) * Bennett.Q.lvl[lvQ-1].abr
            this.AP = ap
        },
        JeanCalc() {
            let lvQ = +this.talantQ
            let bh = +this.bonusHeal / 100
            let brh = +this.bonusRecHeal / 100
            let at = +this.at
            
            let heal = at * Jean.Q.lvl[lvQ-1].heal.base + Jean.Q.lvl[lvQ-1].heal.flat
            
            let healTick = at * Jean.Q.lvl[lvQ-1].healPerTick.base + Jean.Q.lvl[lvQ-1].healPerTick.flat
            let healPerAtck = at * Jean.hold
            
            heal = heal + heal * bh
            this.Heal = heal
            
            healRec = heal + heal * brh
            this.HealRec = healRec
            
            healTick = healTick + healTick * bh
            this.HealPerTick = healTick
            this.HealRecPerTick = healTick + healTick * brh
            
            
            healPerAtck = healPerAtck + healPerAtck * bh
            this.HealPerAtck = healPerAtck
            this.HealRecPerAtck = healPerAtck + healPerAtck * brh
            
        },
        DionaCalc() {
            let lvE = +this.talantE
            let lvQ = +this.talantQ
//            let con = +this.constellation
            
            let shield = +this.hp * Diona.E.lvl[lvE-1].shield.base + Diona.E.lvl[lvE-1].shield.flat
            
            this.Shield = shield
            this.LongShield = shield + shield * Diona.E.hold
            
            let heal = +this.hp * Diona.Q.lvl[lvQ-1].healPerTick.base + Diona.Q.lvl[lvQ-1].healPerTick.flat
            let bh = +this.bonusHeal / 100
            let brh = +this.bonusRecHeal / 100
            this.HealPerTick = heal + heal * bh
            this.HealRecPerTick = +this.HealPerTick + this.HealPerTick * brh
        },
        KokomiCalc() {
            let lvE = +this.talantE
            let lvQ = +this.talantQ
            
            let bh = +this.bonusHeal / 100
            let brh = +this.bonusRecHeal / 100
            let brhr = +this.bonusRecHealResonance / 100
            
            let hp = +this.hp
            
            // TICK in E
            let healTick = hp * Kokomi.E.lvl[lvE-1].heal.base + Kokomi.E.lvl[lvE-1].heal.flat
            
            let healTickBonus = healTick + healTick * bh
            let healRecPerTick = healTickBonus + healTick * brh
            
            this.HealPerTick = healTickBonus
            this.HealRecPerTick = healRecPerTick
            
            this.HealRecPerTickResonance = healRecPerTick + healTick * brhr
            this.HealRecOnlyPerTickResonance = healTickBonus + healTick * brhr
            
            // ATK in Q
            let healPerAtck = hp * Kokomi.Q.lvl[lvE-1].healPerAtck.base + Kokomi.Q.lvl[lvE-1].healPerAtck.flat
            
            let healPerAtckBonus = healPerAtck + healPerAtck * bh
            let healRecPerAtckBonus = healPerAtckBonus + healPerAtck * brh
            
            this.HealPerAtck = healPerAtckBonus
            this.HealRecPerAtck = healRecPerAtckBonus
            this.HealRecPerAtckResonance = healRecPerAtckBonus + healPerAtck * brhr
            this.HealRecOnlyPerAtckResonance = healPerAtckBonus + healPerAtck * brhr
        },
        NoelleCalc() {
            let lvE = +this.talantE
            
            let shield = +this.def * Noelle.E.lvl[lvE-1].shield.base + Noelle.E.lvl[lvE-1].shield.flat
            let heal = +this.def * Noelle.E.lvl[lvE-1].heal.base + Noelle.E.lvl[lvE-1].heal.flat
            
            this.Shield = shield
            heal = heal + (heal * this.bonusHeal / 100)
            this.HealPerAtck = heal
            this.HealRecPerAtck = heal + (heal * this.bonusRecHeal / 100)
            
        },
        SaraCalc() {
            let lvE = +this.talantE
            let at = +this.at
            
            let critElectro = 0
            if (this.constellation == 6) {
                critElectro = 60
            }
            
            let baff = at * Sara.E.lvl[lvE-1].abr
            
            this.AP = baff
            this.CE = critElectro
        },
        SayuCalc() {
            let lvQ = +this.talantQ
            let at = +this.at
            let bh = +this.bonusHeal / 100
            let brh = +this.bonusRecHeal / 100
            let moe = +this.moe
            
            let heal = at * Sayu.Q.lvl[lvQ-1].heal.base + Sayu.Q.lvl[lvQ-1].heal.flat
            heal = heal + heal * bh
            healRec = heal + heal * brh
            this.Heal = heal
            this.HealRec = healRec + healRec * brh
            
            let healTick = at * Sayu.Q.lvl[lvQ-1].healPerTick.base + Sayu.Q.lvl[lvQ-1].healPerTick.flat
            healTick = healTick + healTick * bh
            this.HealPerTick = healTick + healTick * brh
            this.HealRecPerTick = healTick + healTick * brh
            
            let healPerAtck = moe * Sayu.holdMoe + Sayu.hold
            this.HealPerAtck = healPerAtck
            this.HealRecPerAtck = healPerAtck + healPerAtck * brh
            
        },
        XingqiuCalc() {
            let per = 0.06
            let hp = +this.hp
            let bh = +this.bonusHeal / 100
            let brh = +this.bonusRecHeal / 100
            
            let heal = hp * per
            heal = heal + heal * bh
            
            this.Heal = heal
            this.HealRec = heal + heal * brh
        },
        QiqiCalc() {
            let lvE = +this.talantE
            let at = +this.at
            let bh = +this.bonusHeal / 100
            let brh = +this.bonusRecHeal / 100
            
            let heal = at * Qiqi.E.lvl[lvE-1].heal.base + Qiqi.E.lvl[lvE-1].heal.flat
            
            heal = heal + heal * bh
            healRec = heal + heal * brh
            this.Heal = heal
            this.HealRec = healRec + healRec * brh
            
            let healPerAtck = at * Qiqi.E.lvl[lvE-1].healPerAtck.base + Qiqi.E.lvl[lvE-1].healPerAtck.flat
            healPerAtck = healPerAtck + healPerAtck * bh
            this.HealPerAtck = healPerAtck + healPerAtck * brh
            this.HealRecPerAtck = healPerAtck + healPerAtck * brh
        },
        ZhongliCalc() {
            let lvE = +this.talantE
            
            let shield = +this.hp * Zhongli.E.lvl[lvE-1].shield.base + Zhongli.E.lvl[lvE-1].shield.flat
            
            this.Shield = shield + shield * Zhongli.E.hold
        },
        
        ShenheCalc() {
            let lvE = +this.talantE
            let at = +this.at
            
            let baff = at * Shenhe.E.lvl[lvE-1].abr
            
            this.CE = baff      // элементальный урон (крио)
            
        },
        YunjinCalc() {
            let lvE = +this.talantE
            let lvQ = +this.talantQ
            let def = +this.def
            
            let shield = +this.hp * Yunjin.E.lvl[lvE-1].shield.base + Yunjin.E.lvl[lvE-1].shield.flat
            this.Shield = shield
            
            let baff = def * Yunjin.Q.lvl[lvQ-1].abr
            this.AP = baff
            
            this.t1 = def * Yunjin.hold.t1
            this.t2 = def * Yunjin.hold.t2
            this.t3 = def * Yunjin.hold.t3
            this.t4 = def * Yunjin.hold.t4
            
        },
        
        SaveCharInfo() {
            switch (this.char) {
                case 'Barbara':
                    let barbara = {
                        hp: +this.hp,
                        bonusHeal: +this.bonusHeal,
                        bonusRecHeal: +this.bonusRecHeal,
                        bonusRecHealResonance: +this.bonusRecHealResonance,
                        talantE: +this.talantE,
                        talantQ: +this.talantQ,
                        Heal: +this.Heal,
                        HealRec: +this.HealRec,
                        HealRecResonance: +this.HealRecResonance,
                        HealRecOnlyResonance: +this.HealRecOnlyResonance,
                        HealPerTick: +this.HealPerTick,
                        HealRecPerTick: +this.HealRecPerTick,
                        HealRecPerTickResonance: +this.HealRecPerTickResonance,
                        HealRecOnlyPerTickResonance: +this.HealRecOnlyPerTickResonance,
                        HealPerAtck: +this.HealPerAtck,
                        HealRecPerAtck: +this.HealRecPerAtck,
                        HealRecPerAtckResonance: +this.HealRecPerAtckResonance,
                        HealRecOnlyPerAtckResonance: +this.HealRecOnlyPerAtckResonance
                    }
                    localStorage.barbara = JSON.stringify(barbara)
                break
                case 'Bennett':
                    let bennett = {
                        hp: +this.hp,
                        at: +this.at,
                        HealPerTick: +this.HealPerTick,
                        talantQ: +this.talantQ,
                        AP: +this.AP,
                        constellation: +this.constellation
                    }
                    localStorage.bennett = JSON.stringify(bennett)
                break
                case 'Jean':
                    let jean = {
                        at: +this.at,
                        bonusHeal: +this.bonusHeal,
                        bonusRecHeal: +this.bonusRecHeal,
                        talantQ: +this.talantQ,
                        Heal: +this.Heal,
                        HealRec: +this.HealRec,
                        HealPerTick: +this.HealPerTick,
                        HealPerAtck: +this.HealPerAtck,
                        HealRecPerTick: +this.HealRecPerTick,
                        HealRecPerAtck: +this.HealRecPerAtck
                    }
                    localStorage.jean = JSON.stringify(jean)
                break
                case 'Diona':
                    let diona = {
                        hp: +this.hp,
                        bonusHeal: +this.bonusHeal,
                        bonusRecHeal: +this.bonusRecHeal,
                        talantE: +this.talantE,
                        talantQ: +this.talantQ,
                        constellation: +this.constellation,
                        Shield: +this.Shield,
                        LongShield: +this.LongShield,
                        HealPerTick: +this.HealPerTick,
                        HealRecPerTick: +this.HealRecPerTick
                    }
                    localStorage.diona = JSON.stringify(diona)
                break
                case 'Kokomi':
                    let kokomi = {
                        hp: +this.hp,
                        bonusHeal: +this.bonusHeal,
                        bonusRecHeal: +this.bonusRecHeal,
                        talantE: +this.talantE,
                        talantQ: +this.talantQ,
                        HealPerTick: +this.HealPerTick,
                        HealRecPerTick: +this.HealRecPerTick,
                        HealPerAtck: +this.HealPerAtck,
                        HealRecPerAtck: +this.HealRecPerAtck
                    }
                    localStorage.kokomi = JSON.stringify(kokomi)
                break
                case 'Noelle':
                    let noelle = {
                        def: +this.def,
                        bonusHeal: +this.bonusHeal,
                        bonusRecHeal: +this.bonusRecHeal,
                        talantE: +this.talantE,
                        Shield: +this.Shield,
                        Heal: +this.Heal,
                        HealRec: +this.HealRec,
                        HealPerAtck: +this.HealPerAtck,
                        HealRecPerAtck: +this.HealRecPerAtck
                    }
                    localStorage.noelle = JSON.stringify(noelle)
                break
                case 'Sara':
                    let sara = {
                        at: +this.at,
                        talantE: +this.talantE,
                        AP: +this.AP,
                        constellation: +this.constellation,
                        CE: +this.CE
                    }
                    localStorage.sara = JSON.stringify(sara)
                break
                case 'Sayu':
                    let sayu = {
                        at: +this.at,
                        moe: +this.moe,
                        bonusHeal: +this.bonusHeal,
                        bonusRecHeal: +this.bonusRecHeal,
                        Heal: +this.Heal,
                        HealRec: +this.HealRec,
                        HealPerTick: +this.HealPerTick,
                        HealPerAtck: +this.HealPerAtck,
                        HealRecPerTick: +this.HealRecPerTick,
                        HealRecPerAtck: +this.HealRecPerAtck
                    }
                    localStorage.sayu = JSON.stringify(sayu)
                break
                case 'Xingqiu':
                    let xingqiu = {
                        hp: +this.hp,
                        Heal: +this.Heal,
                        HealRec: +this.HealRec
                    }
                    localStorage.xingqiu = JSON.stringify(xingqiu)
                break
                case 'Qiqi':
                    let qiqi = {
                        at: +this.at,
                        bonusHeal: +this.bonusHeal,
                        bonusRecHeal: +this.bonusRecHeal,
                        talantE: +this.talantE,
                        Heal: +this.Heal,
                        HealRec: +this.HealRec,
                        HealPerAtck: +this.HealPerAtck,
                        HealRecPerAtck: +this.HealRecPerAtck
                    }
                    localStorage.qiqi = JSON.stringify(qiqi)
                break
                case 'Zhongli':
                    let zhongli = {
                        hp: +this.hp,
                        talantE: +this.talantE,
                        Shield: +this.Shield
                    }
                    localStorage.zhongli = JSON.stringify(zhongli)
                break
                case 'Shenhe':
                    let shenhe = {
                        at: +this.at,
                        talantE: +this.talantE,
                        CE: +this.CE,
                    }
                    localStorage.shenhe = JSON.stringify(shenhe)
                break
                case 'Yun Jin':
                    let yunjin = {
                        def: +this.def,
                        hp: +this.hp,
                        talantE: +this.talantE,
                        talantQ: +this.talantQ,
                        Shield: +this.Shield,
                        AP: +this.AP,
                        t1: +this.t1,
                        t2: +this.t2,
                        t3: +this.t3,
                        t4: +this.t4,
                    }
                    localStorage.yunjin = JSON.stringify(yunjin)
                break
            }
            alert(`Данные персонажа сохранены в браузере!`)
            this.ShowAll(false)
        },
        LoadCharInfo() {
            switch (this.char) {
                case 'Barbara':
                    let barbara = JSON.parse(localStorage.barbara)
                    this.hp = barbara.hp
                    this.bonusHeal = barbara.bonusHeal
                    this.bonusRecHeal = barbara.bonusRecHeal
                    this.bonusRecHealResonance = barbara.bonusRecHealResonance
                    this.talantE = barbara.talantE
                    this.talantQ = barbara.talantQ
                    this.Heal = barbara.Heal
                    this.HealRec = barbara.HealRec
                    this.HealRecResonance = barbara.HealRecResonance
                    this.HealRecOnlyResonance = barbara.HealRecOnlyResonance
                    this.HealPerTick = barbara.HealPerTick
                    this.HealRecPerTick = barbara.HealRecPerTick
                    this.HealRecPerTickResonance = barbara.HealRecPerTickResonance
                    this.HealRecOnlyPerTickResonance = barbara.HealRecOnlyPerTickResonance
                    this.HealPerAtck = barbara.HealPerAtck
                    this.HealRecPerAtck = barbara.HealRecPerAtck
                    this.HealRecPerAtckResonance = barbara.HealRecPerAtckResonance
                    this.HealRecOnlyPerAtckResonance = barbara.HealRecOnlyPerAtckResonance
                break
                case 'Bennett':
                    let bennett = JSON.parse(localStorage.bennett)
                    this.hp = bennett.hp,
                    this.at = bennett.at,
                    this.HealPerTick = bennett.HealPerTick,
                    this.talantQ = bennett.talantQ,
                    this.AP = bennett.AP
                    this.constellation = bennett.constellation
                break
                case 'Jean':
                    let jean = JSON.parse(localStorage.jean)
                    this.at = jean.at
                    this.bonusHeal = jean.bonusHeal
                    this.bonusRecHeal = jean.bonusRecHeal
                    this.talantQ = jean.talantQ
                    this.Heal = jean.Heal
                    this.HealRec = jean.HealRec
                    this.HealPerTick = jean.HealPerTick
                    this.HealPerAtck = jean.HealPerAtck
                    this.HealRecPerTick = jean.HealRecPerTick
                    this.HealRecPerAtck = jean.HealRecPerAtck
                break
                case 'Diona':
                    let diona = JSON.parse(localStorage.diona)
                    this.hp = diona.hp
                    this.bonusHeal = diona.bonusHeal
                    this.bonusRecHeal = diona.bonusRecHeal
                    this.talantE = diona.talantE
                    this.talantQ = diona.talantQ
                    this.constellation = diona.constellation
                    this.Shield = diona.Shield
                    this.LongShield = diona.LongShield
                    this.HealPerTick = diona.HealPerTick
                    this.HealRecPerTick = diona.HealRecPerTick
                break
                case 'Kokomi':
                    let kokomi = JSON.parse(localStorage.kokomi)
                    this.hp = kokomi.hp
                    this.bonusHeal = kokomi.bonusHeal
                    this.bonusRecHeal = kokomi.bonusRecHeal
                    this.talantE = kokomi.talantE
                    this.talantQ = kokomi.talantQ
                    this.HealPerTick = kokomi.HealPerTick
                    this.HealRecPerTick = kokomi.HealRecPerTick
                    this.HealPerAtck = kokomi.HealPerAtck
                    this.HealRecPerAtck = kokomi.HealRecPerAtck
                break
                case 'Noelle':
                    let noelle = JSON.parse(localStorage.noelle)
                    this.def = noelle.def
                    this.bonusHeal = noelle.bonusHeal
                    this.bonusRecHeal = noelle.bonusRecHeal
                    this.talantE = noelle.talantE
                    this.Shield = noelle.Shield
                    this.Heal = noelle.Heal
                    this.HealRec = noelle.HealRec
                    this.HealPerAtck = noelle.HealPerAtck
                    this.HealRecPerAtck = noelle.HealRecPerAtck
                break
                case 'Sara':
                    let sara = JSON.parse(localStorage.sara)
                    this.at = sara.at,
                    this.talantE = sara.talantE,
                    this.AP = sara.AP
                    this.constellation = sara.constellation
                    this.CE = sara.CE
                break
                case 'Sayu':
                    let sayu = JSON.parse(localStorage.sayu)
                    this.at = sayu.at,
                    this.moe = sayu.moe,
                    this.bonusHeal = sayu.bonusHeal,
                    this.bonusRecHeal = sayu.bonusRecHeal,
                    this.Heal = sayu.Heal,
                    this.HealRec = sayu.HealRec,
                    this.HealPerTick = sayu.HealPerTick,
                    this.HealPerAtck = sayu.HealPerAtck,
                    this.HealRecPerTick = sayu.HealRecPerTick,
                    this.HealRecPerAtck = sayu.HealRecPerAtck
                break
                case 'Xingqiu':
                    let xingqiu = JSON.parse(localStorage.xingqiu)
                    this.hp = xingqiu.hp,
                    this.Heal = xingqiu.Heal,
                    this.HealRec = xingqiu.HealRec
                break
                case 'Qiqi':
                    let qiqi = JSON.parse(localStorage.qiqi)
                    this.at = qiqi.at,
                    this.bonusHeal = qiqi.bonusHeal,
                    this.bonusRecHeal = qiqi.bonusRecHeal,
                    this.talantE = qiqi.talantE,
                    this.Heal = qiqi.Heal,
                    this.HealRec = qiqi.HealRec,
                    this.HealPerAtck = qiqi.HealPerAtck,
                    this.HealRecPerAtck = qiqi.HealRecPerAtck
                break
                case 'Zhongli':
                    let zhongli = JSON.parse(localStorage.zhongli)
                    this.hp = zhongli.hp
                    this.talantE = zhongli.talantE
                    this.Shield = zhongli.Shield
                break
                case 'Shenhe':
                    let shenhe = JSON.parse(localStorage.shenhe)
                    this.at = shenhe.at
                    this.talantE = shenhe.talantE
                    this.CE = shenhe.CE
                break
                case 'Yun Jin':
                    let yunjin = JSON.parse(localStorage.yunjin)
                    this.def = yunjin.def
                    this.hp = yunjin.hp
                    this.talantE = yunjin.talantE
                    this.talantQ = yunjin.talantQ
                    this.Shield = yunjin.Shield
                    this.AP = yunjin.AP
                    this.t1 = yunjin.t1
                    this.t2 = yunjin.t2
                    this.t3 = yunjin.t3
                    this.t4 = yunjin.t4
                break
            }
            alert(`Данные персонажа загружены в форму!`)
        },
        ShowAll(show = true) {
            if (show) {
                this.showAll = !this.showAll
            }
            this.Barbara = localStorage.barbara != undefined ? JSON.parse(localStorage.barbara) : {}
            this.Bennett = localStorage.bennett != undefined ? JSON.parse(localStorage.bennett) : {}
            this.Jean = localStorage.jean != undefined ? JSON.parse(localStorage.jean) : {}
            this.Diona = localStorage.diona != undefined ? JSON.parse(localStorage.diona) : {}
            this.Kokomi = localStorage.kokomi != undefined ? JSON.parse(localStorage.kokomi) : {}
            this.Noelle = localStorage.noelle != undefined ? JSON.parse(localStorage.noelle) : {}
            this.Sara = localStorage.sara != undefined ? JSON.parse(localStorage.sara) : {}
            this.Sayu = localStorage.sayu != undefined ? JSON.parse(localStorage.sayu) : {}
            this.Xingqiu = localStorage.xingqiu != undefined ? JSON.parse(localStorage.xingqiu) : {}
            this.Qiqi = localStorage.qiqi != undefined ? JSON.parse(localStorage.qiqi) : {}
            this.Zhongli = localStorage.zhongli != undefined ? JSON.parse(localStorage.zhongli) : {}
            this.Shenhe = localStorage.shenhe != undefined ? JSON.parse(localStorage.shenhe) : {}
            this.Yunjin = localStorage.yunjin != undefined ? JSON.parse(localStorage.yunjin) : {}
        },
        // check info
        CheckInfo() {
            
            
//            setInterval(function() {
                axios(`http://localhost:8080/links`).then(res => {
                    console.log(res.data)
                }).catch(err => {
                    console.error(err)
                })
//            }, 2000)
            
            
            
            
            //chars
            if (localStorage.barbara == undefined) {
                localStorage.barbara = JSON.stringify({
                    hp: 0,
                    bonusHeal: 0,
                    bonusRecHeal: 0,
                    bonusRecHealResonance: 0,
                    talantE: 0,
                    talantQ: 0,
                    Heal: 0,
                    HealRec: 0,
                    HealRecResonance: 0,
                    HealRecOnlyResonance: 0,
                    HealPerTick: 0,
                    HealRecPerTick: 0,
                    HealRecPerTickResonance: 0,
                    HealRecOnlyPerTickResonance: 0,
                    HealPerAtck: 0,
                    HealRecPerAtck: 0,
                    HealRecPerAtckResonance: 0,
                    HealRecOnlyPerAtckResonance: 0
                })
            }
            if (localStorage.bennett == undefined) {
                localStorage.bennett = JSON.stringify({
                    hp: 0,
                    at: 0,
                    HealPerTick: 0,
                    talantQ: 0,
                    AP: 0,
                    constellation: 0
                })
            }
            if (localStorage.jean == undefined) {
                localStorage.jean = JSON.stringify({
                    at: 0,
                    bonusHeal: 0,
                    bonusRecHeal: 0,
                    talantQ: 0,
                    Heal: 0,
                    HealRec: 0,
                    HealPerTick: 0,
                    HealPerAtck: 0,
                    HealRecPerTick: 0,
                    HealRecPerAtck: 0
                })
            }
            if (localStorage.diona == undefined) {
                localStorage.diona = JSON.stringify({
                    hp: 0,
                    bonusHeal: 0,
                    bonusRecHeal: 0,
                    talantE: 0,
                    talantQ: 0,
                    constellation: 0,
                    Shield: 0,
                    LongShield: 0,
                    HealPerTick: 0,
                    HealRecPerTick: 0
                })
            }
            if (localStorage.kokomi == undefined) {
                localStorage.kokomi = JSON.stringify({
                    hp: 0,
                    bonusHeal: 0,
                    bonusRecHeal: 0,
                    talantE: 0,
                    talantQ: 0,
                    HealPerTick: 0,
                    HealRecPerTick: 0,
                    HealPerAtck: 0,
                    HealRecPerAtck: 0
                })
            }
            if (localStorage.noelle == undefined) {
                localStorage.noelle = JSON.stringify({
                    def: 0,
                    bonusHeal: 0,
                    bonusRecHeal: 0,
                    talantE: 0,
                    Shield: 0,
                    Heal: 0,
                    HealRec: 0,
                    HealPerAtck: 0,
                    HealRecPerAtck: 0
                })
            }
            if (localStorage.sara == undefined) {
                localStorage.sara = JSON.stringify({
                    at: 0,
                    talantE: 0,
                    AP: 0,
                    constellation: 0,
                    CE: 0
                })
            }
            if (localStorage.sayu == undefined) {
                localStorage.sayu = JSON.stringify({
                    at: 0,
                    moe: 0,
                    bonusHeal: 0,
                    bonusRecHeal: 0,
                    Heal: 0,
                    HealRec: 0,
                    HealPerTick: 0,
                    HealPerAtck: 0,
                    HealRecPerTick: 0,
                    HealRecPerAtck: 0
                })
            }
            if (localStorage.xingqiu == undefined) {
                localStorage.xingqiu = JSON.stringify({
                    hp: 0,
                    Heal: 0,
                    HealRec: 0
                })
            }
            if (localStorage.qiqi == undefined) {
                localStorage.qiqi = JSON.stringify({
                    at: 0,
                    bonusHeal: 0,
                    bonusRecHeal: 0,
                    talantE: 0,
                    Heal: 0,
                    HealRec: 0,
                    HealPerAtck: 0,
                    HealRecPerAtck: 0
                })
            }
            if (localStorage.shenhe == undefined) {
                localStorage.shenhe = JSON.stringify({
                    at: 0,
                    talantE: 0,
                    CE: 0,
                })
            }
            if (localStorage.yunjin == undefined) {
                localStorage.yunjin = JSON.stringify({
                    def: 0,
                    hp: 0,
                    talantE: 0,
                    talantQ: 0,
                    Shield: 0,
                    AP: 0,
                    t1: 0,
                    t2: 0,
                    t3: 0,
                    t4: 0,
                })
            }
            if (localStorage.zhongli == undefined) {
                localStorage.zhongli = JSON.stringify({
                    hp: 0,
                    talantE: 0,
                    Shield: 0,
                })
            }
            // crystals
            if (localStorage.Crystals == undefined) {
                localStorage.Crystals = JSON.stringify({
                    Mondstadt: crystals.Mondstadt,
                    Liyue: crystals.Liyue,
                    Inazuma: crystals.Inazuma,
                })
                localStorage.CollectedCrystals = 0
                localStorage.LeftCrystals = 72
                
                this.Mondstadt = crystals.Mondstadt
                this.Liyue = crystals.Liyue
                this.Inazuma = crystals.Inazuma
                
            } else {
                this.Mondstadt = JSON.parse(localStorage.Crystals).Mondstadt
                this.Liyue = JSON.parse(localStorage.Crystals).Liyue
                this.Inazuma = JSON.parse(localStorage.Crystals).Inazuma
                
                this.crystallCollected = localStorage.CollectedCrystals
                this.crystallLeft = localStorage.LeftCrystals
                
                this.Mondstadt.forEach(ava => {
                    if (!ava.available) {
                        this.LeftNumbers.push(ava.num)
                    }
                })
                this.Liyue.forEach(ava => {
                    if (!ava.available) {
                        this.LeftNumbers.push(ava.num)
                    }
                })
                this.Inazuma.forEach(ava => {
                    if (!ava.available) {
                        this.LeftNumbers.push(ava.num)
                    }
                })
            }
            if (localStorage.CollectedCrystals == undefined) {
                this.crystallCollected = 0
                localStorage.CollectedCrystals = 0
            } else {
                this.crystallCollected = localStorage.CollectedCrystals
            }
            if (localStorage.LeftCrystals == undefined) {
                this.crystallLeft = 72
                localStorage.LeftCrystals = 72
            } else {
                this.crystallLeft = localStorage.LeftCrystals
            }
            
            // accs
            if (localStorage.accounts == undefined) {
                localStorage.accounts = JSON.stringify({
                    account1: {
                        uid: '',
                        login: '',
                        enable: true
                    },
                    account2: {
                        uid: '',
                        login: '',
                        enable: false
                    },
                    account3: {
                        uid: '',
                        login: '',
                        enable: false
                    }
                })
            } else {
                let accs = JSON.parse(localStorage.accounts)
                this.account1 = accs.account1
                this.account2 = accs.account2
                this.account3 = accs.account3
            }
        },
        CheckTimers() {
            // timers
            if (localStorage.resin == undefined) {
                localStorage.resin = JSON.stringify({
                    resin1: {
                        nowResin: 0,
                        needResin: 0,

                        timerToNeed: '',
                        timerToFull: '',
                    },
                    resin2: {
                        nowResin: 0,
                        needResin: 0,

                        timerToNeed: '',
                        timerToFull: '',
                    },
                    resin3: {
                        nowResin: 0,
                        needResin: 0,

                        timerToNeed: '',
                        timerToFull: '',
                    },
                })
            } else {
                this.resin = JSON.parse(localStorage.resin)
                
                this.showRemaining(new Date(this.resin.resin1.timerToNeed), 1)
                this.showRemaining(new Date(this.resin.resin1.timerToFull), 1, true)
                
                this.showRemaining(new Date(this.resin.resin2.timerToNeed), 2)
                this.showRemaining(new Date(this.resin.resin2.timerToFull), 2, true)
                
                this.showRemaining(new Date(this.resin.resin3.timerToNeed), 3)
                this.showRemaining(new Date(this.resin.resin3.timerToFull), 3, true)
                
                let dif1 = Math.round(160 - ((new Date(this.resin.resin1.timerToFull) - new Date()) / 1000 / 60 / 8))
                let dif2 = Math.round(160 - ((new Date(this.resin.resin2.timerToFull) - new Date()) / 1000 / 60 / 8))
                let dif3 = Math.round(160 - ((new Date(this.resin.resin3.timerToFull) - new Date()) / 1000 / 60 / 8))
                
                this.resin.resin1.nowResin = dif1
                this.resin.resin2.nowResin = dif2
                this.resin.resin3.nowResin = dif3
                
                this.resin.resin1.overflow = dif1 >= this.fullResin ? dif1 - this.fullResin : 0
                this.resin.resin2.overflow = dif2 >= this.fullResin ? dif2 - this.fullResin : 0
                this.resin.resin3.overflow = dif3 >= this.fullResin ? dif3 - this.fullResin : 0
                
                localStorage.resin = JSON.stringify(this.resin)
                
            }
            // parametric transformer
            if (localStorage.parametricTransformer == undefined) {
                localStorage.parametricTransformer = JSON.stringify({
                    pt1: '',
                    pt2: '',
                    pt3: '',
                    timerPT1: null,
                    timerPT2: null,
                    timerPT3: null,
                })
            } else {
                this.parametricTransformer = JSON.parse(localStorage.parametricTransformer)
                this.showPT()
            }
            // seeding
            if (localStorage.seeding == undefined) {
                localStorage.seeding = JSON.stringify({
                    seed1: '',
                    seed2: '',
                    seed3: '',
                    timerSeed1: null,
                    timerSeed2: null,
                    timerSeed3: null,
                })
            } else {
                this.seeding = JSON.parse(localStorage.seeding)
                this.showSeeding()
            }
        },
        // Crystals
        SetCrystal(crs) {
            crs.available = !crs.available
            
            if (crs.num >= 1 && crs.num <= 23) {
                let cr = this.Mondstadt.findIndex((c) => c.num === crs.num)
                this.Mondstadt[cr].available = crs.available
            }
            if (crs.num >= 24 && crs.num <= 46) {
                let cr = this.Liyue.findIndex((c) => c.num === crs.num)
                this.Liyue[cr].available = crs.available
            }
            if (crs.num >= 47 && crs.num <= 72) {
                let cr = this.Inazuma.findIndex((c) => c.num === crs.num)
                this.Inazuma[cr].available = crs.available
            }
            localStorage.Crystals = JSON.stringify({
                Mondstadt: this.Mondstadt,
                Liyue: this.Liyue,
                Inazuma: this.Inazuma,
            })
            if (crs.available) {
                this.crystallCollected++
                this.crystallLeft--
            } else {
                this.crystallCollected--
                this.crystallLeft++
            }
            
            localStorage.LeftCrystals = this.crystallLeft
            localStorage.CollectedCrystals = this.crystallCollected
        },
        ShowCrystalImg(crs) {
//            console.log(crs)
            if (crs.world) {
                this.crystallId = crs.num
                this.crystallImg = crs.image
            }
        },
        // Timers
        StartResinTimer() {
            let accountNum = +this.accountNum
            let nowResin = +this.nowResin
            let needResin = +this.needResin
            const fullResin = +this.fullResin
            
            let difResin = needResin == 0 ? fullResin - nowResin : needResin - nowResin
            let difResinFull = fullResin - nowResin
            let now = new Date()
            
            let end = new Date (new Date().setTime(now.getTime() + difResin * 8 * 60 * 1000))
            let endFull = new Date (new Date().setTime(now.getTime() + difResinFull * 8 * 60 * 1000))
            
            switch(accountNum) {
                case 1:
                    this.resin.resin1.nowResin = nowResin
                    this.resin.resin1.needResin = needResin
                    
                    this.resin.resin1.timerToNeed = end
                    this.resin.resin1.timerToFull = endFull
                    
                    this.showRemaining(end, accountNum)
                    this.showRemaining(endFull, accountNum, true)
                break
                case 2:
                    this.resin.resin2.nowResin = nowResin
                    this.resin.resin2.needResin = needResin
                    
                    this.resin.resin2.timerToNeed = end
                    this.resin.resin2.timerToFull = endFull
                    
                    this.showRemaining(end, accountNum)
                    this.showRemaining(endFull, accountNum, true)
                    
                break
                case 3:
                    this.resin.resin3.nowResin = nowResin
                    this.resin.resin3.needResin = needResin
                    
                    this.resin.resin3.timerToNeed = end
                    this.resin.resin3.timerToFull = endFull
                    
                    this.showRemaining(end, accountNum)
                    this.showRemaining(endFull, accountNum, true)
                break    
            }
            localStorage.resin = JSON.stringify(this.resin)
        },
        StopTimer(timer) {
            clearInterval(timer)
        },
        AddResin(num) {
            this.CheckTimers()
            let resin = {}
            resin = JSON.parse(localStorage.resin)
            switch(+this.accountNum) {
                case 1:
                    resin.resin1.nowResin = Math.round(160 - ((new Date(resin.resin1.timerToFull) - new Date()) / 1000 / 60 / 8) + num)
                    this.nowResin = resin.resin1.nowResin
                break
                case 2:
                    resin.resin2.nowResin = Math.round(160 - ((new Date(resin.resin2.timerToFull) - new Date()) / 1000 / 60 / 8) + num)
                    this.nowResin = resin.resin2.nowResin
                break
                case 3:
                    resin.resin3.nowResin = Math.round(160 - ((new Date(resin.resin3.timerToFull) - new Date()) / 1000 / 60 / 8) + num)
                    this.nowResin = resin.resin3.nowResin
                break
            }
            
            localStorage.resin = JSON.stringify(resin)
            this.CheckTimers()
            this.StartResinTimer()
            this.nowResin = 0
        },
        showRemaining(end, account, full = false) {
            switch (account) {
                case 1: 
                    if (!full) {
                        clearInterval(this.timer1.resin)
//                        let countSeconds = 1
//                        let countMinutes = 1
                        this.timer1.resin = setInterval(() => {
                            let now = new Date()
                            let distance = end.getTime() - now.getTime()
//                            countSeconds++
//                            if (countSeconds % 61 == 0) {
//                                countMinutes++
//                                countSeconds = 1
//                            }
//                            if (countMinutes % 9 == 0) {
//                                countMinutes = 1
//                                this.AddResin(1)
//                                this.resin.resin1.nowResin++
//                            }
                            
                            if (distance < 0) {
                                clearInterval(this.timer1.resin)
                                return
                            }

                            let hours = Math.floor((distance % this._days) / this._hours)
                            let minutes = Math.floor((distance % this._hours) / this._minutes)
                            let seconds = Math.floor((distance % this._minutes) / this._seconds)

                            this.timer1.toResin.displayMinutes = this.formatNumb(minutes)
                            this.timer1.toResin.displaySeconds = this.formatNumb(seconds)
                            this.timer1.toResin.displayHours = this.formatNumb(hours)
                            this.timer1.toResin.loaded = true
                        }, 1000)
                    } else {
                        clearInterval(this.timer1.full)
                        this.timer1.full = setInterval(() => {
                            let now = new Date()
                            let distance = end.getTime() - now.getTime()
                            
                            if(distance < 0) {
                                clearInterval(this.timer1.full)
                                return
                            }

                            let hours = Math.floor((distance % this._days) / this._hours)
                            let minutes = Math.floor((distance % this._hours) / this._minutes)
                            let seconds = Math.floor((distance % this._minutes) / this._seconds)

                            this.timer1.toFull.displayMinutes = this.formatNumb(minutes)
                            this.timer1.toFull.displaySeconds = this.formatNumb(seconds)
                            this.timer1.toFull.displayHours = this.formatNumb(hours)
                            this.timer1.toFull.loaded = true
                        }, 1000)
                    }
                break
                case 2: 
                    if (!full) {
                        clearInterval(this.timer2.resin)
//                        let countSeconds = 1
//                        let countMinutes = 1
                        this.timer2.resin = setInterval(() => {
                            let now = new Date()
                            let distance = end.getTime() - now.getTime()

//                            countSeconds++
//                            if (countSeconds % 61 == 0) {
//                                countMinutes++
//                                countSeconds = 1
//                            }
//                            if (countMinutes % 9 == 0) {
//                                countMinutes = 1
//                                this.AddResin(2)
//                                this.resin.resin2.nowResin++
//                            }

                            if(distance < 0) {
                                clearInterval(this.timer2.resin)
                                return
                            }

                            let hours = Math.floor((distance % this._days) / this._hours)
                            let minutes = Math.floor((distance % this._hours) / this._minutes)
                            let seconds = Math.floor((distance % this._minutes) / this._seconds)

                            this.timer2.toResin.displayMinutes = this.formatNumb(minutes)
                            this.timer2.toResin.displaySeconds = this.formatNumb(seconds)
                            this.timer2.toResin.displayHours = this.formatNumb(hours)
                            this.timer2.toResin.loaded = true
                        }, 1000)
                    } else {
                        clearInterval(this.timer2.full)
                        this.timer2.full = setInterval(() => {
                            let now = new Date()
                            let distance = end.getTime() - now.getTime()

                            if(distance < 0) {
                                clearInterval(this.timer2.full)
                                return
                            }

                            let hours = Math.floor((distance % this._days) / this._hours)
                            let minutes = Math.floor((distance % this._hours) / this._minutes)
                            let seconds = Math.floor((distance % this._minutes) / this._seconds)

                            this.timer2.toFull.displayMinutes = this.formatNumb(minutes)
                            this.timer2.toFull.displaySeconds = this.formatNumb(seconds)
                            this.timer2.toFull.displayHours = this.formatNumb(hours)
                            this.timer2.toFull.loaded = true
                        }, 1000)
                    }
                break
                case 3: 
                    if (!full) {
                        clearInterval(this.timer3.resin)
//                        let countSeconds = 1
//                        let countMinutes = 1
                        this.timer3.resin = setInterval(() => {
                            let now = new Date()
                            let distance = end.getTime() - now.getTime()
                            
//                            countSeconds++
//                            if (countSeconds % 61 == 0) {
//                                countMinutes++
//                                countSeconds = 1
//                            }
//                            if (countMinutes % 9 == 0) {
//                                countMinutes = 1
//                                this.AddResin(3)
//                                this.resin.resin3.nowResin++
//                            }

                            if(distance < 0) {
                                clearInterval(this.timer3.resin)
                                return
                            }

                            let hours = Math.floor((distance % this._days) / this._hours)
                            let minutes = Math.floor((distance % this._hours) / this._minutes)
                            let seconds = Math.floor((distance % this._minutes) / this._seconds)

                            this.timer3.toResin.displayMinutes = this.formatNumb(minutes)
                            this.timer3.toResin.displaySeconds = this.formatNumb(seconds)
                            this.timer3.toResin.displayHours = this.formatNumb(hours)
                            this.timer3.toResin.loaded = true
                        }, 1000)
                    } else {
                        clearInterval(this.timer3.full)
                        this.timer3.full = setInterval(() => {
                            let now = new Date()
                            let distance = end.getTime() - now.getTime()

                            if(distance < 0) {
                                clearInterval(this.timer3.full)
                                return
                            }

                            let hours = Math.floor((distance % this._days) / this._hours)
                            let minutes = Math.floor((distance % this._hours) / this._minutes)
                            let seconds = Math.floor((distance % this._minutes) / this._seconds)

                            this.timer3.toFull.displayMinutes = this.formatNumb(minutes)
                            this.timer3.toFull.displaySeconds = this.formatNumb(seconds)
                            this.timer3.toFull.displayHours = this.formatNumb(hours)
                            this.timer3.toFull.loaded = true
                        }, 1000)
                    }
                break
            }
            
        },
        
        // parametric transormer
        startPT(acc) {
            switch (acc) {
                case 1:
                    let start1 = ''
                    if (this.dateTimePT1 != '') {
                        start1 = new Date(this.dateTimePT1)
                    } else {
                        start1 = new Date()
                    }
                    let end1 = new Date(new Date().setTime(start1.getTime() + this.constParametricTransformer))
                    this.parametricTransformer.pt1 = end1
                break
                case 2:
                    let start2 = ''
                    if (this.dateTimePT2 != '') {
                        start2 = new Date(this.dateTimePT2)
                    } else {
                        start2 = new Date()
                    }
                    let end2 = new Date(new Date().setTime(start2.getTime() + this.constParametricTransformer))
                    this.parametricTransformer.pt2 = end2
                break
                case 3:
                    let start3 = ''
                    if (this.dateTimePT3 != '') {
                        start3 = new Date(this.dateTimePT3)
                    } else {
                        start3 = new Date()
                    }
                    let end3 = new Date(new Date().setTime(start3.getTime() + this.constParametricTransformer))
                    this.parametricTransformer.pt3 = end3
                break
            }
            this.showPT()
            localStorage.parametricTransformer = JSON.stringify(this.parametricTransformer)
        },
        showPT() {
            let pt1 = new Date(this.parametricTransformer.pt1)
            let pt2 = new Date(this.parametricTransformer.pt2)
            let pt3 = new Date(this.parametricTransformer.pt3)
            
            if (pt1.valueOf('Invalid Date')) {
                this.parametricTransformer.timerPT1 = setInterval(() => {
                    let now = new Date()
                    let distance = pt1.getTime() - now.getTime()

                    if (distance < 0) {
                        clearInterval(this.parametricTransformer.timerPT1)
                        return
                    }

                    let days = Math.floor((distance / this._days))
                    let hours = Math.floor((distance % this._days) / this._hours)
                    let minutes = Math.floor((distance % this._hours) / this._minutes)
                    let seconds = Math.floor((distance % this._minutes) / this._seconds)

                    this.timersPT.pt1.displayMinutes = this.formatNumb(minutes)
                    this.timersPT.pt1.displaySeconds = this.formatNumb(seconds)
                    this.timersPT.pt1.displayHours = this.formatNumb(hours)
                    this.timersPT.pt1.displayDays = this.formatNumb(days)

                    this.timersPT.pt1.loaded = true
                }, 1000)
            }
            if (pt2.valueOf('Invalid Date')) {
                this.parametricTransformer.timerPT2 = setInterval(() => {
                    let now = new Date()
                    let distance = pt2.getTime() - now.getTime()

                    if (distance < 0) {
                        clearInterval(this.parametricTransformer.timerPT2)
                        return
                    }

                    let days = Math.floor((distance / this._days))
                    let hours = Math.floor((distance % this._days) / this._hours)
                    let minutes = Math.floor((distance % this._hours) / this._minutes)
                    let seconds = Math.floor((distance % this._minutes) / this._seconds)

                    this.timersPT.pt2.displayMinutes = this.formatNumb(minutes)
                    this.timersPT.pt2.displaySeconds = this.formatNumb(seconds)
                    this.timersPT.pt2.displayHours = this.formatNumb(hours)
                    this.timersPT.pt2.displayDays = this.formatNumb(days)

                    this.timersPT.pt2.loaded = true
                }, 1000)
            }
            if (pt3.valueOf('Invalid Date')) {
                this.parametricTransformer.timerPT3 = setInterval(() => {
                    let now = new Date()
                    let distance = pt3.getTime() - now.getTime()

                    if (distance < 0) {
                        clearInterval(this.parametricTransformer.timerPT3)
                        return
                    }

                    let days = Math.floor((distance / this._days))
                    let hours = Math.floor((distance % this._days) / this._hours)
                    let minutes = Math.floor((distance % this._hours) / this._minutes)
                    let seconds = Math.floor((distance % this._minutes) / this._seconds)

                    this.timersPT.pt3.displayMinutes = this.formatNumb(minutes)
                    this.timersPT.pt3.displaySeconds = this.formatNumb(seconds)
                    this.timersPT.pt3.displayHours = this.formatNumb(hours)
                    this.timersPT.pt3.displayDays = this.formatNumb(days)

                    this.timersPT.pt3.loaded = true
                }, 1000)
            }
        },
        // seeding 
        startSeeding() {
            let start = ''
            if (this.dateTimeSeed != '') {
                start = new Date(this.dateTimeSeed)
            } else {
                start = new Date()
            }
            switch (+this.accountNum) {
                case 1:
                    let end1 = new Date(new Date().setTime(start.getTime() + this.constSeeding))
                    this.seeding.seed1 = end1
                break
                case 2:
                    let end2 = new Date(new Date().setTime(start.getTime() + this.constSeeding))
                    this.seeding.seed2 = end2
                break
                case 3:
                    let end3 = new Date(new Date().setTime(start.getTime() + this.constSeeding))
                    this.seeding.seed3 = end3
                break
            }
            this.showSeeding()
            localStorage.seeding = JSON.stringify(this.seeding)
        },
        showSeeding() {
            let seed1 = new Date(this.seeding.seed1)
            let seed2 = new Date(this.seeding.seed2)
            let seed3 = new Date(this.seeding.seed3)
            
            if (seed1.valueOf('Invalid Date')) {
                this.seeding.timerSeed1 = setInterval(() => {
                    let now = new Date()
                    let distance = seed1.getTime() - now.getTime()

                    if (distance < 0) {
                        clearInterval(this.seeding.timerSeed1)
                        return
                    }

                    let days = Math.floor((distance / this._days))
                    let hours = Math.floor((distance % this._days) / this._hours)
                    let minutes = Math.floor((distance % this._hours) / this._minutes)
                    let seconds = Math.floor((distance % this._minutes) / this._seconds)

                    this.timersSeeding.seed1.displayMinutes = this.formatNumb(minutes)
                    this.timersSeeding.seed1.displaySeconds = this.formatNumb(seconds)
                    this.timersSeeding.seed1.displayHours = this.formatNumb(hours)
                    this.timersSeeding.seed1.displayDays = this.formatNumb(days)

                    this.timersSeeding.seed1.loaded = true
                }, 1000)
            }
            if (seed2.valueOf('Invalid Date')) {
                this.seeding.timerSeed2 = setInterval(() => {
                    let now = new Date()
                    let distance = seed2.getTime() - now.getTime()

                    if (distance < 0) {
                        clearInterval(this.seeding.timerSeed2)
                        return
                    }

                    let days = Math.floor((distance / this._days))
                    let hours = Math.floor((distance % this._days) / this._hours)
                    let minutes = Math.floor((distance % this._hours) / this._minutes)
                    let seconds = Math.floor((distance % this._minutes) / this._seconds)

                    this.timersSeeding.seed2.displayMinutes = this.formatNumb(minutes)
                    this.timersSeeding.seed2.displaySeconds = this.formatNumb(seconds)
                    this.timersSeeding.seed2.displayHours = this.formatNumb(hours)
                    this.timersSeeding.seed2.displayDays = this.formatNumb(days)

                    this.timersSeeding.seed2.loaded = true
                }, 1000)
            }
            if (seed3.valueOf('Invalid Date')) {
                this.seeding.timerSeed3 = setInterval(() => {
                    let now = new Date()
                    let distance = seed3.getTime() - now.getTime()

                    if (distance < 0) {
                        clearInterval(this.seeding.timerSeed3)
                        return
                    }

                    let days = Math.floor((distance / this._days))
                    let hours = Math.floor((distance % this._days) / this._hours)
                    let minutes = Math.floor((distance % this._hours) / this._minutes)
                    let seconds = Math.floor((distance % this._minutes) / this._seconds)

                    this.timersSeeding.seed3.displayMinutes = this.formatNumb(minutes)
                    this.timersSeeding.seed3.displaySeconds = this.formatNumb(seconds)
                    this.timersSeeding.seed3.displayHours = this.formatNumb(hours)
                    this.timersSeeding.seed3.displayDays = this.formatNumb(days)

                    this.timersSeeding.seed3.loaded = true
                }, 1000)
            }
        },
        
        // settings
        SaveAccountsNames() {
            localStorage.accounts = JSON.stringify({
                account1: {
                    uid: this.account1.uid,
                    login: this.account1.login,
                    enable: this.account1.enable
                },
                account2: {
                    uid: this.account2.uid,
                    login: this.account2.login,
                    enable: this.account2.enable
                },
                account3: {
                    uid: this.account3.uid,
                    login: this.account3.login,
                    enable: this.account3.enable
                },
            })
            alert('Данные аккаунтов сохранены!')
        },
        
        // links
        
        
        // others
        formatNumb(num) {
            return num < 10 ? `0${num}` : num;
        },
    },
    computed: {
        _seconds: () => 1000,
        _minutes() {
            return this._seconds * 60
        },
        _hours() {
            return this._minutes * 60
        },
        _days() {
            return this._hours * 24
        }
    },
    mounted() {
        this.CheckInfo()
        this.CheckTimers()
//        showNotification()
    },
    watch: {
        hp(newData) {
            switch (this.char) {
                case 'Barbara': 
                    this.BarbaraCalc() 
                break
                case 'Bennett': 
                    this.BennettCalc() 
                break
                case 'Diona': 
                    this.DionaCalc() 
                break
                case 'Kokomi': 
                    this.KokomiCalc() 
                break
                case 'Xingqiu': 
                    this.XingqiuCalc() 
                break
                case 'Zhongli': 
                    this.ZhongliCalc() 
                break
                case 'Yun Jin':
                    this.YunjinCalc()
                break
            }
        },
        at(newDate) {
            switch (this.char) {
                case 'Bennett': 
                    this.BennettCalc() 
                break
                case 'Jean': 
                    this.JeanCalc() 
                break
                case 'Sara': 
                    this.SaraCalc() 
                break
                case 'Sayu': 
                    this.SayuCalc() 
                break
                case 'Qiqi': 
                    this.QiqiCalc() 
                break
                case 'Shenhe': 
                    this.ShenheCalc() 
                break
            }
        },
        def(newData) {
            switch (this.char) {
                case 'Noelle':
                    this.NoelleCalc() 
                break
                case 'Yun Jin':
                    this.YunjinCalc()
                break
            }
        },
        moe(newData) {
            this.SayuCalc() 
        },
        bonusHeal(newData) {
            switch (this.char) {
                case 'Barbara': 
                    this.BarbaraCalc() 
                break
                case 'Bennett': 
                    this.BennettCalc() 
                break
                case 'Jean': 
                    this.JeanCalc() 
                break
                case 'Diona': 
                    this.DionaCalc() 
                break
                case 'Kokomi': 
                    this.KokomiCalc() 
                break
                case 'Noelle': 
                    this.NoelleCalc() 
                break
                case 'Sayu': 
                    this.SayuCalc() 
                break
                case 'Xingqiu': 
                    this.XingqiuCalc() 
                break
                case 'Qiqi': 
                    this.QiqiCalc() 
                break
            }
        },
        bonusRecHeal(newData) {
            switch (this.char) {
                case 'Barbara': 
                    this.BarbaraCalc() 
                break
                case 'Bennett': 
                    this.BennettCalc() 
                break
                case 'Jean': 
                    this.JeanCalc() 
                break
                case 'Diona': 
                    this.DionaCalc() 
                break
                case 'Kokomi': 
                    this.KokomiCalc() 
                break
                case 'Noelle': 
                    this.NoelleCalc() 
                break
                case 'Sayu': 
                    this.SayuCalc() 
                break
                case 'Xingqiu': 
                    this.XingqiuCalc() 
                break
                case 'Qiqi': 
                    this.QiqiCalc() 
                break
            }
        },
        bonusRecHealResonance(newData) {
            switch (this.char) {
                case 'Barbara':
                    this.BarbaraCalc()
                break
                case 'Kokomi':
                    this.KokomiCalc()
                break
            }
        },
        talantE(newData) {
            switch (this.char) {
                case 'Barbara': 
                    this.BarbaraCalc() 
                    break
                case 'Bennett': 
                    this.BennettCalc() 
                break
                case 'Jean': 
                    this.JeanCalc() 
                break
                case 'Diona': 
                    this.DionaCalc() 
                break
                case 'Kokomi': 
                    this.KokomiCalc() 
                break
                case 'Noelle': 
                    this.NoelleCalc() 
                break
                case 'Sara': 
                    this.SaraCalc() 
                break
                case 'Sayu': 
                    this.SayuCalc() 
                break
                case 'Xingqiu': 
                    this.XingqiuCalc() 
                break
                case 'Qiqi': 
                    this.QiqiCalc() 
                break
                case 'Zhongli': 
                    this.ZhongliCalc() 
                break
                case 'Shenhe': 
                    this.ShenheCalc() 
                break
                case 'Yun Jin': 
                    this.YunjinCalc() 
                break
            }
        },
        talantQ(newData) {
            switch (this.char) {
                case 'Barbara': 
                    this.BarbaraCalc() 
                    break
                case 'Bennett': 
                    this.BennettCalc() 
                break
                case 'Jean': 
                    this.JeanCalc() 
                break
                case 'Diona': 
                    this.DionaCalc() 
                break
                case 'Kokomi': 
                    this.KokomiCalc() 
                break
                case 'Noelle': 
                    this.NoelleCalc() 
                break
                case 'Sara': 
                    this.SaraCalc() 
                break
                case 'Sayu': 
                    this.SayuCalc() 
                break
                case 'Xingqiu': 
                    this.XingqiuCalc() 
                break
                case 'Qiqi': 
                    this.QiqiCalc() 
                break
                case 'Zhongli': 
                    this.ZhongliCalc() 
                break
                case 'Yun Jin': 
                    this.YunjinCalc() 
                break
            }
        },
        constellation(newData) {
            switch (this.char) {
                case 'Barbara': 
                    this.BarbaraCalc() 
                    break
                case 'Bennett': 
                    this.BennettCalc() 
                break
                case 'Jean': 
                    this.JeanCalc() 
                break
                case 'Diona': 
                    this.DionaCalc() 
                break
                case 'Noelle': 
                    this.NoelleCalc() 
                break
                case 'Sara': 
                    this.SaraCalc() 
                break
                case 'Sayu': 
                    this.SayuCalc() 
                break
                case 'Xingqiu': 
                    this.XingqiuCalc() 
                break
                case 'Qiqi': 
                    this.QiqiCalc() 
                break
                case 'Zhongli': 
                    this.ZhongliCalc() 
                break
                case 'Shenhe': 
                    this.ShenheCalc() 
                break
            }
        },
    }
})



function requestPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      // Поддержка устаревшей версии с функцией обратного вызова.
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('Permission not granted.');
    }
  });
}