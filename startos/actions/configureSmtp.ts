import { smtpPrefill } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec } = sdk

const inputSpec = InputSpec.of({
  smtp: sdk.inputSpecConstants.smtpInputSpec,
})

export const configureSmtp = sdk.Action.withInput(
  'configure-smtp',

  async () => ({
    name: i18n('Configure SMTP'),
    description: i18n(
      'Give Discourse an outbound mail server. Sign-up activation, password resets, invites and notification digests all depend on it — without one, only accounts created from StartOS can sign in. Discourse restarts to apply the change.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => {
    const smtp = await storeJson.read((s) => s.smtp).const(effects)
    if (!smtp || smtp.selection === 'disabled') return {}
    return { smtp: smtpPrefill(smtp) }
  },

  async ({ effects, input }) => storeJson.merge(effects, { smtp: input.smtp }),
)
