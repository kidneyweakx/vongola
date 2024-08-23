import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { admin, api } from './routes'

function main() {
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

  app.get('/docs', swaggerUI({ url: openapi_documentation_route }))
  // app.use(cors())
  app.use(prettyJSON())
  app.route('/', admin)
  app.route('/', api)

  return app
}

export default main()