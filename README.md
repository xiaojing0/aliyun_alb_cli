xj0_alb_cli
===========

校精灵阿里云ALB命令行客户端

[![alb_cli](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://www.npmjs.com/package/@xj0/alb_cli)
[![Version](https://img.shields.io/npm/v/@xj0/alb_cli)](https://npmjs.com/package/@xj0/alb_cli)
[![Downloads/week](https://img.shields.io/npm/dt/@xj0/alb_cli)](https://npmjs.org/package/@xj0/alb_cli)
[![License](https://img.shields.io/npm/l/@xj0/alb_cli)](https://github.com/silenceu/xj0_alb_cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Config](#config)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @xj0/aliyun_alb_cli
$ aliyun_alb_cli COMMAND
running command...
$ aliyun_alb_cli (-v|--version|version)
@xj0/aliyun_alb_cli/0.1.0 darwin-x64 node-v14.17.0
$ aliyun_alb_cli --help [COMMAND]
USAGE
  $ aliyun_alb_cli COMMAND
...
```
<!-- usagestop -->

<!-- config -->
# Config
``` json
// create config file in ~/.config/@xj0/aliyun_alb_cli/config.json
{
    "accessKeyId": "",
    "accessKeySecret": "",
    "accessEndpoint": "",
    "serverGroupId": "", // 阿里云负载均衡ALB 服务器组id
}
```
<!-- configstop -->

# Commands
<!-- commands -->
* [`aliyun_alb_cli help [COMMAND]`](#aliyun_alb_cli-help-command)
* [`aliyun_alb_cli ssw`](#aliyun_alb_cli-ssw)

## `aliyun_alb_cli help [COMMAND]`

display help for aliyun_alb_cli

```
USAGE
  $ aliyun_alb_cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `aliyun_alb_cli ssw`

设置服务器组的某个服务器的权重

```
USAGE
  $ aliyun_alb_cli ssw

OPTIONS
  -g, --serverGroupId=serverGroupId  服务器组id
  -h, --help                         show CLI help

EXAMPLE
  $ xj0_alb_cli ssw -g SERVER_GROUP_ID
```

_See code: [src/commands/ssw.ts](https://github.com/xiaojing0/aliyun_alb_cli/blob/v0.1.0/src/commands/ssw.ts)_
<!-- commandsstop -->
