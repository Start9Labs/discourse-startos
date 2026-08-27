# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Fix a defect you spot rather than reporting it** — you have the package open and the
context to be sure. File **a GitHub issue on this repo** only when the call isn't yours to
make: you can't pin the cause down, two defensible fixes exist, or it's too large to ride on
the work in hand. An open issue is a report, not a queue — implement one when you're asked
to or when it's labelled `Approved`, then close it with `Closes #<n>`.

Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **`main` must not read the whole store with `.const()`.** `set-admin-password` writes `adminEmail`, and a read spanning it would restart Discourse the instant a user creates their account. Add a key to the projection only if changing it should restart the service.
- **`prepareStack` must stay free of `.const()`.** An init handler re-runs from the top on every change to anything it reads reactively, and this one costs a full asset compile. That is why it resolves SMTP to `null` rather than calling `getSmtpCredentials`, which reads the system SMTP settings reactively.
- **A `DISCOURSE_*` variable shadows the site setting of the same name and hides it from the admin panel** (`lib/site_setting_extension.rb`). Adding one to `discourseEnv` takes that setting away from the administrator, so only put a setting there the package genuinely owns.
- **`DISCOURSE_DB_SOCKET` must stay set to the empty string.** Discourse prefers a unix socket when it is unset, and the sidecar is reachable only over TCP.
- **Anything that execs into the app image must run the image's own `/etc/runit/1.d` scripts itself.** The entrypoint runs them; a bare `exec` does not. `00-ensure-links` populates `/shared`, without which `rake` dies on a dangling `public/uploads`; `copy-env` writes `config/discourse.conf`, without which the `DISCOURSE_*` environment reaches Discourse only through a fallback provider that a shipped `discourse.conf` would silently displace.
- **The primary URL splits into `DISCOURSE_HOSTNAME` and `DISCOURSE_PORT`.** A StartOS `.local` address carries a per-service port, and Discourse builds absolute links from the two settings separately.
