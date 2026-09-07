import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.0-latest:3',
  releaseNotes: {
    en_US: `Updated Discourse to the September 8 build of 2026.9.0-latest.

- Adds an admin setting to prevent anonymous users from using search and allows the final tag localization to be deleted
- Improves AI translations of category and tag names by including their descriptions
- Fixes login and signup routing, admin report filters, and data updates after code reloads, and allows composer images to be resized down to 25%
- Retires solved and topic-voting badges ahead of Discourse's broader badge retirement

[Full upstream changes](https://github.com/discourse/discourse/compare/5e9779d4cd418af07a6ed01005d558eda76f2f69...b7121264ced14bb0b19d95354ffb2cf7f06a3586)`,
    es_ES: `Discourse se actualizó a la compilación del 8 de septiembre de 2026.9.0-latest.

- Añade una opción de administración para impedir que los usuarios anónimos utilicen la búsqueda y permite eliminar la última localización de una etiqueta
- Mejora las traducciones con IA de los nombres de categorías y etiquetas incluyendo sus descripciones
- Corrige el enrutamiento de inicio de sesión y registro, los filtros de informes de administración y las actualizaciones de datos tras recargar el código, y permite reducir las imágenes del editor hasta el 25 %
- Retira las insignias de temas resueltos y de votación antes de la retirada general de insignias de Discourse

[Cambios completos de upstream](https://github.com/discourse/discourse/compare/5e9779d4cd418af07a6ed01005d558eda76f2f69...b7121264ced14bb0b19d95354ffb2cf7f06a3586)`,
    de_DE: `Discourse wurde auf den Build vom 8. September von 2026.9.0-latest aktualisiert.

- Fügt eine Administratoreinstellung zum Sperren der Suche für anonyme Benutzer hinzu und ermöglicht das Löschen der letzten Tag-Lokalisierung
- Verbessert KI-Übersetzungen von Kategorie- und Tag-Namen durch Einbeziehen ihrer Beschreibungen
- Behebt Weiterleitungen bei Anmeldung und Registrierung, Filter in Administratorberichten und Datenaktualisierungen nach dem Neuladen von Code und erlaubt das Verkleinern von Editorbildern auf bis zu 25 %
- Entfernt Abzeichen für gelöste Themen und Themenabstimmungen vor der allgemeinen Einstellung von Abzeichen in Discourse

[Vollständige Upstream-Änderungen](https://github.com/discourse/discourse/compare/5e9779d4cd418af07a6ed01005d558eda76f2f69...b7121264ced14bb0b19d95354ffb2cf7f06a3586)`,
    pl_PL: `Discourse zaktualizowano do kompilacji 2026.9.0-latest z 8 września.

- Dodaje ustawienie administracyjne blokujące anonimowym użytkownikom dostęp do wyszukiwania i umożliwia usunięcie ostatniego tłumaczenia tagu
- Ulepsza tłumaczenia nazw kategorii i tagów przez AI, uwzględniając ich opisy
- Naprawia przekierowania logowania i rejestracji, filtry raportów administracyjnych oraz aktualizacje danych po przeładowaniu kodu, a także umożliwia zmniejszanie obrazów w edytorze do 25%
- Wycofuje odznaki rozwiązanych tematów i głosowania przed szerszym wycofaniem odznak w Discourse

[Pełna lista zmian upstream](https://github.com/discourse/discourse/compare/5e9779d4cd418af07a6ed01005d558eda76f2f69...b7121264ced14bb0b19d95354ffb2cf7f06a3586)`,
    fr_FR: `Discourse a été mis à jour vers la version du 8 septembre de 2026.9.0-latest.

- Ajoute un paramètre d'administration permettant d'interdire la recherche aux utilisateurs anonymes et permet de supprimer la dernière localisation d'une étiquette
- Améliore les traductions par IA des noms de catégories et d'étiquettes en incluant leurs descriptions
- Corrige la redirection de connexion et d'inscription, les filtres des rapports d'administration et les mises à jour de données après le rechargement du code, et permet de réduire les images du compositeur jusqu'à 25 %
- Retire les badges de sujets résolus et de vote avant le retrait général des badges de Discourse

[Modifications upstream complètes](https://github.com/discourse/discourse/compare/5e9779d4cd418af07a6ed01005d558eda76f2f69...b7121264ced14bb0b19d95354ffb2cf7f06a3586)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
