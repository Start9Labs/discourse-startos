import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.0-latest:1',
  releaseNotes: {
    en_US: `Updated Discourse to the September 5 build of 2026.9.0-latest.

- Adds voice rooms, boards, Graphviz diagrams in the rich editor, and a default \`/llms.txt\`
- Adds OAuth authentication to the Zendesk plugin and more flexible workflow triggers
- Fixes security issues in mailing-list threading, Data Explorer queries, and upload authorization, plus improvements across chat, checklists, polls, sign-up, push notifications, and admin reports

[Full upstream changes](https://github.com/discourse/discourse/compare/768a4ed1cd8e6742fe1c1340a9c4ab01318285ec...b8565672b9945d19855a382f684ef935ad53da8d)`,
    es_ES: `Discourse se actualizó a la compilación del 5 de septiembre de 2026.9.0-latest.

- Añade salas de voz, tableros, diagramas Graphviz en el editor enriquecido y un archivo \`/llms.txt\` predeterminado
- Añade autenticación OAuth al complemento de Zendesk y activadores de flujo de trabajo más flexibles
- Corrige problemas de seguridad en los hilos de listas de correo, las consultas de Data Explorer y la autorización de cargas, además de mejorar el chat, las listas de verificación, las encuestas, el registro, las notificaciones push y los informes de administración

[Cambios completos de upstream](https://github.com/discourse/discourse/compare/768a4ed1cd8e6742fe1c1340a9c4ab01318285ec...b8565672b9945d19855a382f684ef935ad53da8d)`,
    de_DE: `Discourse wurde auf den Build vom 5. September von 2026.9.0-latest aktualisiert.

- Fügt Sprachräume, Boards, Graphviz-Diagramme im Rich-Text-Editor und eine standardmäßige \`/llms.txt\` hinzu
- Fügt dem Zendesk-Plugin OAuth-Authentifizierung und flexiblere Workflow-Auslöser hinzu
- Behebt Sicherheitsprobleme bei Mailinglisten-Threads, Data-Explorer-Abfragen und der Upload-Autorisierung sowie weitere Probleme bei Chat, Checklisten, Umfragen, Registrierung, Push-Benachrichtigungen und Admin-Berichten

[Vollständige Upstream-Änderungen](https://github.com/discourse/discourse/compare/768a4ed1cd8e6742fe1c1340a9c4ab01318285ec...b8565672b9945d19855a382f684ef935ad53da8d)`,
    pl_PL: `Discourse zaktualizowano do kompilacji 2026.9.0-latest z 5 września.

- Dodaje pokoje głosowe, tablice, diagramy Graphviz w edytorze tekstu sformatowanego oraz domyślny plik \`/llms.txt\`
- Dodaje uwierzytelnianie OAuth do wtyczki Zendesk i bardziej elastyczne wyzwalacze przepływów pracy
- Naprawia problemy bezpieczeństwa w wątkach list mailingowych, zapytaniach Data Explorer i autoryzacji przesyłania plików, a także ulepsza czat, listy kontrolne, ankiety, rejestrację, powiadomienia push i raporty administracyjne

[Pełna lista zmian upstream](https://github.com/discourse/discourse/compare/768a4ed1cd8e6742fe1c1340a9c4ab01318285ec...b8565672b9945d19855a382f684ef935ad53da8d)`,
    fr_FR: `Discourse a été mis à jour vers la version du 5 septembre de 2026.9.0-latest.

- Ajoute les salons vocaux, les tableaux, les diagrammes Graphviz dans l'éditeur enrichi et un fichier \`/llms.txt\` par défaut
- Ajoute l'authentification OAuth au plugin Zendesk et des déclencheurs de flux de travail plus flexibles
- Corrige des problèmes de sécurité liés aux fils de listes de diffusion, aux requêtes Data Explorer et à l'autorisation des téléversements, ainsi que des problèmes concernant le chat, les listes de contrôle, les sondages, l'inscription, les notifications push et les rapports d'administration

[Modifications upstream complètes](https://github.com/discourse/discourse/compare/768a4ed1cd8e6742fe1c1340a9c4ab01318285ec...b8565672b9945d19855a382f684ef935ad53da8d)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
