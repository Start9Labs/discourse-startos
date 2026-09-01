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
        dockerTag:
          'discourse/discourse:2026.9.0-latest@sha256:32eb7c5650378a744658ba962b04cbe95ca3f1b949808be19be43cdd4601d237',
      },
      arch: ['x86_64', 'aarch64'],
    },
    postgres: {
      source: { dockerTag: 'pgvector/pgvector:pg18' },
      arch: ['x86_64', 'aarch64'],
    },
    valkey: {
      source: { dockerTag: 'valkey/valkey:9-alpine' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
