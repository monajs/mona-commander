# Commander

[![npm](https://img.shields.io/npm/v/@monajs/commander.svg?style=flat-square)](https://www.npmjs.com/package/@monajs/commander) 
[![npm](https://img.shields.io/npm/dt/@monajs/commander.svg?style=flat-square)](https://www.npmjs.com/package/@monajs/commander)
[![Install Size](https://packagephobia.now.sh/badge?p=@monajs/commander)](https://packagephobia.now.sh/result?p=@monajs/commander)

✨✨ 一个简单的命令行底层工具！！！

## 联系我
> 微信：599321378


```bash
$ npm i --save @monajs/commander
```


### 使用指南

```js
#!/usr/bin/env node

const program = require('@monajs/commander')

program(options)

```

### 代码演示

- index.js
```js
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

```

- init.js
```js
exports.handler = argvs => {
    console.log(argvs)
}

```

#### options 属性介绍

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | :-- |
| version | 版本号 | `String` | `null` |
| desc | 命令描述（见下方注释） | `String` | `null` |
| cmds | 命令集合 | `Array` | `[]` |


#### cmdItem 属性介绍

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | :-- |
| command | 命令执行模块名称 | `String` | `null` |
| module | 命令执行模块（见下方注释） | `String` | `404` |
| aliases | 命令执行模块别名 | `String` | `null` |
| desc | 命令执行模块介绍 | `String` | `null` |

* 注：每一个命令执行模块都需要暴露出一个 `handler` 方法作为命令的入口
