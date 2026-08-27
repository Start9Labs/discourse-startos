import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getNonLocalUrls } from '../utils'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  url: Value.dynamicSelect(async ({ effects }) => ({
    name: i18n('URL'),
    values: (await getNonLocalUrls(effects)).reduce(
      (obj, url) => ({ ...obj, [url]: url }),
      {} as Record<string, string>,
    ),
    default: '',
  })),
})

export const setPrimaryUrl = sdk.Action.withInput(
  'set-primary-url',

  async () => ({
    name: i18n('Set Primary URL'),
    description: i18n(
      'Choose the address Discourse treats as its own. Every absolute link it writes — email notifications, invites, password resets, social previews — is built from this, so it should be the address people actually use. Discourse restarts to apply the change.',
    ),
    warning: i18n(
      'Links already written into existing posts keep the old address. Discourse ships a remap command for rewriting them.',
    ),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async () => ({
    url: (await storeJson.read((s) => s.primaryUrl).once()) || undefined,
  }),

  async ({ effects, input }) =>
    storeJson.merge(effects, { primaryUrl: input.url }),
)
