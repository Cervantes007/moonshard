import { start, close } from '../src'

beforeAll(async () => {
  await start(3000, { logger: false }, { pattern: 'api/**/*.@(ctrl|controller).ts' })
})

afterAll(async () => {
  await close()
})
