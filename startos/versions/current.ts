import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.10.0-latest:6',
  releaseNotes: {
    en_US: `Stops trusting certificates from a compromised certificate authority (eMudhra). The bundled Discourse Voice plugin is now called Discourse Live.`,
    es_ES: `Deja de confiar en los certificados de una autoridad de certificación comprometida (eMudhra). El plugin incluido Discourse Voice ahora se llama Discourse Live.`,
    de_DE: `Vertraut Zertifikaten einer kompromittierten Zertifizierungsstelle (eMudhra) nicht mehr. Das mitgelieferte Plugin Discourse Voice heißt jetzt Discourse Live.`,
    pl_PL: `Przestaje ufać certyfikatom skompromitowanego urzędu certyfikacji (eMudhra). Dołączona wtyczka Discourse Voice nazywa się teraz Discourse Live.`,
    fr_FR: `Ne fait plus confiance aux certificats d'une autorité de certification compromise (eMudhra). Le plugin intégré Discourse Voice s'appelle désormais Discourse Live.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
