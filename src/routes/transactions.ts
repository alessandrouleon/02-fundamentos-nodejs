import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies

    const transaction = await knex('transactions')
      .where('session_id', sessionId)
      .select()
    return { transaction }
  })

  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (request) => {
    const findById = z.object({
      id: z.string().uuid(),
    })

    const { sessionId } = request.cookies
    const { id } = findById.parse(request.params)

    const transaction = await knex('transactions')
      .where({ session_id: sessionId, id })
      .first()
    return { transaction }
  })

  app.get(
    '/sumary',
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where({ session_id: sessionId })
        .sum('amount', { as: 'amount' })
        .first()
      return { summary }
    },
  )

  app.post(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const createTransactionBodySchema = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(['credit', 'debit']),
      })

      const { title, amount, type } = createTransactionBodySchema.parse(
        request.body,
      )
      let sessionId = request.cookies.sessionId

      if (!sessionId) {
        sessionId = randomUUID()

        reply.setCookie('sessionId', sessionId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })
      }

      await knex('transactions').insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId,
      })

      return reply.status(201).send()
    },
  )
}
