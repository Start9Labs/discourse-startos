import { i18n } from '../i18n'
import { primaryUrl } from '../primaryUrl'

export const primaryUrlTask = primaryUrl.setupTask('critical', {
  reason: i18n(
    'Discourse cannot start without a primary URL. Choose one that is still available.',
  ),
})
