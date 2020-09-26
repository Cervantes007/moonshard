import { buildMethodDecorator } from '../utils/utils'
import { RequestMethod } from '../enums'
import { MOONSHARD_ROUTES } from '../utils/constants'

export const Get = buildMethodDecorator(RequestMethod.GET)
export const Post = buildMethodDecorator(RequestMethod.POST)
export const Put = buildMethodDecorator(RequestMethod.PUT)
export const Patch = buildMethodDecorator(RequestMethod.PATCH)
export const Delete = buildMethodDecorator(RequestMethod.DELETE)
export const Options = buildMethodDecorator(RequestMethod.OPTIONS)
export const Head = buildMethodDecorator(RequestMethod.HEAD)
export const All = buildMethodDecorator(RequestMethod.ALL)

export const HttpCode = (status: number) => (target, key: string | symbol) => {
  if (status) {
    const routes = Reflect.getMetadata(MOONSHARD_ROUTES, target.constructor) || {}
    if (!routes[key]) {
      routes[key] = {}
    }
    routes[key].status = status
    Reflect.defineMetadata(MOONSHARD_ROUTES, routes, target.constructor)
  }
}

export const Pipe = (...funtions) => (target, key: string | symbol) => {
  if (funtions) {
    const routes = Reflect.getMetadata(MOONSHARD_ROUTES, target.constructor) || {}
    if (!routes[key]) {
      routes[key] = {}
    }
    routes[key].pipe = funtions
    Reflect.defineMetadata(MOONSHARD_ROUTES, routes, target.constructor)
  }
}

export const Header = (name: string, value: string) => (target, key: string | symbol) => {
  if (name && value) {
    const routes = Reflect.getMetadata(MOONSHARD_ROUTES, target.constructor) || {}
    if (!routes[key]) {
      routes[key] = {
        headers: [],
      }
    }
    if (routes[key] && !routes[key].headers) {
      routes[key].headers = []
    }
    routes[key].headers.push({ name, value })
    Reflect.defineMetadata(MOONSHARD_ROUTES, routes, target.constructor)
  }
}

export const Redirect = (url = '', statusCode = 302) => (target, key: string | symbol) => {
  if (url) {
    const routes = Reflect.getMetadata(MOONSHARD_ROUTES, target.constructor) || {}
    if (!routes[key]) {
      routes[key] = {}
    }
    routes[key].redirect = { url, statusCode }
    Reflect.defineMetadata(MOONSHARD_ROUTES, routes, target.constructor)
  }
}
