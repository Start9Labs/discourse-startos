export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Discourse': 0,
  'Web Interface': 1,
  'The forum is ready': 3,
  'Waiting for the application server': 4,
  Email: 5,
  'Email is configured': 6,
  'Without email, nobody can sign up or reset a password. Use the Configure SMTP action to enable it.': 7,

  // interfaces.ts
  'The Discourse forum, including the admin panel': 2,

  // init/
  'Migrating the database': 8,
  'Compiling assets': 9,
  'Discourse cannot start without a primary URL. Choose one that is still available.': 10,
  'Create the administrator account before anyone signs up, so the forum is not claimed by the first visitor.': 11,

  // actions/setPrimaryUrl.ts
  URL: 12,
  'Set Primary URL': 13,
  'Choose the address Discourse treats as its own. Every absolute link it writes — email notifications, invites, password resets, social previews — is built from this, so it should be the address people actually use. Discourse restarts to apply the change.': 14,
  'Links already written into existing posts keep the old address. Discourse ships a remap command for rewriting them.': 15,

  // actions/setAdminPassword.ts
  'Email Address': 16,
  'The address this account signs in with. It does not have to be reachable — Discourse only sends to it once email is configured.': 17,
  'Set Admin Password': 18,
  'Create the administrator account, or issue it a new password. Discourse itself gates sign-up behind an activation email, so on a server with no email configured this is the way in.': 19,
  'Administrator Account': 20,
  'Sign in at the web interface with these credentials. The password is shown once — store it now.': 21,
  Username: 22,
  Password: 23,

  // actions/configureSmtp.ts
  'Configure SMTP': 24,
  'Give Discourse an outbound mail server. Sign-up activation, password resets, invites and notification digests all depend on it — without one, only accounts created from StartOS can sign in. Discourse restarts to apply the change.': 25,

  // actions/setWorkerCount.ts
  'Web Workers': 26,
  'How many requests Discourse serves at once. Each worker costs roughly 250 MB of memory; one is enough for a small community, and a busy forum on a machine with memory to spare benefits from more.': 27,
  'Set Worker Count': 28,
  'Trade memory for concurrency. Discourse restarts to apply the change.': 29,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
