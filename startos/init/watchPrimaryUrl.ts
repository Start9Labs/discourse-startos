import { setPrimaryUrl } from '../actions/setPrimaryUrl'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getNonLocalUrls } from '../utils'

export const watchPrimaryUrl = sdk.setupOnInit(async (effects) => {
  const available = await getNonLocalUrls(effects)
  const url = await storeJson.read((s) => s.primaryUrl).const(effects)

  if (url && available.includes(url)) return

  const fallback = url ? undefined : available.find((u) => u.includes('.local'))
  if (fallback) {
    await storeJson.merge(
      effects,
      { primaryUrl: fallback },
      { allowWriteAfterConst: true },
    )
    return
  }

  await sdk.action.createOwnTask(effects, setPrimaryUrl, 'critical', {
    reason: i18n(
      'Discourse cannot start without a primary URL. Choose one that is still available.',
    ),
  })
})
