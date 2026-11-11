import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.11.0-latest.1:0',
  releaseNotes: {
    en_US: `Updated Discourse to 2026.11.0-latest.1. Requires StartOS 0.4.2 or newer.

- Adds timed chat muting and the bundled Blog plugin.
- Fixes private-content leaks, permission bypasses, HTML injection and denial-of-service vulnerabilities.
- Database migrations run automatically, retaining only the ten newest push subscriptions per user. Older devices may need to enable notifications again.
- Removed deprecated theme/plugin JavaScript APIs may affect custom themes; check them after updating.

[Full upstream changes](https://github.com/discourse/discourse/compare/v2026.11.0-latest...v2026.11.0-latest.1).`,
    es_ES: `Discourse actualizado a 2026.11.0-latest.1. Requiere StartOS 0.4.2 o posterior.

- Añade el silenciamiento temporal del chat y el plugin Blog incluido.
- Corrige filtraciones de contenido privado, elusión de permisos, inyección de HTML y vulnerabilidades de denegación de servicio.
- Las migraciones de la base de datos se ejecutan automáticamente y conservan solo las diez suscripciones push más recientes por usuario. Puede ser necesario volver a activar las notificaciones en los dispositivos más antiguos.
- La eliminación de API JavaScript obsoletas para temas y plugins puede afectar a los temas personalizados; compruébelos después de actualizar.

[Todos los cambios de Discourse](https://github.com/discourse/discourse/compare/v2026.11.0-latest...v2026.11.0-latest.1).`,
    de_DE: `Discourse auf 2026.11.0-latest.1 aktualisiert. Erfordert StartOS 0.4.2 oder neuer.

- Fügt zeitlich begrenztes Stummschalten im Chat und das mitgelieferte Blog-Plugin hinzu.
- Behebt die Offenlegung privater Inhalte, Berechtigungsumgehungen, HTML-Injektion und Denial-of-Service-Schwachstellen.
- Datenbankmigrationen laufen automatisch und behalten nur die zehn neuesten Push-Abonnements pro Benutzer. Auf älteren Geräten müssen Benachrichtigungen gegebenenfalls erneut aktiviert werden.
- Entfernte veraltete JavaScript-APIs für Themes und Plugins können benutzerdefinierte Themes beeinträchtigen; prüfen Sie diese nach dem Update.

[Alle Discourse-Änderungen](https://github.com/discourse/discourse/compare/v2026.11.0-latest...v2026.11.0-latest.1).`,
    pl_PL: `Zaktualizowano Discourse do 2026.11.0-latest.1. Wymaga StartOS 0.4.2 lub nowszego.

- Dodano czasowe wyciszanie czatu i dołączoną wtyczkę Blog.
- Naprawiono wycieki prywatnych treści, omijanie uprawnień, wstrzykiwanie HTML i podatności na odmowę usługi.
- Migracje bazy danych uruchamiają się automatycznie, zachowując tylko dziesięć najnowszych subskrypcji push na użytkownika. Na starszych urządzeniach może być konieczne ponowne włączenie powiadomień.
- Usunięcie przestarzałych interfejsów JavaScript motywów i wtyczek może wpłynąć na niestandardowe motywy; sprawdź je po aktualizacji.

[Pełna lista zmian Discourse](https://github.com/discourse/discourse/compare/v2026.11.0-latest...v2026.11.0-latest.1).`,
    fr_FR: `Discourse mis à jour vers 2026.11.0-latest.1. Nécessite StartOS 0.4.2 ou ultérieur.

- Ajoute la mise en sourdine temporaire du chat et le plugin Blog intégré.
- Corrige des fuites de contenu privé, des contournements de permissions, des injections HTML et des vulnérabilités de déni de service.
- Les migrations de la base de données s’exécutent automatiquement et ne conservent que les dix abonnements push les plus récents par utilisateur. Les anciens appareils peuvent nécessiter la réactivation des notifications.
- La suppression d’anciennes API JavaScript de thèmes et de plugins peut affecter les thèmes personnalisés ; vérifiez-les après la mise à jour.

[Tous les changements de Discourse](https://github.com/discourse/discourse/compare/v2026.11.0-latest...v2026.11.0-latest.1).`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
