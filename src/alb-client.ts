import AlbBaseClient, {
  ListServerGroupServersRequest,
  ListServerGroupServersResponse,
  ListServerGroupServersResponseBodyServers,
  ListServerGroupsRequest,
  ListServerGroupsResponse,
  UpdateServerGroupServersAttributeRequest,
  UpdateServerGroupServersAttributeRequestServers,
} from '@alicloud/alb20200616'
import * as OpenApi from '@alicloud/openapi-client'
import * as _ from 'lodash'
import {ListServerGroupsResponseBodyServerGroups} from '@alicloud/alb20200616/src/client'

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
    const serverGroupServersRequest = new ListServerGroupServersRequest({
      serverGroupId,
    })
    const serverGroupServersResponse: ListServerGroupServersResponse = await this.listServerGroupServers(serverGroupServersRequest)
    return serverGroupServersResponse.body.servers
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

  /**
   * @description 获取服务器组信息
   * @param {string} serverGroupId 服务器组id
   */
  async getServerGroup(serverGroupId: string): Promise<ListServerGroupsResponseBodyServerGroups|undefined> {
    const serverGroupsRequest = new ListServerGroupsRequest({
      serverGroupIds: [serverGroupId],
    })
    const serverGroupsResponse: ListServerGroupsResponse = await this.listServerGroups(serverGroupsRequest)
    return _.get(serverGroupsResponse, 'body.serverGroups.0')
  }
}
