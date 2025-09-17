import {
  getAssetFromKV,
  mapRequestToAsset,
} from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    try {
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
        }
      );
    } catch (e) {
      // Handle cases where the file is not found
      const pathname = new URL(request.url).pathname;
      if (pathname.endsWith("/") || pathname.match(/\.\w+$/) === null) {
        // For directory-like paths, serve index.html
        return env.__STATIC_CONTENT.get(
          assetManifest["index.html"]
        );
      }
      return new Response("Not Found", { status: 404 });
    }
  },
};