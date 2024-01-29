import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import request from 'supertest'

import { app } from '../src/app'

describe('Transaction router', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .set('Cookie', 'sessionId=466d893f-1845-44b3-b10f-93b1c265ed7e')
      .send({
        title: 'New transactionsh',
        amount: 4545,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list a new transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transactionsh liste',
        amount: 4550,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transaction).toEqual([
      expect.objectContaining({
        title: 'New transactionsh liste',
        amount: 4550,
      }),
    ])
  })
})
