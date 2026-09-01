import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.0-latest:0',
  releaseNotes: {
    en_US:
      'Discourse now follows its main release line. This update cannot be undone: Discourse does not support moving an existing database back to an older schema.',
    es_ES:
      'Discourse ahora sigue su línea de versiones principal. Esta actualización no se puede deshacer: Discourse no admite devolver una base de datos existente a un esquema anterior.',
    de_DE:
      'Discourse folgt jetzt seiner Haupt-Release-Linie. Diese Aktualisierung lässt sich nicht rückgängig machen: Discourse unterstützt es nicht, eine bestehende Datenbank auf ein älteres Schema zurückzusetzen.',
    pl_PL:
      'Discourse śledzi teraz swoją główną linię wydań. Tej aktualizacji nie można cofnąć: Discourse nie obsługuje przywracania istniejącej bazy danych do wcześniejszego schematu.',
    fr_FR:
      'Discourse suit désormais sa ligne de publication principale. Cette mise à jour est irréversible : Discourse ne permet pas de ramener une base de données existante à un schéma antérieur.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
