// entry.client.tsx
import React, { useState } from "react";
// import { hydrate } from "react-dom";
import { CacheProvider } from "@emotion/react";
import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

import { ClientStyleContext } from "app/styles/context";
import createEmotionCache from "app/styles/createEmotionCache";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrateRoot(
  document,
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>
);
