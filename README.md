<p align="center">
  <img src="icon.svg" alt="Discourse Logo" width="21%">
</p>

# Discourse on StartOS

> Everything not listed in this document should behave the same as upstream
> Discourse. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[Discourse](https://github.com/discourse/discourse) is a Ruby on Rails forum platform. This package runs the upstream web-only image against a PostgreSQL and a Valkey sidecar, and owns the schema migration and asset compilation that upstream's boot script would otherwise run on every start.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

Three unmodified upstream images, all `x86_64` and `aarch64`. Nothing is built from a Dockerfile.

| Image                  | Subcontainer | Role                                                       |
| ---------------------- | ------------ | ---------------------------------------------------------- |
| `discourse/discourse`  | `discourse`  | nginx, unicorn and sidekiq, supervised by runit             |
| `pgvector/pgvector`    | `postgres`   | the database                                                |
| `valkey/valkey`        | `valkey`     | cache, sidekiq's job queue, and message-bus backlog         |

The Discourse image's command is `/sbin/boot`, which starts runit, so the daemon sets `runAsInit: true`. Its processes drop to `discourse:www-data` (uid 1000, gid 33) once runit is up.

A `prepare-app` oneshot runs ahead of the daemon and does three things: invokes the image's own `/etc/runit/1.d/00-ensure-links` to populate `/shared`, chowns the volumes StartOS mounted root-owned, and deletes the `docker_manager` plugin. The first matters most outside the daemon — the entrypoint runs that script and a bare `exec` does not, so in the init chain `public/uploads` and `log/production.log` would be symlinks onto nothing and `rake db:migrate` would die writing the site icon.

Postgres must carry pgvector: Discourse's core migrations need `hstore`, `pg_trgm` and `unaccent`, and the `discourse-ai` plugin that ships inside the image adds `vector`. Stock `postgres` cannot satisfy it. The major version must also match the `postgresql-client` inside the Discourse image.

`init` runs a second, short-lived copy of the same three subcontainers — `init-postgres`, `init-valkey`, `init-discourse` — see [Installation and First-Run Flow](#installation-and-first-run-flow).

## Volume and Data Layout

Five volumes. Only two of them hold anything the user would miss.

| Volume    | Mount point                            | Contents                                                         |
| --------- | -------------------------------------- | ---------------------------------------------------------------- |
| `startos` | —                                      | `store.json`                                                     |
| `shared`  | `/shared`                              | uploads, Discourse's own export archives, Rails logs, spool state |
| `db`      | `/var/lib/postgresql`                  | PostgreSQL cluster (`PGDATA` is `/18/docker` inside it)          |
| `redis`   | `/data`                                | Valkey RDB snapshots — the sidekiq job queue                     |
| `assets`  | `public/assets` + `tmp/pretty-text-processor` | compiled CSS and JavaScript, and the PrettyText bundle     |

`/shared` is the single application data path: `public/uploads`, `public/backups`, `log/*.log` and `tmp/{backups,restores}` are all symlinks into it inside the image.

The `assets` volume is mounted twice, at two subpaths, because `assets:precompile` writes to two places. Neither exists in the image, so neither mount shadows anything, and both are wiped and rebuilt on every install, update and restore.

`tmp/pretty-text-processor` is the one that is easy to miss. Discourse refuses to boot in production when it is absent rather than building it on demand (`lib/pretty_text.rb` — `core_bundle_source` raises), and `tmp/` is otherwise container-ephemeral, so without its own mount the daemon starts against an empty directory and unicorn crash-loops. `tmp/asset-processor`, the other precompiled bundle, ships baked into the image and needs no mount.

## File Models

One model, `store.json` on the `startos` volume. It holds StartOS-side state only; Discourse's own configuration is delivered by environment variable.

| Key                | Written by                             | Survives a hand edit                                 |
| ------------------ | -------------------------------------- | ---------------------------------------------------- |
| `postgresPassword` | init, on install                       | yes, but the database will no longer accept it       |
| `secretKeyBase`    | init, on install                       | yes — changing it signs out every session            |
| `primaryUrl`       | `set-primary-url`, or init's fallback  | yes                                                  |
| `adminEmail`       | `set-admin-password`                   | yes; clearing it re-raises the task                  |
| `unicornWorkers`   | `set-worker-count`                     | yes                                                  |
| `smtp`             | `configure-smtp`                       | yes                                                  |

Nothing re-asserts these on start; each is written once by its action and read thereafter.

Discourse itself is configured entirely through `DISCOURSE_*` environment variables. The image's `/etc/runit/1.d/copy-env` translates them into `config/discourse.conf` at boot, and Discourse re-reads that file on every launch — so a change to any of them takes effect on the next start, not later.

**A `DISCOURSE_*` variable whose name matches a site setting shadows that setting and hides it from the admin panel.** The package uses this deliberately for four: `force_https` (StartOS terminates TLS, so Discourse must write `https://` links), `version_checks` (the update nag is meaningless when updates come from the marketplace), the MaxMind refresh interval (precompile would otherwise reach out to maxmind.com), and `port`. Every other site setting stays the administrator's.

`port` is the one that is easy to miss. `DISCOURSE_HOSTNAME` carries a bare host, and a StartOS `.local` address is served on a per-service port — so hostname alone produces links to `https://server.local/…`, which resolves nowhere. The primary URL is split into both settings, and `port` is omitted when the chosen address uses the default, as a public domain does.

## Dependencies

None.

## Network Access and Interfaces

| Interface | Type | Container port | Serves                                     |
| --------- | ---- | -------------- | ------------------------------------------ |
| `ui`      | `ui` | 80             | the forum and, at `/admin`, the admin panel |

nginx inside the image accepts any `Host`; Discourse's own `EnforceHostname` middleware rewrites an unrecognized one to the configured primary hostname, so the forum answers on every address StartOS gives it.

The binding takes the SDK default for `protocol: 'http'`, which sets `addXForwardedHeaders`. Rails therefore sees `X-Forwarded-Proto: https` and treats the request as secure.

## Installation and First-Run Flow

`rake db:migrate` and `rake assets:precompile` are the package's responsibility, not the daemon's — `MIGRATE_ON_BOOT` and `PRECOMPILE_ON_BOOT` are both `0` in the daemon's environment. Instead a `setupOnInit` handler guarded on `kind` runs them on install, update and restore (never on a plain container rebuild) using `runUntilSuccess` over a throwaway postgres/valkey/discourse chain, reporting two progress phases. A failure there fails the transition and StartOS restores the volumes, where the same failure inside the daemon would leave runit crash-looping unicorn indefinitely.

That pass takes roughly 40 seconds on a fresh install. Ordinary restarts skip it and reach a serving state in about 15.

The same handler creates the four PostgreSQL extensions and, before compiling, deletes the previous version's assets — the volume outlives the image, and propshaft does not remove what it no longer emits.

`init` picks the `.local` address as the primary URL when none is stored, so a fresh install starts without waiting for the user. Discourse's image refuses to boot at all without `DISCOURSE_HOSTNAME` (`/etc/runit/1.d/install-ssl` exits non-zero, and `/etc/runit/1` runs its scripts with `--exit-on-error`), which is why the task raised when no address is available is `critical`.

The administrator account is created by an action, not by Discourse's sign-up flow — see [Actions](#actions).

## Actions

All four are user-facing; none are hidden. Each writes to `store.json` and nothing else, except `set-admin-password`, which writes to the database.

**`set-admin-password`** — creates the administrator account or re-issues its password. Runs `rails runner` in a temporary Discourse subcontainer against the live database, going through Discourse's own `User` model so the password is hashed the way sign-in verifies it and the email tokens are confirmed the way `rake admin:create` confirms them. Takes 20–40 seconds (a full Rails boot). Safe to repeat: it finds the existing user by email and resets the password. The password is returned to the caller and never stored. Requires the service running.

**`set-primary-url`** — sets `DISCOURSE_HOSTNAME` from the chosen address. Restarts Discourse. Repeat-safe. Links already written into existing post bodies keep the old address; upstream's `discourse remap` is the tool for rewriting those, and this package does not wrap it.

**`configure-smtp`** — three-mode SMTP (disabled / StartOS system / custom). Restarts Discourse. Repeat-safe. Until it is run, only accounts created by `set-admin-password` can sign in.

**`set-worker-count`** — sets `UNICORN_WORKERS`, 1–8, default 1. Restarts Discourse. Each worker costs roughly 250 MB resident.

## Tasks

Two, both raised from `init` and both cleared by running the action they point at.

| Task                 | Severity    | Raised when                                                                         |
| -------------------- | ----------- | ------------------------------------------------------------------------------------ |
| `set-primary-url`    | `critical`  | the stored primary URL is no longer among the service's addresses, or none was found |
| `set-admin-password` | `important` | `adminEmail` is unset in `store.json`                                                |

The primary-URL task is `critical` because the container genuinely cannot boot without a hostname; while it is raised the service will not start and its ordinary controls are suspended. It can return if the user later removes the address Discourse was pointed at.

The admin task is deliberately **not** critical, even though the credential flow is the recipe's: the action reaches Discourse's database through the running stack, so blocking startup would block the only way to satisfy it. It does not return once an administrator exists.

## Health Checks

| Check                | Probes                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `discourse` (daemon) | `GET /srv/status` on the container's own port, 180 s grace                                |
| `email`              | whether SMTP is configured; reports `disabled`, never a failure                           |
| `postgres`, `valkey` | `pg_isready` and `valkey-cli ping`, both `display: null`                                  |

The web check deliberately speaks HTTP rather than testing whether the port is open: nginx binds within a second of the container starting and answers 502 until unicorn is up, so a port probe would report ready while every request still failed.

A `discourse` check stuck in `loading` past the grace period means unicorn did not come up — read the service logs. Because `MIGRATE_ON_BOOT` is off, that is never a migration in progress; a schema problem shows up during the install or update instead, as a failed transition.

`email` reporting `disabled` is the expected state on a server with no mail configured. It never blocks anything; it exists because "nobody can register" is otherwise a silent condition.

## Backups and Restore

The database is **dumped, not copied**: `withPgDump` runs `pg_dump` before the backup and rebuilds the cluster with `initdb` + `pg_restore` afterwards. The `db` volume's files are never captured. The extensions come back with the dump, which is why the restore does not need to recreate them.

Alongside it, two volumes are synced wholesale: `startos`, and `shared` minus `/backups`, `/log` and `/tmp`. Discourse's own export archives are excluded because this backup already contains everything they hold; logs and scratch space regenerate.

`assets` and `redis` are excluded entirely. Assets are rebuilt during the restore's init pass. The Valkey volume holds the sidekiq queue and cache — a restored instance starts with an empty queue, so notification and digest emails that were pending at backup time are not sent.

A restored instance is immediately usable. `secretKeyBase` comes back with `store.json`, so existing sessions and auth tokens survive.

## Limitations and Differences

1. **The in-app upgrade page is removed.** The image bundles the `docker_manager` plugin, which serves `/admin/upgrade`; the app is a real git clone, so pressing Upgrade would pull new upstream code into the container and desync it from the pinned image. The plugin directory is deleted before assets are compiled and before the daemon starts.
2. **Login via Discourse ID is not enabled.** Upstream now offers `id.discourse.com` as a fallback when SMTP is skipped. It is a hosted third-party identity provider; this package creates the administrator locally instead.
3. **Version checks are off and cannot be turned on.** `version_checks` is shadowed by the environment, so it does not appear in the admin panel.
4. **MaxMind geolocation is not configured.** IP-to-country lookups need a MaxMind account and license key, and the package sets the database refresh interval to zero so asset compilation makes no outbound request.
5. **Upstream calls `discourse/discourse` experimental.** Its Docker Hub description does not recommend it for production. It is the only prebuilt image that ships both architectures — `bitnami/discourse` was retired to a frozen `bitnamilegacy` repository — and it is built from the same `discourse/base` lineage as upstream's supported standalone install.
6. **A hostname change does not rewrite existing posts.** Absolute URLs already in post bodies keep the old address; upstream's `discourse remap` is not wrapped as an action.

---

## Quick Reference for AI Consumers

```yaml
package_id: discourse
images:
  discourse: discourse/discourse
  postgres: pgvector/pgvector
  valkey: valkey/valkey
architectures: [x86_64, aarch64]
subcontainers: [discourse, postgres, valkey, init-discourse, init-postgres, init-valkey]
volumes:
  startos: null # store.json; reached through the file model, never mounted
  shared: /shared
  db: /var/lib/postgresql
  redis: /data
  assets: [/var/www/discourse/public/assets, /var/www/discourse/tmp/pretty-text-processor]
file_models:
  - store.json
startos_managed_env_vars:
  - DISCOURSE_HOSTNAME
  - DISCOURSE_PORT
  - DISCOURSE_DB_HOST
  - DISCOURSE_DB_PORT
  - DISCOURSE_DB_NAME
  - DISCOURSE_DB_USERNAME
  - DISCOURSE_DB_PASSWORD
  - DISCOURSE_DB_SOCKET
  - DISCOURSE_REDIS_HOST
  - DISCOURSE_REDIS_PORT
  - DISCOURSE_SECRET_KEY_BASE
  - DISCOURSE_FORCE_HTTPS
  - DISCOURSE_VERSION_CHECKS
  - DISCOURSE_REFRESH_MAXMIND_DB_DURING_PRECOMPILE_DAYS
  - DISCOURSE_SKIP_EMAIL_SETUP
  - DISCOURSE_SMTP_ADDRESS
  - DISCOURSE_SMTP_PORT
  - DISCOURSE_SMTP_USER_NAME
  - DISCOURSE_SMTP_PASSWORD
  - DISCOURSE_SMTP_ENABLE_START_TLS
  - DISCOURSE_SMTP_FORCE_TLS
  - DISCOURSE_NOTIFICATION_EMAIL
  - MIGRATE_ON_BOOT
  - PRECOMPILE_ON_BOOT
  - UNICORN_WORKERS
  - UNICORN_SIDEKIQS
dependencies: none
interfaces:
  ui: { type: ui, port: 80 }
actions:
  - set-admin-password
  - set-primary-url
  - configure-smtp
  - set-worker-count
tasks:
  - { action: set-primary-url, severity: critical }
  - { action: set-admin-password, severity: important }
health_checks:
  - discourse
  - email
  - postgres
  - valkey
```
