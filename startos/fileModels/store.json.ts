import { FileHelper, smtpShape, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.looseObject({
  postgresPassword: z.string().optional().catch(undefined),
  // Rails cookie and auth-token key. Absent, Discourse mints one into Redis, so
  // clearing the cache would sign every user out.
  secretKeyBase: z.string().optional().catch(undefined),
  primaryUrl: z.string().optional().catch(undefined),
  // Presence marks the admin account as created; the password itself is never stored.
  adminEmail: z.string().optional().catch(undefined),
  unicornWorkers: z.number().catch(1),
  smtp: smtpShape,
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.startos, subpath: './store.json' },
  shape,
)
