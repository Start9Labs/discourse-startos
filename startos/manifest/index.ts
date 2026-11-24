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
              'discourse/discourse:2026.11.0-latest.2@sha256:6d9c9b04038cc29316962d17190f707acda662bf821aa5dfad1b1061988c2c86',
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
