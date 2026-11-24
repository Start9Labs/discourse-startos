import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.11.0-latest.2:1',
  releaseNotes: {
    en_US: `The bundled Valkey cache accepts connections from Discourse alone.`,
    es_ES: `La caché Valkey incluida solo acepta conexiones de Discourse.`,
    de_DE: `Der mitgelieferte Valkey-Cache nimmt nur Verbindungen von Discourse an.`,
    pl_PL: `Dołączona pamięć podręczna Valkey przyjmuje połączenia wyłącznie od Discourse.`,
    fr_FR: `Le cache Valkey intégré n'accepte les connexions que de Discourse.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
