import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.0-latest:3',
  releaseNotes: {
    en_US: `Discourse sees each visitor's real IP address, so its per-visitor rate limits, IP-based moderation tools and login history work correctly.`,
    es_ES: `Discourse ve la dirección IP real de cada visitante, por lo que sus límites de peticiones por visitante, las herramientas de moderación basadas en IP y el historial de inicio de sesión funcionan correctamente.`,
    de_DE: `Discourse sieht die echte IP-Adresse jedes Besuchers, sodass seine Anfragelimits pro Besucher, IP-basierten Moderationswerkzeuge und der Anmeldeverlauf korrekt funktionieren.`,
    pl_PL: `Discourse widzi prawdziwy adres IP każdego odwiedzającego, dzięki czemu limity żądań na odwiedzającego, narzędzia moderacji oparte na IP i historia logowań działają poprawnie.`,
    fr_FR: `Discourse voit la véritable adresse IP de chaque visiteur, de sorte que ses limites de requêtes par visiteur, ses outils de modération basés sur l'IP et l'historique des connexions fonctionnent correctement.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
