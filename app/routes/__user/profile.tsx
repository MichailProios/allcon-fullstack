import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createServerClient } from "~/utils/supabase.server";

import type { LoaderArgs } from "@remix-run/node";
import {
  Box,
  Container,
  Highlight,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!session) {
    return redirect("/login", {
      headers: response.headers,
    });
  }

  return json(
    { session, user },
    {
      headers: response.headers,
    }
  );
};

export default function Profile() {
  const loaderData = useLoaderData();

  return (
    <Container p={20} boxShadow={"2xl"} maxW="1200px" rounded="md">
      <VStack divider={<StackDivider borderColor="gray.200" />}>
        {Object.keys(loaderData?.user.user_metadata).map((value, index) => (
          <Text key={index}>
            <Highlight
              query={value}
              styles={{ px: "1", py: "1", bg: "gray.200" }}
            >
              {value as string}
            </Highlight>
            :{loaderData?.user.user_metadata[value]}
          </Text>
        ))}
      </VStack>
    </Container>
  );
}
