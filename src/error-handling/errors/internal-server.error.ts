import { HttpStatus } from './../../enums/http-status.enum'
import { HttpError } from './http-error'

export class InternalServerError extends HttpError {
  constructor(message: string, error = 'Internal Server Error', code = HttpStatus.INTERNAL_SERVER_ERROR) {
    super({ code, error, message })
  }
}
