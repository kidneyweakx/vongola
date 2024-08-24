import { issue_did } from './issue_did'
import { OpenAPIHono } from '@hono/zod-openapi'


const api = new OpenAPIHono()

api
  .use('/api/*')
  .route('/api', issue_did)

export { api }
