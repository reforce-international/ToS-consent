# terms.howwe.io

The page users see the first time they sign in to Howwe. It links to the Terms of Service, Privacy Policy and sub-processors on [howwe.io/legal](https://howwe.io/legal/). The user ticks "I have read the Terms of Service, the Privacy Policy and the list of sub-processors, and I agree to the Howwe Terms of Service" and clicks Continue.

Hosted on GitHub Pages from `docs/`. Push to `main` to deploy.

## How the sign-in flow uses it

The Auth0 post-login Action `ToS-consent` (in the `auth0` repo) sends users who have not yet given consent here:

```
https://terms.howwe.io/?state=<auth0 state>&callback=https://<auth0 host>/continue
```

`docs/index.html` shows the notice, a checkbox confirming that the user has read the documents and agrees to the Terms of Service, and a Continue button that is enabled once the box is ticked. Continue sends the user back to the callback with `state` and `agree=true`, and the Action stores the consent on the user.

The callback is only followed when it is `https://<host>/continue` on one of our own Auth0 hosts (`login.howwe.io`, `login.howwe.dev` or `howwe*.eu.auth0.com`). Opened without `state` and `callback`, the page only shows the links, with no checkbox and no button.

## Files

| File | What it is |
| --- | --- |
| `docs/index.html` | The notice for Howwe. Edit it directly. The version shown at the bottom should match the version of the terms on howwe.io/legal |
| `docs/assets/fonts/` | Self-hosted Mulish, so the page makes no requests to Google Fonts |

## Local preview

```bash
npx serve docs
```

Then open http://localhost:3000/ for the plain page, or add `?state=test&callback=https://login.howwe.io/continue` to see the sign-in version with the checkbox and Continue button.
