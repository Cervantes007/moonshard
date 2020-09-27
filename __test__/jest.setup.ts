import { connect, close as closeDB } from 'm16'
import { start, close } from '../src'

beforeAll(async () => {
  await connect('mongodb://localhost:27017/moonshard')
  await start(3066, { logger: false }, { pattern: 'api/**/*.@(ctrl|controller).ts' })
})

afterAll(async () => {
  await close()
  await closeDB()
})
