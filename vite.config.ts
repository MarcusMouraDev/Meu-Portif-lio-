import vinext from "vinext";
import { defineConfig } from "vite";

const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

export default defineConfig(async () => {
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: {
          name: "marcus-moura-portfolio",
          // Built-in entry exported by the declared vinext 0.0.50 version.
          main: "vinext/server/app-router-entry",
          compatibility_date: "2026-02-12",
          compatibility_flags: ["nodejs_compat"],
          assets: { binding: "ASSETS", not_found_handling: "none" },
        },
      }),
    ],
  };
});
