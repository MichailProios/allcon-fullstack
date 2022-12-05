import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { useCatch } from "@remix-run/react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";

import { ServerStyleContext, ClientStyleContext } from "app/styles/context";

import Layout from "app/components/Layout";
import Catch from "app/components/Catch";
import Error from "app/components/Error";

import theme from "app/styles/theme";

import global from "app/styles/global.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Allcon Contracting",
  description: "Infinite Possibilities through Integrated Solutions.",

  "og:title": "Allcon Contracting",
  "og:type": "business",
  "og:site_name": "Allcon Contracting",
  "og:description": "Infinite Possibilities through Integrated Solutions.",
  "og:image":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4aee4395-0887-4070-980f-427a13fdb400/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4aee4395-0887-4070-980f-427a13fdb400/meta",
  "og:url": "https://allconcontracting.com",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    // { rel: "preconnect", href: "https://fonts.googleapis.com" },
    // { rel: "preconnect", href: "https://fonts.gstatic.com" },
    // {
    //   rel: "stylesheet",
    //   type: "text/css",
    //   charSet: "UTF-8",
    //   href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
    // },
    // {
    //   rel: "stylesheet",
    //   type: "text/css",
    //   href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
    // },
    {
      rel: "stylesheet",
      type: "text/css",
      href: "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css",
    },

    {
      rel: "stylesheet",
      href: global,
    },

    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.ico",
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>

        <body style={{ height: "100%", overflow: "overlay" }}>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <Layout>
        <Error error={error} />
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document>
      <Layout>
        <Catch caught={caught} />
      </Layout>
    </Document>
  );
}
