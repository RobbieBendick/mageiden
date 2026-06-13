# mageiden

Landing page and TBC Anniversary armory for Mageiden coaching.

## Development

```sh
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` and add your Blizzard API credentials plus featured mage realm/name values.

## GitHub Pages

The site deploys automatically from the `dev` branch to:

**https://robbiebendick.github.io/mageiden/**

### One-time GitHub setup

1. Open **Settings → Pages** in the repo.
2. Set **Source** to **GitHub Actions**.
3. Add these **Actions secrets** (Settings → Secrets and variables → Actions):

| Secret | Value |
|--------|--------|
| `BLIZZARD_CLIENT_ID` | Blizzard API client ID |
| `BLIZZARD_CLIENT_SECRET` | Blizzard API client secret |
| `BLIZZARD_REGION` | `us`, `eu`, `kr`, or `tw` |
| `ALLIANCE_MAGE_REALM` | Realm slug for featured Alliance mage |
| `ALLIANCE_MAGE_NAME` | Character name |
| `HORDE_MAGE_REALM` | Realm slug for featured Horde mage |
| `HORDE_MAGE_NAME` | Character name |

4. Push to `dev` — the workflow in `.github/workflows/deploy.yml` builds and publishes.

### Local Pages build

```powershell
$env:BASE_PATH="/mageiden"
pnpm run build
pnpm run preview
```

Armory pages are **prerendered at build time** using the secrets/env above. Only the featured mage URLs are generated; arbitrary character lookups are not supported on static hosting.

### Custom domain

If you add a custom domain at the repo root, set `BASE_PATH` to empty in the workflow and rebuild.
