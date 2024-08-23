import type { HonoContext } from '../../types'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

const QuerySchema = z.object({
  member: z.string(),
  key: z.string(),
})

const ResponseSchema = z.object({
  message: z.string(),
})

const route = createRoute({
  method: 'post',
  path: '/remove_data',
  request: { query: QuerySchema },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ResponseSchema,
          example: {
            message: 'admin has been removed from the list of admins!',
          },
        },
      },
      description: 'The response when the admin has been successfully removed.',
    },
    401: {
      content: {
        'text/plain': { schema: z.literal('Unauthorized') },
      },
      description: 'The response when the request is unauthorized.',
    },
  },
})

export const remove_data = new OpenAPIHono<HonoContext>().openapi(route, async (context) => {
  const members = await context.env.didAppkv.get('members', 'text')
  const member = context.req.query('member') as string
  if (!members?.includes(member)) {
    return context.json({ error: 'Unauthorized' } as const, 401)
  }

  const key = context.req.query('key') as string

  await context.env.didAppkv.put(key, '')
  return context.json({ message: `data has been removed from the ${key}!` })
})
