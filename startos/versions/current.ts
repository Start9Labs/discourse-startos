import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.11.0-latest:0',
  releaseNotes: {
    en_US:
      'Updated Discourse to 2026.11.0-latest. Adds a dedicated mentions tab in the user menu and board ownership controls, and fixes HTML escaping in staff action logs and video previews. Database migrations run automatically during the update. Updated the StartOS SDK. [Full upstream changes](https://github.com/discourse/discourse/compare/v2026.10.0-latest.1...v2026.11.0-latest).',
    es_ES:
      'Discourse actualizado a 2026.11.0-latest. Añade una pestaña de menciones en el menú de usuario y controles de propiedad de los tableros, y corrige el escape de HTML en los registros de acciones del personal y las vistas previas de vídeo. Las migraciones de la base de datos se ejecutan automáticamente durante la actualización. SDK de StartOS actualizado. [Todos los cambios de Discourse](https://github.com/discourse/discourse/compare/v2026.10.0-latest.1...v2026.11.0-latest).',
    de_DE:
      'Discourse auf 2026.11.0-latest aktualisiert. Fügt einen eigenen Erwähnungen-Tab im Benutzermenü und Eigentümerrechte für Boards hinzu und korrigiert die HTML-Maskierung in Team-Aktionsprotokollen und Videovorschauen. Datenbankmigrationen laufen beim Update automatisch. StartOS-SDK aktualisiert. [Alle Discourse-Änderungen](https://github.com/discourse/discourse/compare/v2026.10.0-latest.1...v2026.11.0-latest).',
    pl_PL:
      'Zaktualizowano Discourse do 2026.11.0-latest. Dodano osobną kartę wzmianek w menu użytkownika i uprawnienia właścicieli tablic oraz poprawiono kodowanie HTML w dziennikach działań personelu i podglądach filmów. Migracje bazy danych są wykonywane automatycznie podczas aktualizacji. Zaktualizowano SDK StartOS. [Pełna lista zmian Discourse](https://github.com/discourse/discourse/compare/v2026.10.0-latest.1...v2026.11.0-latest).',
    fr_FR:
      'Discourse mis à jour vers 2026.11.0-latest. Ajoute un onglet de mentions dans le menu utilisateur et des droits de propriétaire pour les tableaux, et corrige l’échappement HTML dans les journaux des actions du personnel et les aperçus vidéo. Les migrations de la base de données s’exécutent automatiquement pendant la mise à jour. SDK StartOS mis à jour. [Tous les changements de Discourse](https://github.com/discourse/discourse/compare/v2026.10.0-latest.1...v2026.11.0-latest).',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
