/**
 * Module dependencies.
 */

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
    
    // 存储匹配'-'开头的参数
    let singleLineArgs = []
    
    // 存储匹配'--'开头的参数
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

/**
 * 字符串前统一填补空格
 *
 * @param {String} str
 */

function pad (str) {
    const len = 18 - str.length
    return str + Array(len).join(' ')
}

/**
 * help
 *
 * @param {Object} options
 */

function help (options) {
    const { cmds, desc } = options
    let commands = [
        '',
        'Commands:',
        ''
    ]
    
    cmds.forEach(function (v) {
        let item = pad(v.command + (v.aliases ? '|' + v.aliases : '')) + v.desc
        commands.push(item.replace(/^/gm, '    '))
    })
    
    const optionsList = [
        '',
        'Options:',
        '',
        (pad('-h, --help') + 'output usage information').replace(/^/gm, '    '),
        (pad('-v, --version') + 'output the version number').replace(/^/gm, '    '),
        '',
        ''
    ]
    
    process.stdout.write(['', desc].concat(commands, optionsList).join('\n'))
    process.exit()
}

/**
 * 入口方法（主方法）
 *
 * @param {Object} options
 */

function commander (options) {
    const { cmds, version } = options
    const argvs = parseArgs()
    if (argvs._.length === 0) {
        if (argvs.v || argvs.version) {
            process.stdout.write(version + '\n' || 'unknow\n')
            process.exit()
        } else {
            help(options)
        }
    } else {
        const cmd = cmds.filter(function (v) {
            return v.command === argvs._[0] || v.aliases === argvs._[0]
        })[0]
        cmd.module.handler(argvs)
    }
}


