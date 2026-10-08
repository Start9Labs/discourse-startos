import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.10.0-latest:2',
  releaseNotes: {
    en_US: `Updated Discourse to 2026.10.0-latest.

- Added native Markdown endpoints for topics and lists
- Added archive mode for frozen sites, event reminders and more Boards and workflow tools
- Improved moderation and security with stronger content-visibility and access controls

[Full upstream changes](https://github.com/discourse/discourse/compare/v2026.9.0-latest...v2026.10.0-latest)

- Open UI opens Discourse at its primary URL.
- The task asking you to choose a new primary URL clears on its own once the chosen address is available again.
- Web Workers' description in Set Worker Count says what more workers cost.`,
    es_ES: `Discourse actualizado a 2026.10.0-latest.

- Se añadieron endpoints Markdown nativos para temas y listas
- Se añadieron un modo de archivo para sitios congelados, recordatorios de eventos y más herramientas para tableros y flujos de trabajo
- Se mejoraron la moderación y la seguridad con controles más sólidos de visibilidad del contenido y acceso

[Cambios completos del proyecto](https://github.com/discourse/discourse/compare/v2026.9.0-latest...v2026.10.0-latest)

- Abrir interfaz abre Discourse en su URL principal.
- La tarea que le pide elegir una nueva URL principal desaparece por sí sola en cuanto la dirección elegida vuelve a estar disponible.
- La descripción de Procesos web en Establecer número de procesos explica lo que cuestan más procesos.`,
    de_DE: `Discourse wurde auf 2026.10.0-latest aktualisiert.

- Native Markdown-Endpunkte für Themen und Listen hinzugefügt
- Archivmodus für eingefrorene Websites, Veranstaltungserinnerungen und weitere Werkzeuge für Boards und Workflows hinzugefügt
- Moderation und Sicherheit durch stärkere Sichtbarkeits- und Zugriffskontrollen verbessert

[Vollständige Änderungen des Projekts](https://github.com/discourse/discourse/compare/v2026.9.0-latest...v2026.10.0-latest)

- „Oberfläche öffnen“ öffnet Discourse unter seiner primären URL.
- Die Aufgabe, eine neue primäre URL zu wählen, verschwindet von selbst, sobald die gewählte Adresse wieder verfügbar ist.
- Die Beschreibung von „Web-Worker“ in „Worker-Anzahl festlegen“ erklärt, was mehr Worker kosten.`,
    pl_PL: `Discourse zaktualizowano do wersji 2026.10.0-latest.

- Dodano natywne punkty końcowe Markdown dla tematów i list
- Dodano tryb archiwum dla zamrożonych witryn, przypomnienia o wydarzeniach oraz więcej narzędzi do tablic i przepływów pracy
- Ulepszono moderację i bezpieczeństwo dzięki silniejszym mechanizmom kontroli widoczności treści i dostępu

[Pełna lista zmian projektu](https://github.com/discourse/discourse/compare/v2026.9.0-latest...v2026.10.0-latest)

- „Otwórz interfejs” otwiera Discourse pod jego głównym adresem URL.
- Zadanie z prośbą o wybranie nowego głównego adresu URL znika samo, gdy wybrany adres znów jest dostępny.
- Opis pola Procesy webowe w Ustaw liczbę procesów wyjaśnia, ile kosztuje więcej procesów.`,
    fr_FR: `Discourse a été mis à jour vers 2026.10.0-latest.

- Ajout de points de terminaison Markdown natifs pour les sujets et les listes
- Ajout d'un mode d'archivage pour les sites figés, de rappels d'événements et de nouveaux outils pour les tableaux et les flux de travail
- Amélioration de la modération et de la sécurité grâce à des contrôles renforcés de visibilité du contenu et d'accès

[Liste complète des modifications du projet](https://github.com/discourse/discourse/compare/v2026.9.0-latest...v2026.10.0-latest)

- Ouvrir l'interface ouvre Discourse sur son URL principale.
- La tâche vous demandant de choisir une nouvelle URL principale disparaît d'elle-même dès que l'adresse choisie est de nouveau disponible.
- La description de Processus web dans Définir le nombre de processus explique ce que coûtent davantage de processus.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
