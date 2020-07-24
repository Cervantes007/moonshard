import 'reflect-metadata'
import { getApp } from '../app'
import { getStatusByMethod, injectParams } from '../utils/utils'
import { VOLANT_ROUTES } from '../utils/constants'

export const Controller = (options = '/') => (target) => {
  const _options = typeof options === 'string' ? { prefix: options } : options
  const routes = Reflect.getMetadata(VOLANT_ROUTES, target) || {}
  getApp().register(async (server) => {
    const _routes: any[] = Object.values(routes)
    for (const route of _routes) {
      const { paramsMetadata, handler, status, ..._route } = route
      const _status = status || getStatusByMethod(route.method)
      _route.handler = (request, reply) => {
        const params = injectParams({ paramsMetadata, request, reply: reply.status(_status) })
        return handler(...params)
      }
      server.route(_route)
    }
  }, _options)
}

export const Ctrl = Controller
