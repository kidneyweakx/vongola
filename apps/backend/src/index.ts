import { swaggerUI } from '@hono/swagger-ui'
import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { prettyJSON } from 'hono/pretty-json'
import { api } from './routes'

import { cors } from 'hono/cors'

const openapi_documentation_route = '/openapi.json'
const app = new OpenAPIHono().doc(openapi_documentation_route, {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'worker',
  },
})

app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))
  .get('/docs', swaggerUI({ url: openapi_documentation_route }))
  .use(prettyJSON())
  .route('/', api)

const port = 8081
console.log(`Server is running on port ${port}, open http://localhost:${port}/docs to see the documentation`)

serve({
  fetch: app.fetch,
  port
})
