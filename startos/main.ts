import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  appSub,
  discourseEnv,
  getSmtpCredentials,
  postgresEnv,
  postgresSub,
  prepareAppCommand,
  requireSecrets,
  toHostAndPort,
  uiPort,
  valkeySub,
  POSTGRES_USER,
} from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Discourse'))

  // A projection, never the whole store: setAdminPassword writes `adminEmail`,
  // and a .const() spanning it would restart Discourse the moment the user
  // creates their account.
  const store = await storeJson
    .read((s) => ({
      postgresPassword: s.postgresPassword,
      secretKeyBase: s.secretKeyBase,
      primaryUrl: s.primaryUrl,
      smtp: s.smtp,
      unicornWorkers: s.unicornWorkers,
    }))
    .const(effects)
  if (!store) throw new Error('store.json not found')
  if (!store.primaryUrl) {
    throw new Error(
      'Discourse has no primary URL. Run the Set Primary URL action.',
    )
  }

  const secrets = requireSecrets(store)
  const smtp = await getSmtpCredentials(effects, store.smtp)
  const { hostname, port } = toHostAndPort(store.primaryUrl)
  const env = discourseEnv({
    hostname,
    port,
    secrets,
    smtp,
    unicornWorkers: store.unicornWorkers,
    runOnBoot: false,
  })

  const pg = postgresSub(effects)
  const valkey = valkeySub(effects)
  const app = appSub(effects)

  return sdk.Daemons.of(effects)
    .addDaemon('postgres', {
      subcontainer: pg,
      exec: {
        command: sdk.useEntrypoint(['-c', 'listen_addresses=127.0.0.1']),
        env: postgresEnv(secrets.postgresPassword),
      },
      ready: {
        display: null,
        fn: async () => {
          const { exitCode } = await pg.exec([
            'pg_isready',
            '-U',
            POSTGRES_USER,
          ])
          return exitCode === 0
            ? { result: 'success', message: null }
            : { result: 'loading', message: null }
        },
      },
      requires: [],
    })
    .addDaemon('valkey', {
      subcontainer: valkey,
      exec: { command: sdk.useEntrypoint() },
      ready: {
        display: null,
        fn: async () => {
          const res = await valkey.exec(['valkey-cli', 'ping'])
          return res.stdout.toString().trim() === 'PONG'
            ? { result: 'success', message: null }
            : { result: 'loading', message: null }
        },
      },
      requires: [],
    })
    .addOneshot('prepare-app', {
      subcontainer: app,
      exec: { command: prepareAppCommand(), user: 'root' },
      requires: [],
    })
    .addDaemon('discourse', {
      subcontainer: app,
      exec: { command: sdk.useEntrypoint(), runAsInit: true, env },
      ready: {
        display: i18n('Web Interface'),
        gracePeriod: 180_000,
        fn: async () => {
          try {
            const res = await fetch(`http://127.0.0.1:${uiPort}/srv/status`)
            return res.ok
              ? { result: 'success', message: i18n('The forum is ready') }
              : {
                  result: 'loading',
                  message: i18n('Waiting for the application server'),
                }
          } catch {
            return {
              result: 'loading',
              message: i18n('Waiting for the application server'),
            }
          }
        },
      },
      requires: ['postgres', 'valkey', 'prepare-app'],
    })
    .addHealthCheck('email', {
      ready: {
        display: i18n('Email'),
        fn: async () =>
          smtp
            ? {
                result: 'success',
                message: i18n('Email is configured'),
              }
            : {
                result: 'disabled',
                message: i18n(
                  'Without email, nobody can sign up or reset a password. Use the Configure SMTP action to enable it.',
                ),
              },
      },
      requires: ['discourse'],
    })
})
