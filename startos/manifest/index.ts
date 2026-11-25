import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'discourse',
  title: 'Discourse',
  license: 'GPL-2.0',
  packageRepo: 'https://github.com/Start9Labs/discourse-startos',
  upstreamRepo: 'https://github.com/discourse/discourse',
  marketingUrl: 'https://www.discourse.org',
  donationUrl: null,
  description: { short, long },
  volumes: ['startos', 'shared', 'db', 'redis', 'assets'],
  images: {
    discourse: {
      // Digest-pinned: the `-latest` tag is rebuilt in place from `main`, so
      // the name alone does not identify a schema level.
      source: {
        dockerBuild: {
          buildArgs: {
            IMAGE:
              'discourse/discourse:2026.12.0-latest@sha256:b2e8063c00b6e4cd69709358c45b20f6d6fe0fb6179dc33b0511227823e95ccb',
          },
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
    postgres: {
      source: { dockerTag: 'pgvector/pgvector:0.8.7-pg18' },
      arch: ['x86_64', 'aarch64'],
    },
    valkey: {
      source: { dockerTag: 'valkey/valkey:9.2.0-alpine' },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
