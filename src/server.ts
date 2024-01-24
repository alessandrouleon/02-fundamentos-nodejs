import fastify from 'fastify'
import crypton from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/help', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypton.randomUUID(),
      title: 'Transaction de teste',
      amount: 1000,
      session_id: crypton.randomUUID(),
    })
    .returning('*')
  return transaction
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Http Serve Rumning ')
  })
