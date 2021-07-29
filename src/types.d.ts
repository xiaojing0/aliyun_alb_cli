type ServerType = 'Ecs' | 'Eni' | 'Eci'

type Server = {
  serverId: string; // 服务器id
  serverType?: ServerType; // 服务器类型
  serverIp?: string; // 服务器ip
  serverPort?: number; // 服务器端口号
}

declare module 'config.json' {
  export const accessKeyId: string
  export const accessKeySecret: string
  export const accessEndpoint: string
  export const serverGroupId: string // 服务器组id
}
