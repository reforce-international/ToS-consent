The final index.html file, in /docs, is generated based on the html template in `/_index.html` and the markdown file in `/privacy-policy.md`.

When ever \_index.html or privacy-policy.md is updated and you want to preview (and/or publish) the changes, run the following command in the terminal:

```bash
$ node embed-markdown.mjs
```
