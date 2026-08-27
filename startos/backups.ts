import { storeJson } from './fileModels/store.json'
import { sdk } from './sdk'
import {
  POSTGRES_DB,
  POSTGRES_MOUNTPOINT,
  POSTGRES_PGDATA_SUBPATH,
  POSTGRES_USER,
} from './utils'

export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.withPgDump({
    imageId: 'postgres',
    dbVolume: 'db',
    mountpoint: POSTGRES_MOUNTPOINT,
    pgdataPath: POSTGRES_PGDATA_SUBPATH,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: async () => {
      const password = await storeJson.read((s) => s.postgresPassword).once()
      if (!password) throw new Error('No postgresPassword found in store.json')
      return password
    },
    initdbArgs: ['--data-checksums'],
  })
    .addVolume('startos')
    // `/backups` holds Discourse's own export archives, whose contents this
    // backup already captures; `/log` and `/tmp` regenerate.
    .addVolume('shared', {
      options: { delete: true, exclude: ['/backups', '/log', '/tmp'] },
    }),
)
