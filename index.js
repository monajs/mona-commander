/**
 * Module dependencies.
 */

const Util = require('util')
const path = require('path')

exports = module.exports = commander

/**
 * 匹配'-'开发的字符
 *
 * @param {String} str
 */

function isSingleLine (str) {
    if (str === undefined) {
        return false
    }
    return str.indexOf('-') === 0 && str.indexOf('--') === -1
}

/**
 * 匹配'--'开发的字符
 *
 * @param {String} str
 */


function isDoubleLine (str) {
    if (str === undefined) {
        return false
    }
    return str.indexOf('--') === 0
}

/**
 * 参数解析
 */

function parseArgs () {
    let argvs = process.argv.splice(2)
    let singleLineArgs = []
    let doubleLineArgs = []
    let fullArgs = []
    argvs.forEach(function (v, i) {
        fullArgs.push({
            name: v,
            index: i,
            isNormal: true
        })
        if (isSingleLine(v)) {
            singleLineArgs.push({
                name: v.substring(1),
                index: i
            })
        } else if (isDoubleLine(v)) {
            doubleLineArgs.push({
                name: v.substring(2),
                index: i
            })
        }
    })
    
    singleLineArgs.forEach(function (v) {
        const nextArgv = argvs[v.index + 1]
        if (isSingleLine(nextArgv) || isDoubleLine(nextArgv) || !nextArgv) {
            v.value = true
        } else {
            v.value = nextArgv
            fullArgs[v.index + 1].isNormal = false
        }
        fullArgs[v.index].isNormal = false
    })
    
    doubleLineArgs.forEach(function (v) {
        const nextArgv = argvs[v.index + 1]
        if (isSingleLine(nextArgv) || isDoubleLine(nextArgv) || !nextArgv) {
            v.value = true
        } else {
            v.value = nextArgv
            fullArgs[v.index + 1].isNormal = false
        }
        fullArgs[v.index].isNormal = false
    })
    
    let config = {
        _: []
    }
    
    fullArgs.forEach(function (v) {
        if (v.isNormal) {
            config._.push(v.name)
        }
    })
    
    singleLineArgs.forEach(function (v) {
        const strList = v.name.split('') || []
        strList.forEach(function (item, index) {
            if (index === strList.length - 1) {
                config[item] = v.value
            } else {
                config[item] = true
            }
        })
    })
    
    doubleLineArgs.forEach(function (v) {
        config[v.name] = v.value
    })
    
    return config
}

function help () {
    process.stdout.write('123')
    process.exit()
}

/**
 * 入口方法（主方法）
 *
 * @param {Array} cmds
 */

function commander (cmds) {
    const argvs = parseArgs()
    if (argvs.v || argvs.version) {
        process.stdout.write('0.0.1')
        process.exit()
    } else {
        if (argvs._.length === 0) {
            help()
        } else {
            const options = cmds.filter(function (v) {
                return v.name === argvs._[0]
            })
            options[0].module.handler()
        }
    }
    
}


