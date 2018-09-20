#!/usr/bin/env node

const program = require('../')
const help = require('./help.js')

program
    .command('init', {
        module: help,
        desc: '根据模版创建新项目'
    })

