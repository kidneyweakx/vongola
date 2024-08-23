import type { HonoContext } from '../../types'
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

const QuerySchema = z.object({
  key: z.string(),
})

const ResponseSchema = z.object({
  data: z.string(),
})

const route = createRoute({
  method: 'get',
  path: '/get_data',
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

export const get_data = new OpenAPIHono<HonoContext>().openapi(route, async (context) => {
  const key = context.req.query('key') as string

  const data = await context.env.didAppkv.get(key) as string
  return context.json({ data: data })
})
