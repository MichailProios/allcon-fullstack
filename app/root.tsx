import React, { useContext, useEffect, useState } from "react";
import { withEmotionCache } from "@emotion/react";
import {
  ChakraProvider,
  ColorModeScript,
  cookieStorageManagerSSR,
  localStorageManager,
} from "@chakra-ui/react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { createServerClient } from "~/utils/supabase.server";
import type { LoaderFunction } from "@remix-run/node";
import { useCatch, useFetcher, useLoaderData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";

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

import swiperStyles from "app/styles/swiper.css";
import type { SupabaseClient, Session } from "@supabase/auth-helpers-remix";
import type { Database } from "~/utils/db_types";
import type { LoaderArgs } from "@remix-run/node";

export type TypedSupabaseClient = SupabaseClient<Database>;
export type MaybeSession = Session | null;

export type SupabaseContext = {
  supabase: TypedSupabaseClient;
  session: MaybeSession;
};

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
    {
      rel: "stylesheet",
      href: swiperStyles,
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

export async function action({ request }: { request: Request }) {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  await supabase.auth.signOut();

  return redirect("/login", {
    headers: response.headers,
  });
}

export const loader: LoaderFunction = async ({ request }: any) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id)
    .limit(1)
    .single();

  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  return json(
    { session, user, profile, env, supabase },
    {
      headers: response.headers,
    }
  );
};

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
  const { env, session, user, profile } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );

  const serverAccessToken = session?.access_token;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        fetcher.submit(null, {
          method: "post",
          action: "/handle-supabase-auth",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, fetcher]);

  return (
    <Document>
      <Layout>
        <Outlet context={{ supabase, session, user, profile }} />
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
