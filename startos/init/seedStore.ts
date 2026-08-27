import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const seedStore = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') {
    await storeJson.merge(effects, {})
    return
  }

  await storeJson.merge(effects, {
    postgresPassword: utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 24,
    }),
    // Discourse rejects anything but 128 lowercase hex characters.
    secretKeyBase: utils.getDefaultString({ charset: '0-9,a-f', len: 128 }),
  })
})
