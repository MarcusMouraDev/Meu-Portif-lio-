import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("..", import.meta.url));

test("o checkout contém os imports locais e a entrada Worker do Vite", () => {
  const configPath = resolve(root, "vite.config.ts");
  const config = readFileSync(configPath, "utf8");
  const references = [...config.matchAll(/from\s+["'](\.[^"']+)["']/g)].map((match) => match[1]);
  const main = config.match(/main:\s*["'](\.[^"']+)["']/);
  if (main) references.push(main[1]);
  const missing = references.filter((reference) => {
    const target = resolve(dirname(configPath), reference);
    return !["", ".ts", ".tsx", ".js", ".mjs", "/index.ts"].some((extension) => existsSync(`${target}${extension}`));
  });
  assert.deepEqual(missing, [], `Arquivos necessários ausentes: ${missing.join(", ")}`);
});

test("a imagem dos metadados sociais existe nos assets públicos", () => {
  const layout = readFileSync(resolve(root, "app/layout.tsx"), "utf8");
  const image = layout.match(/const socialImage = `\$\{siteUrl\}(\/[^`]+)`/);
  assert.ok(image, "Os metadados devem declarar a imagem social");
  assert.ok(existsSync(resolve(root, `public${image[1]}`)), `Asset público ausente: ${image[1]}`);
});
