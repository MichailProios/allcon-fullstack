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

export default function Executives() {
  const data = useLoaderData();

  return (
    <Container maxW="1200px" px={{ base: 3, md: 6 }} py={14}>
      <VStack spacing="26px">
        <Heading textAlign="center">Executives</Heading>

        <AnimatePresence>
          {data.profiles.map((value: any, index: any) => (
            <RenderIfVisible key={index} defaultHeight={1200}>
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
                <Card
                  variant="elevated"
                  direction={{ base: "column", xl: "row" }}
                  rounded="md"
                  boxShadow="xl"
                  w="full"
                >
                  <AspectRatio
                    ratio={9 / 16}
                    w="340px"
                    display={{ base: "none", xl: "flex" }}
                  >
                    <ClientOnly>
                      {() => (
                        <Suspense fallback={<Skeleton w="full" h="full" />}>
                          <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <RemixImage
                              roundedTopLeft="md"
                              roundedBottomLeft="md"
                              objectFit="cover"
                              image={value.image}
                              boxShadow="xl"
                              draggable={false}
                              userSelect="none"
                              loading="lazy"
                            />
                          </ErrorBoundary>
                        </Suspense>
                      )}
                    </ClientOnly>
                  </AspectRatio>
                  <CardBody
                    display="flex"
                    flexDirection="column"
                    justifyContent={{ base: "center", xl: "stretch" }}
                    alignItems={{ base: "center", xl: "stretch" }}
                    w="100%"
                  >
                    <Avatar
                      h={{ base: "250px", md: "300px", lg: "350px" }}
                      w={{ base: "250px", md: "300px", lg: "350px" }}
                      showBorder={true}
                      borderColor="primary.400"
                      name={value.name}
                      src={value.image}
                      mb="5px"
                      display={{ base: "flex", xl: "none" }}
                    />
                    <Heading fontSize="2xl">{value.title}</Heading>
                    <Text
                      fontSize="xl"
                      textColor="gray"
                      textAlign={{ base: "center", xl: "start" }}
                    >
                      {value.subtitle}
                    </Text>

                    <Text
                      py="2"
                      fontSize="xl"
                      textAlign={{ base: "start", sm: "justify" }}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: value.description,
                        }}
                      />
                    </Text>
                  </CardBody>
                </Card>
              </motion.div>
            </RenderIfVisible>
          ))}
        </AnimatePresence>
      </VStack>
    </Container>
  );
}
