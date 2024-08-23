import type { Bindings } from 'hono/types'
import { object, string } from 'zod'

export const get_config = (environment: Bindings | undefined) =>
  object({
    AUTH_TOKEN: string(),
  }).parse(environment)
