import AlbBaseClient, {
  ListServerGroupServersRequest, ListServerGroupServersResponse, ListServerGroupServersResponseBodyServers,
  UpdateServerGroupServersAttributeRequest,
  UpdateServerGroupServersAttributeRequestServers,
} from '@alicloud/alb20200616'
import * as OpenApi from '@alicloud/openapi-client'

export default class AlbClient extends AlbBaseClient {
  /**
   * @description 初始化alb client
   * @param {string} accessEndpoint 节点
   * @param {string} accessKeyId 阿里云keyId
   * @param {string} accessKeySecret 阿里云KeySecret
   */
  constructor(accessEndpoint: string, accessKeyId: string, accessKeySecret: string) {
    const config = new OpenApi.Config({
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
    })
    config.endpoint = accessEndpoint
    super(config)
  }

  /**
   * @description 获取服务器组的服务器列表
   * @param {string} serverGroupId 服务器组id
   */
  async getServerGroupServers(serverGroupId: string): Promise<ListServerGroupServersResponseBodyServers[]|undefined> {
    const serverGroupServersReq = new ListServerGroupServersRequest({
      serverGroupId,
    })
    const serverGroupInfo: ListServerGroupServersResponse = await this.listServerGroupServers(serverGroupServersReq)
    return serverGroupInfo.body.servers
  }

  /**
   * @description 设置服务器指定服务器的权重
   * @param {string} serverGroupId 服务器组id
   * @param {Server} server 服务器信息
   * @param {number} weight 权重值
   */
  async setServerWeight(serverGroupId: string, server: Server, weight: number): Promise<void> {
    const updateServer = new UpdateServerGroupServersAttributeRequestServers({
      serverId: server.serverId,
      weight,
      port: server.serverPort,
      serverType: server.serverType,
      serverIp: server.serverIp,
    })
    const updateServerGroupServersAttributeRequest = new UpdateServerGroupServersAttributeRequest({
      serverGroupId: serverGroupId,
      servers: [
        updateServer,
      ],
    })
    await this.updateServerGroupServersAttribute(updateServerGroupServersAttributeRequest)
  }
}
