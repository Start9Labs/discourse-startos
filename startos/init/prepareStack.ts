import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import {
  appSub,
  discourseEnv,
  EXTENSIONS_SQL,
  POSTGRES_USER,
  postgresEnv,
  postgresSub,
  precompileCommand,
  prepareAppCommand,
  psqlCommand,
  rakeCommand,
  requireSecrets,
  toHostAndPort,
  valkeySub,
} from '../utils'

/**
 * Bring the database schema and the compiled assets up to the shipped image, on
 * install, update and restore. `main` starts the app with `MIGRATE_ON_BOOT` and
 * `PRECOMPILE_ON_BOOT` off and relies on this having run: a failure here fails
 * the transition and StartOS rolls the volumes back, where the same failure
 * inside the daemon would only crash-loop unicorn.
 */
export const prepareStack = sdk.setupOnInit(async (effects, kind, progress) => {
  if (!kind) return

  const store = await storeJson.read().once()
  if (!store) throw new Error('store.json not found')

  const secrets = requireSecrets(store)
  const env = discourseEnv({
    ...(store.primaryUrl
      ? toHostAndPort(store.primaryUrl)
      : { hostname: 'localhost', port: '' }),
    secrets,
    smtp: null,
    unicornWorkers: store.unicornWorkers,
    runOnBoot: false,
  })

  const pg = postgresSub(effects, 'init-postgres')
  const valkey = valkeySub(effects, 'init-valkey')
  const app = appSub(effects, 'init-discourse')

  const migratePhase = progress.addPhase(i18n('Migrating the database'), 1)
  const assetPhase = progress.addPhase(i18n('Compiling assets'), 3)

  await sdk.Daemons.of(effects)
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
    .addOneshot('create-extensions', {
      subcontainer: pg,
      exec: { command: psqlCommand(EXTENSIONS_SQL), user: 'postgres' },
      requires: ['postgres'],
    })
    .addOneshot('migrate', {
      subcontainer: app,
      exec: {
        fn: async () => {
          migratePhase.start()
          await app.execFail(rakeCommand('db:migrate'), { env }, null)
          migratePhase.complete()
          return null
        },
      },
      requires: ['create-extensions', 'valkey', 'prepare-app'],
    })
    .addOneshot('precompile', {
      subcontainer: app,
      exec: {
        fn: async () => {
          assetPhase.start()
          await app.execFail(
            precompileCommand(),
            { env: { ...env, SKIP_EMBER_CLI_COMPILE: '1' } },
            null,
          )
          assetPhase.complete()
          return null
        },
      },
      requires: ['migrate'],
    })
    .runUntilSuccess(900_000)
})
