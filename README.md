## Privacy Policy

The final index.html file, in /docs, is generated based on the html template in `/_index.html` and the markdown file in `/privacy-policy.md`.

The live version can be found at https://terms.howwe.io/.

# Development

To generate a new docs/index.html file based on the latest changes to `/_index.html` and `/privacy-policy.md`, run the following command in the terminal:

```bash
$ npm run generate
```

Or if you want to have the file generated automatically whenever you make changes to any of the files, run the following command in the terminal:

```bash
$ npm run dev
```

# Deployment

The site is hosted on GitHub Pages.
Just push to main and the changes will be deployed automatically.

> [!NOTE]
> Remember to generate a new docs/index.html file before pushing to main. See [Development](#development) for more information.
