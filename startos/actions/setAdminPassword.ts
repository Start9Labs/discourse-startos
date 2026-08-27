import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import {
  appMounts,
  discourseEnv,
  railsRunnerCommand,
  requireSecrets,
  RUNNER_SCRIPT_PATH,
  toHostAndPort,
} from '../utils'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  email: Value.text({
    name: i18n('Email Address'),
    description: i18n(
      'The address this account signs in with. It does not have to be reachable — Discourse only sends to it once email is configured.',
    ),
    required: true,
    default: null,
    inputmode: 'email',
    patterns: [],
  }),
})

/**
 * Goes through Discourse's own User model, so the password is hashed the way a
 * sign-in verifies it and the email tokens are confirmed the way
 * `rake admin:create` confirms them.
 */
const CREATE_ADMIN = `
email = ENV.fetch('STARTOS_ADMIN_EMAIL')
password = ENV.fetch('STARTOS_ADMIN_PASSWORD')
user = User.find_by_email(email) || User.new(email: email, username: UserNameSuggester.suggest(email))
user.password = password
user.active = true
user.approved = true
user.save!
user.grant_admin! unless user.admin?
user.change_trust_level!(1) if user.trust_level < 1
user.email_tokens.update_all(confirmed: true)
user.activate
puts "STARTOS_USERNAME=#{user.username}"
`

export const setAdminPassword = sdk.Action.withInput(
  'set-admin-password',

  async () => ({
    name: i18n('Set Admin Password'),
    description: i18n(
      'Create the administrator account, or issue it a new password. Discourse itself gates sign-up behind an activation email, so on a server with no email configured this is the way in.',
    ),
    warning: null,
    allowedStatuses: 'only-running',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async () => ({
    email: (await storeJson.read((s) => s.adminEmail).once()) || undefined,
  }),

  async ({ effects, input }) => {
    const store = await storeJson.read().once()
    if (!store) throw new Error('store.json not found')
    const { primaryUrl } = store
    if (!primaryUrl) throw new Error('Discourse has no primary URL')

    const password = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 24,
    })

    const output = await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'discourse' },
      appMounts,
      'set-admin-password',
      async (sub) => {
        await sub.writeFile(RUNNER_SCRIPT_PATH, CREATE_ADMIN)
        const { stdout } = await sub.execFail(
          railsRunnerCommand(),
          {
            env: {
              ...discourseEnv({
                ...toHostAndPort(primaryUrl),
                secrets: requireSecrets(store),
                smtp: null,
                unicornWorkers: store.unicornWorkers,
                runOnBoot: false,
              }),
              STARTOS_ADMIN_EMAIL: input.email,
              STARTOS_ADMIN_PASSWORD: password,
            },
          },
          null,
        )
        return stdout.toString()
      },
    )

    const username = output.match(/^STARTOS_USERNAME=(.+)$/m)?.[1]?.trim()
    if (!username) {
      throw new Error(`Discourse did not report a username:\n${output}`)
    }

    await storeJson.merge(effects, { adminEmail: input.email })

    return {
      version: '1',
      title: i18n('Administrator Account'),
      message: i18n(
        'Sign in at the web interface with these credentials. The password is shown once — store it now.',
      ),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: username,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: i18n('Email Address'),
            description: null,
            value: input.email,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
