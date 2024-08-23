import { add_data } from './add_data'
import { get_data } from './get_data'
import { remove_data } from './remove_data'
import { OpenAPIHono } from '@hono/zod-openapi'
import { bearerAuth } from 'hono/bearer-auth'

const api = new OpenAPIHono()

api
  .use('/api/*')
  .route('/api', add_data)
  .route('/api', remove_data)
  .route('/api', get_data)

export { api }
