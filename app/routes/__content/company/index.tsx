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
  Stack,
  CardFooter,
  AvatarGroup,
  useBreakpointValue,
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
import { ArrowForwardIcon } from "@chakra-ui/icons";
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

export default function About() {
  const data = useLoaderData();

  const maxAvatars = useBreakpointValue(
    { base: 1, xs: 2, sm: 3, smd: 4, md: 5, xmd: 1, lg: 2 },
    { fallback: "lg", ssr: true }
  );

  return (
    <>
      <Container maxW="1200px" px={{ base: 3, md: 6 }} py={14}>
        <VStack spacing="26px">
          <Heading textAlign="center">Company Overview</Heading>
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
                involvement to ensure that all projects are completed
                efficiently and within budget. Our dedicated staff is meticulous
                in their attention to detail and consistently goes the extra
                mile to deliver exceptional results. Our team of architects,
                planners, designers, and construction specialists work
                collaboratively to bring their unique talents and expertise to
                every project.
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

      <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={20}>
        <motion.div
          layout
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{
            type: "spring",
            mass: 0.5,
          }}
          style={{ width: "100%" }}
        >
          <Stack
            direction={{ base: "column", xmd: "row" }}
            spacing={4}
            w="full"
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
              style={{ width: "100%" }}
            >
              <Card
                variant="elevated"
                rounded="md"
                boxShadow="xl"
                w="full"
                as={Link}
                to={"/about/executives"}
                draggable={false}
              >
                <CardBody p={0}>
                  <AspectRatio ratio={16 / 9} w="full">
                    {/* <ClientOnly>
                      {() => ( */}
                    <AvatarGroup
                      size={{
                        base: "xl",
                        sm: "2xl",
                        lg: "2xl",
                      }}
                      max={maxAvatars}
                      spacing={"-2rem"}
                    >
                      {data.profiles.map((value: any, index: any) => (
                        <Avatar
                          key={index}
                          name={value.name}
                          src={value.image}
                          showBorder={true}
                          borderColor="primary.500"
                        />
                      ))}
                    </AvatarGroup>
                    {/* )}
                    </ClientOnly> */}
                  </AspectRatio>
                </CardBody>
                <CardFooter
                  w="full"
                  p={4}
                  m={0}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing="1">
                    <Heading size="md">Executives</Heading>
                    <Text>Learn more about our team</Text>
                  </Stack>
                  <ArrowForwardIcon />
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
              style={{ width: "100%" }}
            >
              <Card
                variant="elevated"
                rounded="md"
                boxShadow="xl"
                w="full"
                as={Link}
                to={"/projects"}
                draggable={false}
              >
                <CardBody p={0}>
                  <AspectRatio ratio={16 / 9} w="full">
                    <ClientOnly>
                      {() => (
                        <Suspense fallback={<Skeleton w="full" h="full" />}>
                          <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <RemixImage
                              // image={data.images.apt724Thumbnail}
                              // alt="Company Group Picture"
                              roundedTopLeft="md"
                              roundedTopRight="md"
                              w="full"
                              loading="lazy"
                              draggable={false}
                            />
                          </ErrorBoundary>
                        </Suspense>
                      )}
                    </ClientOnly>
                  </AspectRatio>
                </CardBody>
                <CardFooter
                  w="full "
                  p={4}
                  m={0}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing="1">
                    <Heading size="md">History</Heading>
                    <Text>Learn more about our history</Text>
                  </Stack>
                  <ArrowForwardIcon />
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
              style={{ width: "100%" }}
            >
              <Card
                variant="elevated"
                rounded="md"
                boxShadow="xl"
                w="full"
                h="full"
                as={Link}
                to={"/resources"}
                draggable={false}
              >
                <CardBody p={0}>
                  <AspectRatio ratio={16 / 9} w="full">
                    <ClientOnly>
                      {() => (
                        <Suspense fallback={<Skeleton w="full" h="full" />}>
                          <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <RemixImage
                              // image={data.images.officeThumbnail}
                              roundedTopLeft="md"
                              roundedTopRight="md"
                              w="full"
                              loading="lazy"
                              draggable={false}
                            />
                          </ErrorBoundary>
                        </Suspense>
                      )}
                    </ClientOnly>
                  </AspectRatio>
                </CardBody>
                <CardFooter
                  w="full "
                  p={4}
                  m={0}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing="1">
                    <Heading size="md">Safety</Heading>
                    <Text>Our commitment to safety</Text>
                  </Stack>

                  <ArrowForwardIcon />
                </CardFooter>
              </Card>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>
    </>
  );
}
