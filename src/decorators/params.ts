import { buildParamDecorator } from '../utils/utils'
import { RouteParamtypes } from '../enums/route-paramtypes.enum'

export const Reply = buildParamDecorator(RouteParamtypes.REPLY)
export const Request = buildParamDecorator(RouteParamtypes.REQUEST)
export const Body = buildParamDecorator(RouteParamtypes.BODY)
export const Param = buildParamDecorator(RouteParamtypes.PARAM)
export const Query = buildParamDecorator(RouteParamtypes.QUERY)
export const Headers = buildParamDecorator(RouteParamtypes.HEADERS)
