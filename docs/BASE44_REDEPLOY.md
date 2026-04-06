# Base44: when the live site is behind GitHub

## Symptom

- A route exists in `src/App.jsx` and `npm run build` works locally, but production still shows **404 Page Not Found** for that path.
- View source on `https://operator.ink/` and note the script URL, e.g. `/assets/index-XXXX.js`.
- If that **filename stays the same** for days after you push to `main`, the edge is serving an **old bundle** that does not include the new routes.

## Fix

1. Open the **Base44** dashboard for this app.
2. **Redeploy** or **Sync / Pull latest** from GitHub branch `main` (exact control name depends on Base44 UI).
3. Wait for the build to finish, then hard-refresh or open the site in a private window.
4. Confirm the main script hash in view source **changed** and the new route loads.

## Verify (PowerShell)

```powershell
$h = (Invoke-WebRequest "https://operator.ink/" -UseBasicParsing).Content
[regex]::Match($h, 'src="/assets/(index-[^"]+\.js)"').Groups[1].Value
```

Compare the hash before and after deploy; it should change when a new bundle is published.
