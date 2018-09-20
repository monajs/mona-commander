/**
 * Module dependencies.
 */

const Util = require('util')
const EventEmitter = require('events').EventEmitter
const path = require('path')
const spawn = require('child_process').spawn

Util.inherits(Command, EventEmitter)

exports = module.exports = new Command()

function Command () {
    this._version = null
    this._commands = []
}

Command.prototype.version = function (str, flags) {
    if (arguments.length === 0) throw new Error('版本标示不能为空！')
    this._version = str
    flags = flags || '-v, --version'
    this._commands.push({
        'version': { flags: flags }
    })
}

Command.prototype.command = function (name, options) {
    this._commands.push({
        [name]: { name, options }
    })
    
    // console.log(path.resolve(__dirname, options.path))
    spawn(process.execPath, options.module)
    process.exit(0)
}

