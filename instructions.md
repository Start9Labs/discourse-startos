# Discourse

## Documentation

- [Admin quick start](https://github.com/discourse/discourse/blob/main/docs/ADMIN-QUICK-START-GUIDE.md) — what to do in the admin panel once your forum is up.
- [Configuring email](https://github.com/discourse/discourse/blob/main/docs/INSTALL-email.md) — choosing a mail provider and what each SMTP setting means.
- [Installing plugins](https://github.com/discourse/discourse/blob/main/docs/PLUGINS.md) — how Discourse plugins work and what they can change.

## What you get on StartOS

A complete Discourse forum: the web interface, the admin panel, the background job worker, a PostgreSQL database and a Redis-compatible cache, all managed for you. Posts, accounts, uploads and site settings live on your server and are captured by StartOS backups.

Discourse builds every absolute link it writes — email notifications, invites, password resets, link previews — from a single address it treats as its own. On StartOS you choose that address, and you can change it later.

## Getting set up

1. Start Discourse from its service page.
2. Open the **Actions** tab and run **Set Admin Password**. Enter the email address you want to sign in with; Discourse generates a password and shows it to you once. Copy it before closing the dialog.
3. Open the web interface and sign in with those credentials.
4. Work through Discourse's own setup wizard — site name, description, logo, who can see the forum.
5. If you plan to invite other people, run **Configure SMTP** first. Discourse sends an activation email to every new account, so without a mail server nobody but you can sign in.
6. If you reach the forum at a public domain rather than its `.local` address, run **Set Primary URL** and choose that domain.

## Using Discourse

### Web interface

The forum itself, with the admin panel at `/admin` once you are signed in as an administrator. A fresh forum is publicly readable and open to sign-ups; change that under **Admin → Settings → Login** if you want it private.

### Actions

- **Set Admin Password** — creates the administrator account, or issues it a new password. Run it again any time you need to get back in.
- **Configure SMTP** — points Discourse at a mail server, either the one StartOS provides or your own. Required before anyone else can register or reset a password.
- **Set Primary URL** — chooses which of your addresses Discourse treats as canonical. Links already written into existing posts keep the old address.
- **Set Worker Count** — trades memory for the number of requests Discourse serves at once. One worker suits a small community; raise it if the forum feels slow and the server has memory to spare.

Each of these restarts Discourse to take effect.

### Moving an existing forum here

Discourse's own backups carry a forum across servers. On the old server, open **Admin → Backups**, create a backup with uploads, and download it. Here, run **Set Primary URL** first and choose the address the forum will actually be reached at — the restore rewrites every link in the forum to whichever address is current, and there is no undo. Then turn on **allow restore** under **Admin → Settings → Backups**, upload the file on the Backups page and choose **Restore**. Discourse switches off outgoing email for everyone but staff during a restore; turn it back on under **Admin → Settings → Email → disable emails** once you have checked the forum over. Run **Configure SMTP** here as well — mail settings do not travel with the backup.

### Updates

Discourse's admin panel normally offers an in-app upgrade button. It is removed here — new Discourse versions arrive as StartOS updates instead, which keeps the database, the compiled assets and the application in step.

## Limitations

Sign-up requires a working mail server. Until you run **Configure SMTP**, the only account that can sign in is the one **Set Admin Password** creates — Discourse's own hosted login service is not enabled, so there is no other way in.
