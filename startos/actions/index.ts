import { primaryUrl } from '../primaryUrl'
import { sdk } from '../sdk'
import { configureSmtp } from './configureSmtp'
import { setAdminPassword } from './setAdminPassword'
import { setWorkerCount } from './setWorkerCount'

export const actions = sdk.Actions.of()
  .addAction(setAdminPassword)
  .addAction(primaryUrl.action)
  .addAction(configureSmtp)
  .addAction(setWorkerCount)
