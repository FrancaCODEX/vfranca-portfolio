import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// O site é todo estático (SSG): as páginas pré-renderizadas são servidas direto dos assets,
// sem precisar de R2/KV — tudo dentro do plano gratuito.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
