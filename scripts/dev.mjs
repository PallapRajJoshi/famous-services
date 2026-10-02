// `npm run dev`: rebuilds the picture list, then starts Next.js and keeps watching public/images,
// so a photo you drop into the folder shows up without restarting.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { build } from "./build-images.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
build();

let timer;
try {
  fs.watch(path.join(root, "public", "images"), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => build(), 300);
  });
} catch {
  console.log("[images] could not watch the folder; run `npm run images` after adding pictures.");
}

const require = createRequire(import.meta.url);
const next = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "dev", ...process.argv.slice(2)], { stdio: "inherit", cwd: root });
next.on("exit", (code) => process.exit(code ?? 0));
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => next.kill(sig));
