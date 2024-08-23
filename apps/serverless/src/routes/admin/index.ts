import { add_admin } from './add_admin'
import { add_member } from './add_member'
import { remove_admin } from './remove_admin'
import { remove_member } from './remove_member'
import { OpenAPIHono } from '@hono/zod-openapi'
import { bearerAuth } from 'hono/bearer-auth'

const admin = new OpenAPIHono()

admin.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
})

admin
  .use('/admin/*', bearerAuth({ verifyToken: (token, context) => token === context.env.AUTH_TOKEN }))
  .route('/admin', add_member)
  .route('/admin', remove_member)
  .route('/admin', add_admin)
  .route('/admin', remove_admin)

export { admin }
