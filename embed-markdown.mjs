import { readFile, writeFile } from "fs/promises";
import { marked } from "marked";

try {
  const pageBase = await readFile("_index.html", "utf8");
  const markdown = await readFile("privacy-policy.md", "utf8");
  const html = marked(markdown);

  const page = pageBase.replace("##PRIVACY_POLICY_GOES_HERE##", html);

  // Write the page to docs/index.html
  await writeFile("docs/index.html", page);
} catch (err) {
  console.error(err);
}
