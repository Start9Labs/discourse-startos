import { actions } from '../actions'
import { restoreInit } from '../backups'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { sdk } from '../sdk'
import { versionGraph } from '../versions'
import { prepareStack } from './prepareStack'
import { seedStore } from './seedStore'
import { watchAdmin } from './watchAdmin'
import { watchPrimaryUrl } from './watchPrimaryUrl'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  setDependencies,
  actions,
  seedStore,
  watchPrimaryUrl,
  prepareStack,
  watchAdmin,
)

export const uninit = sdk.setupUninit(versionGraph)
