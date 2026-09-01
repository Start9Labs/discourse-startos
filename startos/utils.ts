import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 80

export const uiHostId = 'ui-multi'
export const uiInterfaceId = 'ui'

export const POSTGRES_MOUNTPOINT = '/var/lib/postgresql'
export const POSTGRES_PGDATA_SUBPATH = '/18/docker'
export const POSTGRES_DB = 'discourse'
export const POSTGRES_USER = 'postgres'

export const SHARED_PATH = '/shared'
export const ASSETS_PATH = '/var/www/discourse/public/assets'
/**
 * `assets:precompile` builds the PrettyText bundle here, and in production
 * Discourse refuses to boot without it rather than building it on demand
 * (`lib/pretty_text.rb` — `core_bundle_source` raises). It lands outside
 * `public/assets`, so it needs a mount of its own or the daemon starts against
 * an empty `tmp/` and unicorn crash-loops.
 */
export const PRETTY_TEXT_PATH = '/var/www/discourse/tmp/pretty-text-processor'
export const VALKEY_PATH = '/data'
export const APP_HOME = '/var/www/discourse'

/** uid:gid the Discourse image's own processes run as, once runit drops privileges. */
export const APP_OWNER = 'discourse:www-data'

export function getNonLocalUrls(effects: T.Effects): Promise<string[]> {
  return sdk.host
    .getOwn(effects, uiHostId, (host) => {
      const iface =
        host &&
        Object.values(host.bindings)
          .flatMap((b) => Object.values(b.interfaces))
          .find((i) => i.id === uiInterfaceId)
      return iface ? iface.addressInfo.nonLocal.format() : []
    })
    .const()
}

/**
 * Split a StartOS address into the two settings Discourse builds absolute URLs
 * from. It takes a bare host, and carries the port separately — a `.local`
 * address is served on a per-service port, and a hostname alone would emit
 * links that resolve nowhere.
 */
export function toHostAndPort(url: string): { hostname: string; port: string } {
  const { hostname, port } = new URL(url)
  return { hostname, port }
}

export function postgresSub(effects: T.Effects, name = 'postgres') {
  return sdk.SubContainer.of(
    effects,
    { imageId: 'postgres' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'db',
      subpath: null,
      mountpoint: POSTGRES_MOUNTPOINT,
      readonly: false,
    }),
    name,
  )
}

export function valkeySub(effects: T.Effects, name = 'valkey') {
  return sdk.SubContainer.of(
    effects,
    { imageId: 'valkey' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'redis',
      subpath: null,
      mountpoint: VALKEY_PATH,
      readonly: false,
    }),
    name,
  )
}

export const appMounts = sdk.Mounts.of()
  .mountVolume({
    volumeId: 'shared',
    subpath: null,
    mountpoint: SHARED_PATH,
    readonly: false,
  })
  .mountVolume({
    volumeId: 'assets',
    subpath: 'public',
    mountpoint: ASSETS_PATH,
    readonly: false,
  })
  .mountVolume({
    volumeId: 'assets',
    subpath: 'pretty-text',
    mountpoint: PRETTY_TEXT_PATH,
    readonly: false,
  })

export function appSub(effects: T.Effects, name = 'discourse') {
  return sdk.SubContainer.of(effects, { imageId: 'discourse' }, appMounts, name)
}

export function postgresEnv(password: string) {
  return {
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD: password,
    POSTGRES_INITDB_ARGS: '--data-checksums',
  }
}

export type Secrets = { postgresPassword: string; secretKeyBase: string }

export function requireSecrets(store: {
  postgresPassword?: string
  secretKeyBase?: string
}): Secrets {
  if (!store.postgresPassword || !store.secretKeyBase) {
    throw new Error('Discourse secrets are missing from store.json')
  }
  return {
    postgresPassword: store.postgresPassword,
    secretKeyBase: store.secretKeyBase,
  }
}

/** Flatten the stored SMTP selection into the credentials Discourse takes. */
export async function getSmtpCredentials(
  effects: T.Effects,
  smtp: { selection: string; value: any } | null | undefined,
): Promise<T.SmtpValue | null> {
  if (!smtp || smtp.selection === 'disabled') return null

  if (smtp.selection === 'system') {
    const system = await sdk.getSystemSmtp(effects).const()
    if (!system) return null
    const customFrom = smtp.value?.customFrom as string | undefined
    return customFrom ? { ...system, from: customFrom } : system
  }

  const { host, from, username, password, security } = smtp.value.provider.value
  return {
    host,
    from,
    username,
    password: password ?? null,
    port: Number(security.value.port),
    security: security.selection,
  }
}

