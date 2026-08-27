import { setAdminPassword } from '../actions/setAdminPassword'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const watchAdmin = sdk.setupOnInit(async (effects) => {
  const adminEmail = await storeJson.read((s) => s.adminEmail).const(effects)

  if (!adminEmail) {
    await sdk.action.createOwnTask(effects, setAdminPassword, 'important', {
      reason: i18n(
        'Create the administrator account before anyone signs up, so the forum is not claimed by the first visitor.',
      ),
    })
  }
})
