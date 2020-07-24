import 'reflect-metadata'
import { getApp } from '../app'
import { getStatusByMethod, injectParams } from '../utils/utils'
import { MOONSHARD_ROUTES } from '../utils/constants'
import { spellbook } from './injectable'

interface ControllerOptions {
  prefix?: string
}

export const Controller = (options: ControllerOptions | string = '/'): any => (target: any): void => {
  const _options = typeof options === 'string' ? { prefix: options } : options
  const routes = Reflect.getMetadata(MOONSHARD_ROUTES, target) || {}
  const Constructor = spellbook(target)
  const instance = new Constructor()
  getApp().register(async (server) => {
    const _routes: any[] = Object.values(routes)
    for (const route of _routes) {
      const { paramsMetadata, handler, status, ..._route } = route
      const _status = status || getStatusByMethod(route.method)
      _route.handler = (request, reply) => {
        const params = injectParams({ paramsMetadata, request, reply: reply.status(_status) })
        return handler.call(instance, ...params)
      }
      server.route(_route)
    }
  }, _options)
}

export const Ctrl = Controller
