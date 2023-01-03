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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
import { Link } from "@remix-run/react";

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
      <Breadcrumb display={{ base: "none", md: "flex" }}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/about">
            About
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/about/executives">
            Executives
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing="26px">
        <Heading textAlign="center">Executives</Heading>

        <AnimatePresence>
          {data.profiles.map((value: any, index: any) => (
            <RenderIfVisible key={index} defaultHeight={800}>
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
                    <AspectRatio
                      ratio={1}
                      h={{ base: "250px", md: "300px", lg: "350px" }}
                      w={{ base: "250px", md: "300px", lg: "350px" }}
                      display={{ base: "flex", xl: "none" }}
                    >
                      <ClientOnly>
                        {() => (
                          <Suspense fallback={<Skeleton w="full" h="full" />}>
                            <ErrorBoundary FallbackComponent={ErrorFallback}>
                              <RemixImage
                                rounded="full"
                                objectFit="cover"
                                image={value.image}
                                boxShadow="xl"
                                draggable={false}
                                userSelect="none"
                                loading="lazy"
                                objectPosition="50% 20%"
                                border="2px"
                                borderColor="primary.400"
                              />
                            </ErrorBoundary>
                          </Suspense>
                        )}
                      </ClientOnly>
                    </AspectRatio>
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
