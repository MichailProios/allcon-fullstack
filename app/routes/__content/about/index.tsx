import {
  Container,
  Heading,
  VStack,
  Text,
  Divider,
  Card,
  CardBody,
  Skeleton,
  Avatar,
  AspectRatio,
} from "@chakra-ui/react";
import { ClientOnly } from "remix-utils";
import { Suspense, Fragment } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import RenderIfVisible from "react-render-if-visible";
import { AnimatePresence, motion } from "framer-motion";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { profiles } from "~/utils/profiles";
import RemixImage from "~/components/RemixImage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "~/components/ErrorFallback";
import { createServerClient } from "~/utils/supabase.server";

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - About`,
  description: `Allcon Contracting is built on a reputation of delivering high
              quality projects serving a variety of private and public clients
              throughout New York State.`,

  "og:title": "Allcon Contracting - About",
  "og:type": "business",
  "og:site_name": "Allcon Contracting",
  "og:description": `Allcon Contracting is built on a reputation of delivering high
              quality projects serving a variety of private and public clients
              throughout New York State.`,
  "og:image":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/b4fadc27-355f-443d-f1d2-a3efc3905200/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/b4fadc27-355f-443d-f1d2-a3efc3905200/meta",
  "og:url": "https://allconcontracting.com/about",
});

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    const company =
      "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/b4fadc27-355f-443d-f1d2-a3efc3905200/public";

    const response = new Response();
    const supabase = createServerClient({ request, response });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return json(
      {
        allconStaff: company,
        profiles: Array.from(profiles.values()),
      },
      {
        headers: response.headers,
      }
    );
  } catch (error) {
    throw error;
  }
};

export default function About() {
  const data = useLoaderData();

  return (
    <Container maxW="1200px" px={{ base: 3, md: 6 }} py={14}>
      <VStack spacing="26px">
        <Heading textAlign="center">About Us</Heading>
        <motion.div
          layout
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{
            type: "spring",
            mass: 0.5,
          }}
        >
          <VStack spacing="26px">
            <Text fontSize="xl" textAlign={{ base: "start", sm: "justify" }}>
              Allcon Contracting is a renowned provider of high-quality
              construction services to private and public clients across New
              York State. Our executive team prioritizes teamwork and hands-on
              involvement to ensure that all projects are completed efficiently
              and within budget. Our dedicated staff is meticulous in their
              attention to detail and consistently goes the extra mile to
              deliver exceptional results. Our team of architects, planners,
              designers, and construction specialists work collaboratively to
              bring their unique talents and expertise to every project.
            </Text>
            <AspectRatio ratio={{ base: 4 / 3, md: 16 / 9 }} w="full">
              <ClientOnly>
                {() => (
                  <Suspense fallback={<Skeleton w="full" h="full" />}>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                      <RemixImage
                        image={data.allconStaff}
                        boxShadow="xl"
                        rounded="md"
                        userSelect="none"
                        draggable={false}
                        loading="lazy"
                      />
                    </ErrorBoundary>
                  </Suspense>
                )}
              </ClientOnly>
            </AspectRatio>
          </VStack>
        </motion.div>
      </VStack>
    </Container>
  );
}
