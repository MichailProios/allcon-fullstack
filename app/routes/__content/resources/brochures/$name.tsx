import {
  Box,
  Heading,
  Container,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { createServerClient } from "~/utils/supabase.server";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Brochures`,
  description: `Allcon Contracting Brochures.`,

  "og:title": "Allcon Contracting - Brochures",
  "og:type": "business",
  "og:site_name": "Allcon Contracting",
  "og:description": `Allcon Contracting Brochures.`,
  "og:image":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "og:url": "https://allconcontracting.com/resources/brochures",
});

export const loader: LoaderFunction = async ({ request, params }: any) => {
  try {
    const response = new Response();
    const supabase = createServerClient({ request, response });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data } = await supabase.storage
      .from("brochures")
      .getPublicUrl(params?.name);

    return json(
      { data, name: params?.name },
      {
        headers: response.headers,
      }
    );
  } catch (error) {
    throw error;
  }
};

export default function Brochures() {
  const loaderData = useLoaderData();

  return (
    <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={14}>
      <Breadcrumb display={{ base: "none", md: "flex" }}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/resources">
            Resources
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/resources/brochures">
            Brochures
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to={`/resources/brochures/${loaderData?.name}`}
          >
            {loaderData?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing="26px">
        <Heading textAlign="center">{loaderData?.name}</Heading>
        <Box rounded="md" w="full" h="80vh">
          <iframe
            title={loaderData?.name}
            src={`https://docs.google.com/viewer?url=${loaderData?.data?.publicUrl}&embedded=true`}
            height="100%"
            width="100%"
            style={{ borderRadius: "0.375rem" }}
          />
        </Box>
      </VStack>
    </Container>
  );
}
