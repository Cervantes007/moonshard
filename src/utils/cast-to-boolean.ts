import { BadRequestError } from './../error-handling/errors/bad-request-error'

export function castToBoolean(value: boolean | string): boolean {
  if (value === true || value === 'true') {
    return true
  }
  if (value === false || value === 'false') {
    return false
  }
  throw new BadRequestError('Validation failed (boolean string is expected)')
}
