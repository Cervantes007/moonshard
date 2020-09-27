import { buildParamDecorator, buildParamDecoratorWithParamType } from '../utils/utils'
import { RouteParamtypes } from '../enums/route-paramtypes.enum'

export const Reply = buildParamDecorator(RouteParamtypes.REPLY)
export const Request = buildParamDecorator(RouteParamtypes.REQUEST)
export const Body = buildParamDecoratorWithParamType(RouteParamtypes.BODY)
export const Param = buildParamDecoratorWithParamType(RouteParamtypes.PARAM)
export const Query = buildParamDecoratorWithParamType(RouteParamtypes.QUERY)
export const Headers = buildParamDecorator(RouteParamtypes.HEADERS)
