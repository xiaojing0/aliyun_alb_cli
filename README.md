xj0_alb_cli
===========

校精灵阿里云ALB命令行客户端

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/xj0_alb_cli.svg)](https://npmjs.org/package/xj0_alb_cli)
[![Downloads/week](https://img.shields.io/npm/dw/xj0_alb_cli.svg)](https://npmjs.org/package/xj0_alb_cli)
[![License](https://img.shields.io/npm/l/xj0_alb_cli.svg)](https://github.com/silenceu/xj0_alb_cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @backend/xj0_alb_cli
$ xj0_alb_cli COMMAND
running command...
$ xj0_alb_cli (-v|--version|version)
@backend/xj0_alb_cli/0.1.0 darwin-x64 node-v12.22.4
$ xj0_alb_cli --help [COMMAND]
USAGE
  $ xj0_alb_cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`xj0_alb_cli help [COMMAND]`](#xj0_alb_cli-help-command)
* [`xj0_alb_cli ssw`](#xj0_alb_cli-ssw)

## `xj0_alb_cli help [COMMAND]`

display help for xj0_alb_cli

```
USAGE
  $ xj0_alb_cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `xj0_alb_cli ssw`

设置服务器组的某个服务器的权重

```
USAGE
  $ xj0_alb_cli ssw

OPTIONS
  -g, --serverGroupId=serverGroupId  服务器组id
  -h, --help                         show CLI help

EXAMPLE
  $ xj0_alb_cli ssw -g SERVER_GROUP_ID -s SERVER_ID [-t SERVER_TYPE] [-p SERVER_PORT] -w WEIGHT
```

_See code: [src/commands/ssw.ts](https://github.com/silenceu/xj0_alb_cli/blob/v0.1.0/src/commands/ssw.ts)_
<!-- commandsstop -->