function smtpEnv(smtp: T.SmtpValue | null): Record<string, string> {
  if (!smtp) return { DISCOURSE_SKIP_EMAIL_SETUP: '1' }

  const env: Record<string, string> = {
    DISCOURSE_SMTP_ADDRESS: smtp.host,
    DISCOURSE_SMTP_PORT: String(smtp.port),
    DISCOURSE_SMTP_USER_NAME: smtp.username,
    DISCOURSE_NOTIFICATION_EMAIL: smtp.from,
    DISCOURSE_SMTP_ENABLE_START_TLS: String(smtp.security === 'starttls'),
    DISCOURSE_SMTP_FORCE_TLS: String(smtp.security === 'tls'),
  }
  if (smtp.password) env.DISCOURSE_SMTP_PASSWORD = smtp.password
  return env
}

export type DiscourseEnvArgs = {
  hostname: string
  port: string
  secrets: Secrets
  smtp: T.SmtpValue | null
  unicornWorkers: number
  /** Boot-time `rake db:migrate` / `assets:precompile`; init owns both, so `main` turns them off. */
  runOnBoot: boolean
}

export function discourseEnv({
  hostname,
  port,
  secrets,
  smtp,
  unicornWorkers,
  runOnBoot,
}: DiscourseEnvArgs): Record<string, string> {
  return {
    DISCOURSE_HOSTNAME: hostname,
    ...(port ? { DISCOURSE_PORT: port } : {}),
    // Empty forces TCP; the image otherwise looks for a local unix socket.
    DISCOURSE_DB_SOCKET: '',
    DISCOURSE_DB_HOST: '127.0.0.1',
    DISCOURSE_DB_PORT: '5432',
    DISCOURSE_DB_NAME: POSTGRES_DB,
    DISCOURSE_DB_USERNAME: POSTGRES_USER,
    DISCOURSE_DB_PASSWORD: secrets.postgresPassword,
    DISCOURSE_REDIS_HOST: '127.0.0.1',
    DISCOURSE_REDIS_PORT: '6379',
    DISCOURSE_SECRET_KEY_BASE: secrets.secretKeyBase,
    // A DISCOURSE_ var shadows the site setting of the same name and hides it
    // from the admin UI, so only settings the package owns belong here.
    DISCOURSE_FORCE_HTTPS: 'true',
    DISCOURSE_VERSION_CHECKS: 'false',
    DISCOURSE_REFRESH_MAXMIND_DB_DURING_PRECOMPILE_DAYS: '0',
    MIGRATE_ON_BOOT: runOnBoot ? '1' : '0',
    PRECOMPILE_ON_BOOT: runOnBoot ? '1' : '0',
    UNICORN_WORKERS: String(unicornWorkers),
    UNICORN_SIDEKIQS: '1',
    ...smtpEnv(smtp),
  }
}

/**
 * Bring a freshly created app subcontainer to the state the daemons expect.
 *
 * `00-ensure-links` is the image's own script for populating `/shared`, which
 * the entrypoint runs and a bare `exec` does not: without it `public/uploads`
 * and `log/production.log` are symlinks onto nothing, and `rake db:migrate`
 * dies writing the site icon.
 */
export function prepareAppCommand(): [string, ...string[]] {
  return [
    'sh',
    '-c',
    [
      '/etc/runit/1.d/00-ensure-links',
      `chown -R ${APP_OWNER} ${SHARED_PATH} ${ASSETS_PATH} ${PRETTY_TEXT_PATH}`,
      `rm -rf ${APP_HOME}/plugins/docker_manager`,
    ].join(' && '),
  ]
}

/**
 * Run a rake task with the package's settings in force. `copy-env` is the
 * image's own translation of `DISCOURSE_*` into `config/discourse.conf`, which
 * the entrypoint runs at boot and a bare `exec` does not.
 */
export function rakeCommand(task: string): [string, ...string[]] {
  return ['sh', '-c', `/etc/runit/1.d/copy-env && rake ${task}`]
}

export const RUNNER_SCRIPT_PATH = '/tmp/startos-runner.rb'

export function railsRunnerCommand(): [string, ...string[]] {
  return [
    'sh',
    '-c',
    `/etc/runit/1.d/copy-env && rails runner ${RUNNER_SCRIPT_PATH}`,
  ]
}

/**
 * Discards the previous version's compiled output first: the volume outlives
 * the image, and propshaft leaves what it no longer emits behind.
 */
export function precompileCommand(): [string, ...string[]] {
  return [
    'sh',
    '-c',
    `find ${ASSETS_PATH} ${PRETTY_TEXT_PATH} -mindepth 1 -delete && /etc/runit/1.d/copy-env && rake assets:precompile`,
  ]
}

/** Extensions Discourse's own migrations expect to already exist. */
export const EXTENSIONS_SQL = ['hstore', 'pg_trgm', 'unaccent', 'vector']
  .map((e) => `CREATE EXTENSION IF NOT EXISTS ${e};`)
  .join(' ')

export function psqlCommand(sql: string): [string, ...string[]] {
  return ['psql', '-U', POSTGRES_USER, '-d', POSTGRES_DB, '-c', sql]
}
