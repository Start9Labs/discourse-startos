import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.0-latest:2',
  releaseNotes: {
    en_US: `Updated Discourse to the September 6 build of 2026.9.0-latest.

- Adds moderation controls for reviewing and lifting automated user silences
- Improves automatic translations across topic titles, post excerpts, activity streams, and user summaries
- Updates editor, email, Zendesk, and other dependencies

[Full upstream changes](https://github.com/discourse/discourse/compare/b8565672b9945d19855a382f684ef935ad53da8d...5e9779d4cd418af07a6ed01005d558eda76f2f69)`,
    es_ES: `Discourse se actualizó a la compilación del 6 de septiembre de 2026.9.0-latest.

- Añade controles de moderación para revisar y levantar silenciamientos automáticos de usuarios
- Mejora las traducciones automáticas en títulos de temas, extractos de publicaciones, flujos de actividad y resúmenes de usuarios
- Actualiza las dependencias del editor, el correo electrónico, Zendesk y otros componentes

[Cambios completos de upstream](https://github.com/discourse/discourse/compare/b8565672b9945d19855a382f684ef935ad53da8d...5e9779d4cd418af07a6ed01005d558eda76f2f69)`,
    de_DE: `Discourse wurde auf den Build vom 6. September von 2026.9.0-latest aktualisiert.

- Fügt Moderationsfunktionen zum Überprüfen und Aufheben automatischer Benutzersperren hinzu
- Verbessert automatische Übersetzungen für Thementitel, Beitragsauszüge, Aktivitätsverläufe und Benutzerzusammenfassungen
- Aktualisiert Abhängigkeiten für Editor, E-Mail, Zendesk und weitere Komponenten

[Vollständige Upstream-Änderungen](https://github.com/discourse/discourse/compare/b8565672b9945d19855a382f684ef935ad53da8d...5e9779d4cd418af07a6ed01005d558eda76f2f69)`,
    pl_PL: `Discourse zaktualizowano do kompilacji 2026.9.0-latest z 6 września.

- Dodaje narzędzia moderacyjne do sprawdzania i cofania automatycznego wyciszania użytkowników
- Ulepsza automatyczne tłumaczenia tytułów tematów, fragmentów wpisów, strumieni aktywności i podsumowań użytkowników
- Aktualizuje zależności edytora, poczty e-mail, Zendesk i innych komponentów

[Pełna lista zmian upstream](https://github.com/discourse/discourse/compare/b8565672b9945d19855a382f684ef935ad53da8d...5e9779d4cd418af07a6ed01005d558eda76f2f69)`,
    fr_FR: `Discourse a été mis à jour vers la version du 6 septembre de 2026.9.0-latest.

- Ajoute des outils de modération pour examiner et lever les mises sous silence automatiques des utilisateurs
- Améliore les traductions automatiques des titres de sujets, des extraits de messages, des flux d'activité et des résumés d'utilisateurs
- Met à jour les dépendances de l'éditeur, de la messagerie, de Zendesk et d'autres composants

[Modifications upstream complètes](https://github.com/discourse/discourse/compare/b8565672b9945d19855a382f684ef935ad53da8d...5e9779d4cd418af07a6ed01005d558eda76f2f69)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
