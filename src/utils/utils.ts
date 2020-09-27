import { BadRequestError } from './../error-handling/errors/bad-request-error'
import { MOONSHARD_PARAMS, MOONSHARD_ROUTES } from './constants'
import { RequestMethod } from '../enums'
import { RouteParamtypes } from '../enums/route-paramtypes.enum'
import { transformAndValidateSync } from './class-transformer-validator'
import { castToNumber } from './cast-to-number'
import { castToBoolean } from './cast-to-boolean'

export const buildParamDecorator = (type) => (path?: string) => (
  target: any,
  key: string | symbol,
  index: number,
) => {
  const metadata = Reflect.getMetadata(MOONSHARD_PARAMS, target, key) || []
  metadata.unshift({ index, type, path })
  Reflect.defineMetadata(MOONSHARD_PARAMS, metadata, target, key)
}

export const buildMethodDecorator = (method: string) => (url = '/') => (
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<any>,
) => {
  const paramsMetadata = Reflect.getMetadata(MOONSHARD_PARAMS, target, key) || []
  const handler = descriptor.value
  const route = { url, method, handler, paramsMetadata }
  const routes = Reflect.getMetadata(MOONSHARD_ROUTES, target.constructor) || {}
  routes[key] = { ...route, ...routes[key] }
  Reflect.defineMetadata(MOONSHARD_ROUTES, routes, target.constructor)
  return descriptor
}

export const buildParamDecoratorWithParamType = (type) => (path?: string) => (
  target: any,
  key: string | symbol,
  index: number,
) => {
  const paramTypes = Reflect.getMetadata('design:paramtypes', target, key)
  const isPrimitiveOrCustom = !['RegExp', 'String', 'Function', 'Object', 'Array', 'Date'].includes(
    paramTypes[index].name,
  )
  const metadata = Reflect.getMetadata(MOONSHARD_PARAMS, target, key) || []
  metadata.unshift({
    index,
    type,
    path,
    ...(isPrimitiveOrCustom && { paramType: paramTypes[index] }),
  })
  Reflect.defineMetadata(MOONSHARD_PARAMS, metadata, target, key)
}

export const getStatusByMethod = (method: string) => {
  switch (method) {
    case RequestMethod.POST:
      return 201
    case RequestMethod.PATCH:
    case RequestMethod.PUT:
    case RequestMethod.DELETE:
      return 204
    default:
      return 200
  }
}

export const injectParams = ({ paramsMetadata, request, reply }) => {
  const params: any[] = []
  for (const param of paramsMetadata) {
    const { type, path, paramType } = param
    switch (param.type) {
      case RouteParamtypes.REPLY:
        params.push(reply)
        break
      case RouteParamtypes.REQUEST:
        params.push(param.path ? request[path] : request)
        break
      case RouteParamtypes.BODY:
      case RouteParamtypes.QUERY:
      case RouteParamtypes.PARAM:
        let value = param.path ? request[type][path] : request[type]
        if (paramType) {
          if (paramType.name === 'Number') {
            value = castToNumber(value)
          } else if (paramType.name === 'Boolean') {
            value = castToBoolean(value)
          } else {
            try {
              value = transformAndValidateSync(paramType, value)
            } catch (errors) {
              throw new BadRequestError(errors)
            }
          }
        }
        params.push(value)
        break
      case RouteParamtypes.HEADERS:
        params.push(param.path ? request[type][path] : request[type])
        break
    }
  }
  return params
}
