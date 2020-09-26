import { start } from '../src'

test('Start app', async () => {
  try {
    await start(3066)
  } catch (e) {
    expect(e.code).toBe('FST_ERR_REOPENED_SERVER')
  }
})
