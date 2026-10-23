import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.10.0-latest.1:0',
  releaseNotes: {
    en_US: `Updated Discourse to 2026.10.0-latest.1.

- Ruby 3.4.12, which fixes memory corruption in the regular expression engine (CVE-2026-89078, CVE-2026-93577, CVE-2026-97229, CVE-2026-110264)
- Discourse security fixes for group flair uploads, hidden post revisions, chat review queues, onebox fetches, Patreon group access and MCP private-message access

[Full upstream changes](https://github.com/discourse/discourse/compare/v2026.10.0-latest...v2026.10.0-latest.1)`,
    es_ES: `Discourse actualizado a 2026.10.0-latest.1.

- Ruby 3.4.12, que corrige la corrupción de memoria en el motor de expresiones regulares (CVE-2026-89078, CVE-2026-93577, CVE-2026-97229, CVE-2026-110264)
- Correcciones de seguridad de Discourse para las subidas de insignias de grupo, las revisiones ocultas de publicaciones, las colas de revisión del chat, la obtención de oneboxes, el acceso a grupos de Patreon y el acceso a mensajes privados por MCP

[Cambios completos del proyecto](https://github.com/discourse/discourse/compare/v2026.10.0-latest...v2026.10.0-latest.1)`,
    de_DE: `Discourse wurde auf 2026.10.0-latest.1 aktualisiert.

- Ruby 3.4.12, das Speicherbeschädigungen in der Engine für reguläre Ausdrücke behebt (CVE-2026-89078, CVE-2026-93577, CVE-2026-97229, CVE-2026-110264)
- Sicherheitskorrekturen in Discourse für Gruppen-Flair-Uploads, verborgene Beitragsrevisionen, Chat-Prüfwarteschlangen, Onebox-Abrufe, den Zugang zu Patreon-Gruppen und den Zugriff auf private Nachrichten über MCP

[Vollständige Änderungen des Projekts](https://github.com/discourse/discourse/compare/v2026.10.0-latest...v2026.10.0-latest.1)`,
    pl_PL: `Discourse zaktualizowano do wersji 2026.10.0-latest.1.

- Ruby 3.4.12, który naprawia uszkodzenie pamięci w silniku wyrażeń regularnych (CVE-2026-89078, CVE-2026-93577, CVE-2026-97229, CVE-2026-110264)
- Poprawki bezpieczeństwa Discourse dotyczące przesyłania plakietek grup, ukrytych wersji postów, kolejek przeglądu czatu, pobierania oneboxów, dostępu do grup Patreon oraz dostępu do prywatnych wiadomości przez MCP

[Pełna lista zmian projektu](https://github.com/discourse/discourse/compare/v2026.10.0-latest...v2026.10.0-latest.1)`,
    fr_FR: `Discourse a été mis à jour vers 2026.10.0-latest.1.

- Ruby 3.4.12, qui corrige une corruption de mémoire dans le moteur d'expressions régulières (CVE-2026-89078, CVE-2026-93577, CVE-2026-97229, CVE-2026-110264)
- Correctifs de sécurité de Discourse pour les envois de badges de groupe, les révisions masquées des messages, les files de revue du chat, la récupération des oneboxes, l'accès aux groupes Patreon et l'accès aux messages privés via MCP

[Liste complète des modifications du projet](https://github.com/discourse/discourse/compare/v2026.10.0-latest...v2026.10.0-latest.1)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
