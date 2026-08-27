import { sdk } from '../sdk'
import { configureSmtp } from './configureSmtp'
import { setAdminPassword } from './setAdminPassword'
import { setPrimaryUrl } from './setPrimaryUrl'
import { setWorkerCount } from './setWorkerCount'

export const actions = sdk.Actions.of()
  .addAction(setAdminPassword)
  .addAction(setPrimaryUrl)
  .addAction(configureSmtp)
  .addAction(setWorkerCount)
