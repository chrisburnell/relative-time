import { customElementsManifestToMarkdown } from "@custom-elements-manifest/to-markdown";
import fs from "fs";

const manifest = JSON.parse(fs.readFileSync("./custom-elements.json", "utf-8"));
const markdown = customElementsManifestToMarkdown(manifest);

fs.writeFileSync("./custom-elements.md", markdown);
