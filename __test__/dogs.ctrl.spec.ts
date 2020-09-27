import { inject } from '../src'

describe('Dogs Controller Test', () => {
  test('Dogs Crud', async () => {
    const dog = { name: 'Cerberus3', age: 14 }
    const response = await inject({
      method: 'POST',
      url: `/dogs`,
      payload: dog,
    })

    expect(response.statusCode).toBe(201)
    const dogObject = JSON.parse(response.body)
    expect(dogObject.insertedId).toBeDefined()

    const updateDog = { name: 'Lazzie3' }
    const updateResponse = await inject({
      method: 'PATCH',
      url: `/dogs/${dogObject.insertedId}`,
      payload: updateDog,
    })
    expect(updateResponse.statusCode).toBe(204)

    const responseGetById = await inject({
      method: 'GET',
      url: `/dogs/${dogObject.insertedId}`,
    })

    expect(responseGetById.statusCode).toBe(200)
    const dogGetById = JSON.parse(responseGetById.body)
    expect(dogGetById.name).toBe(updateDog.name)

    const responseDelete = await inject({
      method: 'DELETE',
      url: `/dogs/${dogObject.insertedId}`,
    })

    expect(responseDelete.statusCode).toBe(204)
  })
  test('Get dogs', async () => {
    const query = { limit: 10 }
    const response = await inject({
      method: 'GET',
      url: `/dogs?limit=${query.limit}`,
    })
    expect(response.statusCode).toBe(200)
  })
})
