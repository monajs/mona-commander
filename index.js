/**
 * Module dependencies.
 */

const Util = require('util')
const path = require('path')
const spawn = require('child_process').spawn

exports = module.exports = commander

function matchLine (str) {
    return str.indexOf('-') === 0 && str.indexOf('--') === -1
}

function parseLineArgv (str) {
    str = str.splice(1)
    let strList = str.split('')
}

function matchDoubleLine (str) {
    return str.indexOf('--') === 0
}

function parseArgs () {
    let argvs = process.argv.splice(2)
    let config = {
        _: []
    }
    let deleteIndex = []
    argvs.forEach(function (v, i) {
        if (matchLine(v)) {
        } else if (matchDoubleLine()) {
        
        }
    })
    console.log(config)
}

function commander (cmds) {
    let argvs = process.argv.splice(2)
    
    const options = cmds.filter(function (v) {
        return v.name === argvs[0]
    })
    options[0].module.handler()
}


