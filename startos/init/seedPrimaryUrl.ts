import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { getNonLocalUrls } from '../utils'

export const seedPrimaryUrl = sdk.setupOnInit(async (effects) => {
  if (await storeJson.read((s) => s.primaryUrl).const(effects)) return

  const local = (await getNonLocalUrls(effects)).find((u) =>
    u.includes('.local'),
  )
  if (local) {
    await storeJson.merge(
      effects,
      { primaryUrl: local },
      { allowWriteAfterConst: true },
    )
  }
})
