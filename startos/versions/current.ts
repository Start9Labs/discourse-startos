import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.12.0-latest:0',
  releaseNotes: {
    en_US: `Updated Discourse to 2026.12.0-latest.

- Adds direct replies in chat threads, a number type for custom user fields, the Noto 3D emoji set and style previews for theme components.
- Fixes 15 security vulnerabilities, including leaks of deleted chat replies and hidden private messages, and signups that bypassed allowed or blocked email domains.
- Members who have used anonymous mode are signed out once and may need to enable push notifications again.

[Full upstream changes](https://github.com/discourse/discourse/compare/v2026.11.0-latest.2...v2026.12.0-latest).`,
    es_ES: `Discourse actualizado a 2026.12.0-latest.

- Añade respuestas directas en los hilos del chat, un tipo numérico para los campos de usuario personalizados, el conjunto de emojis Noto 3D y la vista previa de estilos de los componentes de tema.
- Corrige 15 vulnerabilidades de seguridad, entre ellas filtraciones de respuestas de chat eliminadas y de mensajes privados ocultos, y registros que eludían los dominios de correo permitidos o bloqueados.
- Los miembros que hayan usado el modo anónimo cierran sesión una vez y puede que tengan que volver a activar las notificaciones push.

[Todos los cambios de Discourse](https://github.com/discourse/discourse/compare/v2026.11.0-latest.2...v2026.12.0-latest).`,
    de_DE: `Discourse auf 2026.12.0-latest aktualisiert.

- Fügt direkte Antworten in Chat-Threads, einen Zahlentyp für benutzerdefinierte Benutzerfelder, das Emoji-Set Noto 3D und eine Stilvorschau für Theme-Komponenten hinzu.
- Behebt 15 Sicherheitslücken, darunter die Offenlegung gelöschter Chat-Antworten und verborgener privater Nachrichten sowie Registrierungen, die erlaubte oder gesperrte E-Mail-Domains umgingen.
- Mitglieder, die den anonymen Modus genutzt haben, werden einmalig abgemeldet und müssen Push-Benachrichtigungen gegebenenfalls erneut aktivieren.

[Alle Discourse-Änderungen](https://github.com/discourse/discourse/compare/v2026.11.0-latest.2...v2026.12.0-latest).`,
    pl_PL: `Zaktualizowano Discourse do 2026.12.0-latest.

- Dodano bezpośrednie odpowiedzi w wątkach czatu, typ liczbowy dla niestandardowych pól użytkownika, zestaw emoji Noto 3D oraz podgląd stylów komponentów motywu.
- Naprawiono 15 podatności bezpieczeństwa, w tym wycieki usuniętych odpowiedzi czatu i ukrytych wiadomości prywatnych oraz rejestracje omijające dozwolone lub zablokowane domeny e-mail.
- Członkowie, którzy korzystali z trybu anonimowego, zostaną jednorazowo wylogowani i mogą musieć ponownie włączyć powiadomienia push.

[Pełna lista zmian Discourse](https://github.com/discourse/discourse/compare/v2026.11.0-latest.2...v2026.12.0-latest).`,
    fr_FR: `Discourse mis à jour vers 2026.12.0-latest.

- Ajoute les réponses directes dans les fils de discussion du chat, un type numérique pour les champs utilisateur personnalisés, le jeu d’emojis Noto 3D et l’aperçu des styles des composants de thème.
- Corrige 15 vulnérabilités de sécurité, dont des fuites de réponses de chat supprimées et de messages privés masqués, ainsi que des inscriptions qui contournaient les domaines de courriel autorisés ou bloqués.
- Les membres ayant utilisé le mode anonyme sont déconnectés une fois et devront peut-être réactiver les notifications push.

[Tous les changements de Discourse](https://github.com/discourse/discourse/compare/v2026.11.0-latest.2...v2026.12.0-latest).`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
