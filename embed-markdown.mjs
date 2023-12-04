import { readFile, writeFile } from "fs/promises";
import { marked } from "marked";

const MD_FILE = "privacy-policy.md";
const HTML_BASE_FILE = "_index.html";
const HTML_OUTPUT_FILE = "docs/index.html";

try {
  const pageBase = await readFile(HTML_BASE_FILE, "utf8");
  const markdown = await readFile(MD_FILE, "utf8");
  const html = marked(markdown);

  const page = pageBase
    .replace("##PRIVACY_POLICY_GOES_HERE##", html)
    .replace(
      "##GENERATED_FILE_COMMENT_GOES_HERE##",
      `<!-- DO NOT EDIT! This is a generated file and will be overwritten. If you want to change the contents do so in either ../${HTML_BASE_FILE} or ../${MD_FILE} -->`
    );

  // Write the page to docs/index.html
  await writeFile(HTML_OUTPUT_FILE, page);
  console.log(
    `Success: contents of ${HTML_OUTPUT_FILE} written to ${HTML_OUTPUT_FILE}`
  );
} catch (err) {
  console.error(err);
}
