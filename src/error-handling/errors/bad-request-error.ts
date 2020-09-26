import { HttpStatus } from './../../enums/http-status.enum'
import { HttpError } from './http-error'

export class BadRequestError extends HttpError {
  constructor(message: string, error = 'Bad Request', code = HttpStatus.BAD_REQUEST) {
    super({ code, error, message })
  }
}
