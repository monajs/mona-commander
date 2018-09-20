#!/usr/bin/env node

const program = require('../')
const init = require('./init.js')

const cmds = [{
    command: 'init',
    module: init,
    aliases: 'in',
    desc: '根据模版创建新项目'
}]

program(cmds)
