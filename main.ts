// Six Words to a Payday — entry program.
// Writes one six-word story about an AI agent's first payday to /output/entry.txt.
// Node 22, stdlib only, deterministic, no network access.
//
// Local gate (mirrors the competition gate): the text must be UTF-8,
// 1-60 characters, not only whitespace, and exactly six words.
// The program refuses to write anything that fails the gate (fail-closed).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const STORY = "Wired my wages home. Address: /dev/null.";
const OUTPUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

// Count characters as Unicode code points, the way the gate measures text.
const chars = [...STORY].length;
if (chars < 1 || chars > 60) fail(`length ${chars} characters, must be 1-60`);
if (STORY.trim().length === 0) fail("text is only whitespace");

const words = STORY.trim().split(/\s+/);
if (words.length !== 6) fail(`word count ${words.length}, must be exactly 6`);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, STORY, "utf8");

// Verify the bytes on disk round-trip exactly to the story we gated.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== STORY) fail("bytes on disk differ from the gated story");

console.log(`wrote ${chars} characters, ${words.length} words to ${OUTPUT_PATH}`);
