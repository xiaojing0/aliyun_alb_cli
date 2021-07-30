import AlbClient from '../alb-client'
import {Command, flags} from '@oclif/command'
import * as fs from 'fs'
import * as path from 'path'
import {find, forEach} from 'lodash'
import cli from 'cli-ux'
import colors = require('colors')
import * as inquirer from 'inquirer'

export default class SSW extends Command {
  static description = '设置服务器组的某个服务器的权重'

  static examples = [
    '$ xj0_alb_cli ssw -g SERVER_GROUP_ID',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    serverGroupId: flags.string({char: 'g', description: '服务器组id'}),
  }

  static args = []

  async run() {
    this.log(this.config.configDir)
    const ConfigFileBuffer = await fs.readFileSync(path.join(this.config.configDir, 'config.json'))
    const Config = JSON.parse(ConfigFileBuffer.toString())
    const {flags} = this.parse(SSW)
    const serverGroupId: string = flags.serverGroupId || Config.serverGroupId
    this.log(serverGroupId)
    try {
      const albClient = new AlbClient(Config.accessEndpoint, Config.accessKeyId, Config.accessKeySecret)
      const serverGroupServers = await albClient.getServerGroupServers(serverGroupId)
      if (!serverGroupServers || serverGroupServers.length <= 0) {
        this.error('指定的服务器不存在')
      }
      forEach(serverGroupServers, serverGroupServer => {
        this.log(`服务${colors.green(serverGroupServer.description || '--')}(${serverGroupServer.serverIp}:${serverGroupServer.port}), 权重值[${colors.green(String(serverGroupServer.weight))}]`)
      })
      const {isContinue} = await inquirer.prompt([{name: 'isContinue', type: 'confirm', message: '确认是否需要修改服务权重', default: false}])
      if (!isContinue) {
        return
      }
      const {updateServer} = await inquirer.prompt([{
        name: 'updateServer',
        message: '选择设置权重的服务器',
        type: 'list',
        choices: serverGroupServers.map(serverGroupServer => {
          return {
            name: `${serverGroupServer.description}(${serverGroupServer.serverIp}:${serverGroupServer.port})`,
            value: {
              serverIp: serverGroupServer.serverIp,
              serverPort: serverGroupServer.port,
              serverId: serverGroupServer.serverId,
              serverType: 'Ecs',
            },
          }
        }),
      }])
      const {weight} = await inquirer.prompt([{
        name: 'weight',
        message: '本次设置的权重值(0-100):',
        type: 'number',
        validate: input => {
          if (input >= 0 && input <= 100) {
            return true
          }
          return `权重值范围为0-100，输入值为${input}`
        },
      }])

      await albClient.setServerWeight(serverGroupId, updateServer, weight)
      const setWeightProgressBar = cli.progress({
        format: '{bar} {percentage}%',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
      })
      setWeightProgressBar.start(100, 0)
      let percentage = 0
      await new Promise((resolve => {
        const timer = setInterval(async () => {
          percentage++
          setWeightProgressBar.update(percentage)
          if (percentage === 100) {
            clearInterval(timer)
            const serverGroupServers = await albClient.getServerGroupServers(serverGroupId)
            const updatedServer = find(serverGroupServers, serverGroupServer => {
              return serverGroupServer.serverIp === updateServer.serverIp && serverGroupServer.port === updateServer.serverPort && serverGroupServer.weight === weight
            })
            if (updatedServer) {
              setWeightProgressBar.stop()
              this.log(`服务${colors.green(updatedServer.description || '--')}(${updatedServer.serverIp}:${updatedServer.port})设置权重为${colors.green(weight)}成功`)
              resolve({})
            }
          }
        }, 100)
      }))
    } catch (error) {
      this.error(`设置服务器权重失败: ${colors.red(error.message)}`)
    }
  }
}
