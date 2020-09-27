import { BadRequestError } from './../error-handling/errors/bad-request-error'

export function castToNumber(value: string | number): number {
  const isNumeric =
    ['string', 'number'].includes(typeof value) &&
    !isNaN(parseFloat(value as string)) &&
    isFinite(value as number)
  if (!isNumeric) {
    throw new BadRequestError('Validation failed (numeric string is expected)')
  }
  return parseFloat(value as string)
}

export function castToInt(value: number | string): number {
  const isNumeric =
    ['string', 'number'].includes(typeof value) &&
    !isNaN(parseFloat(value as string)) &&
    isFinite(value as number)
  if (!isNumeric) {
    throw new BadRequestError('Validation failed (numeric string is expected)')
  }
  return parseInt(value as string, 10)
}
