# terms.howwe.io

The page users see the first time they sign in to Howwe. It links to the Terms of Service, Privacy Policy and sub-processors on [howwe.io/legal](https://howwe.io/legal/), and the user continues by clicking Continue.

Hosted on GitHub Pages from `docs/`. Push to `main` to deploy.

## How the sign-in flow uses it

The Auth0 post-login Action `ToS-consent` (in the `auth0` repo) sends users who have not yet given consent here:

```
https://terms.howwe.io/?state=<auth0 state>&callback=https://<auth0 host>/continue
```

`docs/index.html` shows the notice and a Continue button. Continue sends the user back to the callback with `state` and `agree=true`, and the Action stores the consent on the user.

The callback is only followed when it is `https://<host>/continue` on one of our own Auth0 hosts (`login.howwe.io`, `login.howwe.dev` or `howwe*.eu.auth0.com`). Opened without `state` and `callback`, the page shows the links and a button to the app.

## Files

| File | What it is |
| --- | --- |
| `docs/index.html` | The notice for Howwe. Edit it directly. The version shown at the bottom should match the version of the terms on howwe.io/legal |
| `docs/frost.html` | The previous page with the full privacy policy, still used by the Frost tenant (`engine-login.frost.com`). `index.html` sends Frost users there |
| `docs/assets/fonts/` | Self-hosted Mulish, so the page makes no requests to Google Fonts |
| `privacy-policy.md`, `_index.html` | Source of `docs/frost.html`. Regenerate it with `npm run generate` |

## Local preview

```bash
npx serve docs
```

Then open http://localhost:3000/ for the plain page, or add `?state=test&callback=https://login.howwe.io/continue` to see the sign-in version with the Continue button.
