import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.10.0-latest:0',
  releaseNotes: {
    en_US: `Updated Discourse to 2026.10.0-latest.

- Added native Markdown endpoints for topics and lists
- Added archive mode for frozen sites, event reminders and more Boards and workflow tools
- Improved moderation and security with stronger content-visibility and access controls

[Full upstream changes](https://github.com/discourse/discourse/compare/v2026.9.0-latest...v2026.10.0-latest)`,
    es_ES: `Discourse actualizado a 2026.10.0-latest.

- Se añadieron endpoints Markdown nativos para temas y listas
- Se añadieron un modo de archivo para sitios congelados, recordatorios de eventos y más herramientas para tableros y flujos de trabajo
- Se mejoraron la moderación y la seguridad con controles más sólidos de visibilidad del contenido y acceso

[Cambios completos del proyecto](https://github.com/discourse/discourse/compare/v2026.9.0-latest...v2026.10.0-latest)`,
    de_DE: `Discourse wurde auf 2026.10.0-latest aktualisiert.

- Native Markdown-Endpunkte für Themen und Listen hinzugefügt
- Archivmodus für eingefrorene Websites, Veranstaltungserinnerungen und weitere Werkzeuge für Boards und Workflows hinzugefügt
- Moderation und Sicherheit durch stärkere Sichtbarkeits- und Zugriffskontrollen verbessert

[Vollständige Änderungen des Projekts](https://github.com/discourse/discourse/compare/v2026.9.0-latest...v2026.10.0-latest)`,
    pl_PL: `Discourse zaktualizowano do wersji 2026.10.0-latest.

- Dodano natywne punkty końcowe Markdown dla tematów i list
- Dodano tryb archiwum dla zamrożonych witryn, przypomnienia o wydarzeniach oraz więcej narzędzi do tablic i przepływów pracy
- Ulepszono moderację i bezpieczeństwo dzięki silniejszym mechanizmom kontroli widoczności treści i dostępu

[Pełna lista zmian projektu](https://github.com/discourse/discourse/compare/v2026.9.0-latest...v2026.10.0-latest)`,
    fr_FR: `Discourse a été mis à jour vers 2026.10.0-latest.

- Ajout de points de terminaison Markdown natifs pour les sujets et les listes
- Ajout d'un mode d'archivage pour les sites figés, de rappels d'événements et de nouveaux outils pour les tableaux et les flux de travail
- Amélioration de la modération et de la sécurité grâce à des contrôles renforcés de visibilité du contenu et d'accès

[Liste complète des modifications du projet](https://github.com/discourse/discourse/compare/v2026.9.0-latest...v2026.10.0-latest)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
