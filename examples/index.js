#!/usr/bin/env node

const program = require('../')
const init = require('./init.js')

const cmds = [{
    command: 'init',
    module: init,
    aliases: 'in',
    desc: '根据模版创建新项目'
}]

program({
    version: require('../package.json').version,
    desc: '欢迎使用 mona-cli',
    cmds
})
