import { HttpStatus } from './../../enums/http-status.enum'

interface IHttpError {
  error?: string
  code?: number
  message?: string | Record<string, any> | any
}

interface IHttpErrorStatics {
  timestamp?: string
  path?: string
}

interface IGetResponseParams {
  reply?: any
  request?: any
}

export abstract class HttpError extends Error {
  public readonly code
  public readonly error

  constructor(
    { error, code, message }: IHttpError = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: '',
    },
  ) {
    super()
    this.code = code
    this.error = error
    this.message = message
  }

  getResponse({ request }: IGetResponseParams = {}): IHttpError & IHttpErrorStatics {
    return {
      code: this.code,
      error: this.error,
      ['message']: this.message || undefined,
      timestamp: new Date().toISOString(),
      ['path']: request ? request.url : undefined,
    }
  }
}
