import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createServerClient } from "~/utils/supabase.server";

import type { LoaderArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/?index", {
      headers: response.headers,
    });
  }

  return json(
    { session },
    {
      headers: response.headers,
    }
  );
};

export default function Profile() {
  return <div>profile</div>;
}
