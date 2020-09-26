import { HttpStatus } from '../enums'
import { HttpError } from './errors/http-error'

export function defaultErrorHandler(error, request, reply) {
  if (error instanceof HttpError && typeof error.getResponse === 'function') {
    const data = error.getResponse({ request, reply })
    return reply.code(data.code).send(data)
  }
  return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal Error Server' })
}
