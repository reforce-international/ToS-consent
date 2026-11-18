# terms.howwe.io

The page users see the first time they sign in to Howwe, and again when we ask them to agree to updated terms. It links to the Terms of Service, Privacy Policy and sub-processors on [howwe.io/legal](https://howwe.io/legal/). The user ticks a box confirming that they have read the documents and agree to the Howwe Terms of Service, and clicks Continue.

Hosted on GitHub Pages from `docs/`. Push to `main` to deploy.

## How the sign-in flow uses it

The Auth0 post-login Action `ToS-consent` (in the `auth0` repo) sends users here when they have not given consent, or gave it for an earlier version of the terms:

```
https://terms.howwe.io/?state=<auth0 state>&callback=https://<auth0 host>/continue&reason=<new|update>&termsVersion=<YYYY-MM-DD>
```

| Parameter | What the page does with it |
| --- | --- |
| `state`, `callback` | Required for the sign-in version. See below |
| `reason` | `update` shows the text for users who agreed to an earlier version ("We have updated our terms"). Anything else, or no value, shows the welcome text for new users |
| `termsVersion` | Shown as the version at the bottom when it is a `YYYY-MM-DD` date. Otherwise the version written in the page is shown |
| `previousVersion` | Sent by the Action for updates when it knows the earlier version. Not used |

`reason` and `termsVersion` only have an effect in the sign-in version, that is together with `state` and an allowed `callback`.

`docs/index.html` shows the notice, a checkbox confirming that the user has read the documents and agrees to the Terms of Service, and a Continue button that is enabled once the box is ticked. Continue sends the user back to the callback with `state` and `agree=true`, and the Action stores the consent on the user.

The callback is only followed when it is `https://<host>/continue` on one of our own Auth0 hosts (`login.howwe.io`, `login.howwe.dev` or `howwe*.eu.auth0.com`). Opened without `state` and `callback`, the page only shows the links, with no checkbox and no button.

## When the terms change

1. Publish the new version on howwe.io/legal.
2. Change the version written at the bottom of `docs/index.html` to match.
3. Change the version and the publish time in the Action. Users who agreed to an earlier version are then sent here with `reason=update`.

## Files

| File | What it is |
| --- | --- |
| `docs/index.html` | The notice for Howwe. Edit it directly. The text for updated terms is in `UPDATE_COPY` in the script. The version written at the bottom is used when the page is opened without `termsVersion` and should match the version of the terms on howwe.io/legal |
| `docs/assets/fonts/` | Self-hosted Mulish, so the page makes no requests to Google Fonts |

## Local preview

```bash
npx serve docs
```

Then open http://localhost:3000/ for the plain page, or add `?state=test&callback=https://login.howwe.io/continue` to see the sign-in version with the checkbox and Continue button. Add `&reason=update&termsVersion=2026-10-22` to that to see the version for updated terms.
