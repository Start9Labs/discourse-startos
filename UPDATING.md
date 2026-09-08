# Updating the upstream version

Upstream is the prebuilt `discourse/discourse` image, pinned by tag and digest in `startos/manifest/index.ts`. Nothing is built from source here, and there is no submodule.

## Which line this package tracks

Discourse publishes two lines to the same repository from the same pipeline, cut on the same dates:

- **`main`** — `2026.9.0-latest`, `2026.10.0-latest` … The `-latest` suffix marks it. **This is the line this package tracks**, and `discourse/discourse:latest` points at it.
- **stable** — `2026.7.0`, `2026.7.1`, `2026.7.2` … No suffix, numbered two behind the `main` line.

**Do not move this package to the stable line.** It is not a matter of taste:

- Stable point releases carry backports and **no new migrations** — `2026.7.0`, `.1` and `.2` all sit at migration `20260721122254`, while the `main` line had advanced to `20260824072257`.
- Discourse has no schema downgrade. Once an installed database has run migrations from the `main` line, a stable image cannot serve it.
- `lib/backup_restore/meta_data_handler.rb` refuses a backup whose schema version exceeds the running instance's, so a stable-pinned package cannot accept a backup from a `main`-line instance — which is what upstream's standard `launcher` install produces.

Moving lines is a one-way door for every installed server. Treat it as a decision, not a bump.

## Determining the upstream version

**The upstream version is the tag name.** A bump is due only when a newer tag appears: the next line (`2026.10.0-latest`) or a point tag on the current one (`2026.9.0-latest.1`). The newest:

```bash
curl -s "https://hub.docker.com/v2/repositories/discourse/discourse/tags?page_size=50&ordering=last_updated" \
  | jq -r '.results[].name' | grep -E -- '-latest(\.[0-9]+)?$' | head
```

Compare it with the tag in the pin. **If the tag is unchanged there is no upstream release — print `no changes` and stop, whatever the digest behind it says.** Upstream rebuilds the current tag of every line nightly, so that digest moves every day; a bump per rebuild is a release per day with nothing in it. The digest is refreshed when the tag moves, and on demand (below).

Confirm the new tag ships both architectures before pinning it — upstream has published single-arch tags in the past:

```bash
docker manifest inspect discourse/discourse:<tag> | jq -r '.manifests[].platform.architecture'
```

## The tag is mutable — pin the digest

`discourse/discourse:2026.9.0-latest` is **rebuilt in place**. Its git tag is cut when
the release line begins, while nightly image builds continue taking newer `main` commits
and schema migrations. The tag name identifies a release line, not a build, so on its own
it does not identify a schema level — and a schema level is exactly what decides whether
a backup from another instance can be restored.

So the pin carries both: the tag for a human, the digest for the machine. Take the digest
current on the day of the bump:

```bash
docker buildx imagetools inspect discourse/discourse:<tag> --format '{{.Manifest.Digest}}'
```

Take the **index** digest (`application/vnd.oci.image.index.v1+json`), not a per-platform
one — the index is what covers both architectures.

## Applying the bump

1. Set `images.discourse.source.dockerTag` in `startos/manifest/index.ts` to
   `discourse/discourse:<tag>@<index-digest>`.
2. Set `version` in `startos/versions/current.ts` to `<tag>:0` — the `-latest` suffix included, so ExVer parses it as a prerelease and the line stays monotonic (`2026.9.0-latest` < `2026.10.0-latest`). Write release notes in all five locales.
3. Check whether the image's PostgreSQL major moved — `docker run --rm discourse/discourse:<tag> printenv PG_MAJOR`. If it did, the `postgres` image tag and `POSTGRES_PGDATA_SUBPATH` in `startos/utils.ts` must move with it, and the upgrade needs a `pg_upgrade` path: a PostgreSQL data directory is not readable by a different major version.
4. Check whether the bundled plugin set changed — `docker run --rm discourse/discourse:<tag> ls /var/www/discourse/plugins`. A plugin leaving core is a plugin an installed forum loses.

Schema migrations and asset compilation run from `startos/init/prepareStack.ts` on the version edge, so nothing else needs touching for an ordinary bump.

Discourse advises against skipping long stretches of releases; if the pin has fallen more than a year behind, step through an intermediate tag rather than jumping straight to the newest.

## Refreshing the digest on demand

Between tag moves the pin holds one nightly build, so the package's schema level sits behind `main` for the rest of the release line. That matters in exactly one situation: restoring a backup from an instance that is ahead of it — a `launcher` install, which tracks `tests-passed`, or Start9's own forum when it migrates onto this package. The restore is refused until the package catches up.

Catch it up as a revision bump, only when asked and right before the restore: re-pin the current index digest of the **same** tag and set `version` to `<tag>:<N+1>`. Steps 3 and 4 above still apply.
