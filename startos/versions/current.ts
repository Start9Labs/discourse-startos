import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.11.0-latest.2:0',
  releaseNotes: {
    en_US: `Updated Discourse to 2026.11.0-latest.2.

- Adds blog author pages, standalone pages, co-author credits and article cover images.
- Fixes many security issues, including private-content and group-membership disclosure, moderator privilege escalation, a DiscourseConnect invite CSRF and HTML injection through tags.
- The unused "governing law" and "city for disputes" settings are removed.

[Full upstream changes](https://github.com/discourse/discourse/compare/v2026.11.0-latest.1...v2026.11.0-latest.2).`,
    es_ES: `Discourse actualizado a 2026.11.0-latest.2.

- Añade páginas de autor, páginas independientes, créditos de coautores e imágenes de portada para los artículos del blog.
- Corrige numerosos problemas de seguridad, entre ellos la divulgación de contenido privado y de miembros de grupos, la escalada de privilegios de moderadores, un CSRF en las invitaciones de DiscourseConnect y la inyección de HTML mediante etiquetas.
- Se eliminan los ajustes sin uso «ley aplicable» y «ciudad para disputas».

[Todos los cambios de Discourse](https://github.com/discourse/discourse/compare/v2026.11.0-latest.1...v2026.11.0-latest.2).`,
    de_DE: `Discourse auf 2026.11.0-latest.2 aktualisiert.

- Fügt Autorenseiten, eigenständige Seiten, Co-Autoren-Nennungen und Titelbilder für Blogartikel hinzu.
- Behebt zahlreiche Sicherheitsprobleme, darunter die Offenlegung privater Inhalte und von Gruppenmitgliedschaften, eine Rechteausweitung für Moderatoren, eine CSRF-Lücke bei DiscourseConnect-Einladungen und HTML-Injektion über Tags.
- Die ungenutzten Einstellungen „anwendbares Recht“ und „Gerichtsstand“ wurden entfernt.

[Alle Discourse-Änderungen](https://github.com/discourse/discourse/compare/v2026.11.0-latest.1...v2026.11.0-latest.2).`,
    pl_PL: `Zaktualizowano Discourse do 2026.11.0-latest.2.

- Dodano strony autorów, samodzielne strony, wskazywanie współautorów i obrazy okładek artykułów na blogu.
- Naprawiono wiele problemów bezpieczeństwa, w tym ujawnianie prywatnych treści i członkostwa w grupach, eskalację uprawnień moderatorów, podatność CSRF w zaproszeniach DiscourseConnect oraz wstrzykiwanie HTML przez tagi.
- Usunięto nieużywane ustawienia „prawo właściwe” i „miasto rozstrzygania sporów”.

[Pełna lista zmian Discourse](https://github.com/discourse/discourse/compare/v2026.11.0-latest.1...v2026.11.0-latest.2).`,
    fr_FR: `Discourse mis à jour vers 2026.11.0-latest.2.

- Ajoute des pages d’auteur, des pages autonomes, la mention des co-auteurs et des images de couverture pour les articles du blog.
- Corrige de nombreux problèmes de sécurité, dont la divulgation de contenu privé et d’appartenance à des groupes, une élévation de privilèges des modérateurs, une faille CSRF dans les invitations DiscourseConnect et l’injection HTML via les étiquettes.
- Les paramètres inutilisés « droit applicable » et « ville compétente pour les litiges » sont supprimés.

[Tous les changements de Discourse](https://github.com/discourse/discourse/compare/v2026.11.0-latest.1...v2026.11.0-latest.2).`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
