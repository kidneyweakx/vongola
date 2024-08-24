import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { agent } from '../../lib/did-agent'

const QuerySchema = z.object({
})

const ResponseSchema = z.object({
  message: z.string(),
})

const ResponseErrorSchema = z.object({
  error: z.literal('Invalid data!'),
})

const route = createRoute({
  method: 'get',
  path: '/issue_did',
  request: { query: QuerySchema },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ResponseSchema,
          example: {
            message: 'Successfully added admin to the list of admins!',
          },
        },
      },
      description: 'The response when a user has been successfully added.',
    },
    401: {
      content: {
        'text/plain': { schema: z.literal('Unauthorized') },
      },
      description: 'The response when the request is unauthorized.',
    },
    500: {
      content: {
        'application/json': { schema: ResponseErrorSchema },
      },
      description: 'The response when a user cannot be added.',
    },
  },
})

export const issue_did = new OpenAPIHono<any>().openapi(route, async (context) => {
  const identifier = await agent.didManagerCreate({ alias: 'default' })
  console.log(`New identifier created`)
  return context.json({ message: `Successfully added ${JSON.stringify(identifier, null, 2)} !` }, 200)
})
