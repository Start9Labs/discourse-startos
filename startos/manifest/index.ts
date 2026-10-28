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
              'discourse/discourse:2026.11.0-latest@sha256:5281ecce4c41004d1657d7817bc59b6a336042dfd9f15b4bcf322fff0ac07002',
          },
        },
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
})
