// SPDX-License-Identifier: MIT
// Copies entry.txt next to this script into $MAKEFUN_OUTPUT_DIR/entry.txt.
// The entry is read as UTF-8 text and written back byte-for-byte so the
// output is deterministic regardless of the working directory.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
const text = readFileSync(join(dir, "entry.txt"), "utf8");
if (text.trim().length === 0) {
  throw new Error("entry.txt is empty");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
