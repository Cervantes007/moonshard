import { inject } from '../src'

describe('Cats Controller Test', () => {
  test('Get cats', async () => {
    const query = { limit: 10 }
    const response = await inject({
      method: 'GET',
      url: `/cats?limit=${query.limit}`,
    })
    expect(response.statusCode).toBe(200)
    expect(response.payload).toBe(`This action returns all cats (limit: ${query.limit} items)`)
  })

  test('Get cats by id', async () => {
    const id = 1
    const response = await inject({
      method: 'GET',
      url: `/cats/${1}`,
    })
    expect(response.statusCode).toBe(200)
    expect(response.payload).toBe(`This action returns a #${id} cat`)
  })

  test('Get cat by name', async () => {
    const cat = { name: 'figaro' }
    const response = await inject({
      method: 'GET',
      url: `/cats/name/${cat.name}`,
    })

    expect(response.statusCode).toBe(200)
    expect(response.payload).toBe(`This action returns cat by name ${cat.name}`)
  })

  test('Post cat', async () => {
    const cat = { name: 'Figaro' }
    const response = await inject({
      method: 'POST',
      url: `/cats`,
      payload: cat,
    })

    expect(response.statusCode).toBe(200)
    expect(response.payload).toBe(`This action adds a new cat ${cat.name}`)
  })
})
