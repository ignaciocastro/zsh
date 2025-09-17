import {
  getAssetFromKV,
  mapRequestToAsset,
} from "@cloudflare/kv-asset-handler";

/**
 * The DEBUG determines if the asset handler will cache requests
 * on edge locations, or bypass the cache and go straight to the origin.
 */
const DEBUG = false;

addEventListener("fetch", (event) => {
  try {
    event.respondWith(
      handleEvent(event).catch((e) => {
        return new Response(e.message || e.toString(), {
          status: 500,
        });
      })
    );
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        })
      );
    }
    event.respondWith(new Response("Internal Error", { status: 500 }));
  }
});

async function handleEvent(event) {
  const url = new URL(event.request.url);
  let options = {};

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      };
    }
    
// This tells the script to use the SITE_ASSETS binding
    options.ASSET_NAMESPACE = SITE_ASSETS;
    
    return await getAssetFromKV(event, options);
  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        const notFoundOptions = {
          ...options,
          mapRequestToAsset: (req) =>
            new Request(`${new URL(req.url).origin}/404.html`, req),
        };
        let notFoundResponse = await getAssetFromKV(event, notFoundOptions);

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 404,
        });
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 });
  }
}