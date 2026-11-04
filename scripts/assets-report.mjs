// Prints every asset slot still marked placeholder: true (client handover checklist).
// Run: npm run assets:report
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await readFile(path.join(ROOT, "public/media/manifest.json"), "utf8"));
const open = manifest.filter((a) => a.placeholder);

console.log(`${open.length} of ${manifest.length} asset slots are still placeholders:\n`);
for (const a of open) console.log(`  [ ] ${a.src}  (${a.width}x${a.height})`);
