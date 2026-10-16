import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.10.0-latest:4',
  releaseNotes: {
    en_US: 'Performance improvement',
    es_ES: 'Mejora de rendimiento',
    de_DE: 'Leistungsverbesserung',
    pl_PL: 'Poprawa wydajności',
    fr_FR: 'Amélioration des performances',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
