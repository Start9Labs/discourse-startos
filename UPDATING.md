# Updating the upstream version

Upstream is the prebuilt `discourse/discourse` image, pinned by tag in `startos/manifest/index.ts`. Nothing is built from source here, and there is no submodule.

## Determining the upstream version

Discourse publishes two lines to the same repository, and the tag suffix is what tells them apart:

- **Stable** — `2026.7.2`, `2026.7.1`, `2026.6.3` … A plain `YYYY.M.PATCH` tag with no suffix. This is the line to follow.
- **Monthly from `main`** — `2026.9.0-latest`. The `-latest` suffix marks it; do not pin one.

`stable` and `esr` also exist as moving aliases; `esr` currently trails the stable line by several months. Pin an exact tag either way, never a moving one.

The newest stable tag:

```bash
curl -s "https://hub.docker.com/v2/repositories/discourse/discourse/tags?page_size=50&ordering=last_updated" \
  | jq -r '.results[].name' | grep -vE -- '-(latest|amd64|arm64)' | head
```

Confirm it ships both architectures before pinning it — upstream has published single-arch tags in the past:

```bash
docker manifest inspect discourse/discourse:<tag> | jq -r '.manifests[].platform.architecture'
```

The application version inside the image is `lib/version.rb`'s `STRING`, which matches the tag.

## Applying the bump

1. Set `images.discourse.source.dockerTag` in `startos/manifest/index.ts`.
2. Set `version` in `startos/versions/current.ts` to `<upstream>:0`, keeping the same `YYYY.M.PATCH` form, and write release notes in all five locales.
3. Check whether the image's PostgreSQL major moved — `docker run --rm discourse/discourse:<tag> printenv PG_MAJOR`. If it did, the `postgres` image tag and `POSTGRES_PGDATA_SUBPATH` in `startos/utils.ts` must move with it, and the upgrade needs a `pg_upgrade` path: the PostgreSQL data directory is not readable by a different major version.

Nothing else needs touching for an ordinary bump. Schema migrations and asset compilation run from `startos/init/prepareStack.ts` on the version edge.

Discourse advises against skipping long stretches of releases; if the pin has fallen more than a year behind, step through an intermediate stable tag rather than jumping straight to the newest.
