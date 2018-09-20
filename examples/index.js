#!/usr/bin/env node

const program = require('../')
const help = require('./help.js')

const cmds = [{
    name: 'help',
    module: help,
    desc: '根据模版创建新项目'
}]

program(cmds)
