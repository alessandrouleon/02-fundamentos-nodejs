import { expect, test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

import { app } from '../src/app'

beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
})

test('O usuario consegue criar uma transação', async () => {
    await request(app.server)
        .post('/transactions')
        .send({
            title: 'New transactionsh',
            amount: 4545,
            type: 'credit'
        })
        .expect(201)
})