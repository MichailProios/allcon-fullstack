import { Suspense, Fragment } from "react";
import {
  Text,
  Button,
  Box,
  HStack,
  VStack,
  Icon,
  AspectRatio,
  Skeleton,
  useColorModeValue,
  Stack,
  Container,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Divider,
  useBreakpointValue,
  Avatar,
  chakra,
} from "@chakra-ui/react";
// import { useDataRefresh } from "remix-utils";
import { useWindowDimensionsInitial } from "~/utils/hooks";
import { BiBuildings, BiBook } from "react-icons/bi";

import type { LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { GrWorkshop } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Lazy } from "swiper";

import { useInView } from "react-intersection-observer";
import { ArrowForwardIcon, ChatIcon } from "@chakra-ui/icons";
import { ImQuotesRight } from "react-icons/im";
import { testimonials } from "~/utils/testimonials";
import { ClientOnly } from "remix-utils/build/react/client-only";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "~/components/ErrorFallback";
import RemixImage from "~/components/RemixImage";
import { createServerClient } from "~/utils/supabase.server";
import { FaLinkedin } from "react-icons/fa";
import { use100vh } from "react-div-100vh";

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    const lupton =
      "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4aee4395-0887-4070-980f-427a13fdb400/hq";

    const policeStation =
      "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/96f08191-f50b-4359-f535-6c84ab162000/hq";

    const nold =
      "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/2ebdeb7e-442b-4443-6cb3-98f6746f2200/hq";

    const apt724 =
      "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/c71596c6-7bae-47c7-e4fa-868ba422a600/hq";

    const greatneckRoofs =
      "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e7f76ad3-ea23-4fde-e911-178b09bb5400/hq";

    const companyThumbnail =
      "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/b4fadc27-355f-443d-f1d2-a3efc3905200/thumbnail";

    const apt724Thumbnail =
      "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/c71596c6-7bae-47c7-e4fa-868ba422a600/thumbnail";

    const officeThumbnail =
      "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/thumbnail";

    const response = new Response();
    const supabase = createServerClient({ request, response });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return json(
      {
        slideShow: [lupton, policeStation, nold, apt724, greatneckRoofs],
        images: { companyThumbnail, apt724Thumbnail, officeThumbnail },
        testimonials: Array.from(testimonials.values()),
      },
      {
        headers: response.headers,
      }
    );
  } catch (error) {
    throw error;
  }
};

export default function Index() {
  const data = useLoaderData();
  const { height } = useWindowDimensionsInitial();

  const breakpointSlidesPerView = useBreakpointValue(
    { base: 1, lg: 2 },
    { fallback: "base", ssr: true }
  );

  return (
    <>
      <Box position="relative" h={height ? height - 64 : "100vh"}>
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          modules={[Lazy, Autoplay, Pagination, EffectFade]}
          effect={"fade"}
          lazy={{ loadPrevNext: true, loadPrevNextAmount: 1 }}
          allowTouchMove={false}
          style={{
            height: height ? height - 64 : "100vh",
          }}
          pagination={{
            clickable: true,
          }}
        >
          {data.slideShow.map((img: any, index: any) => (
            <SwiperSlide key={index}>
              <AspectRatio ratio={16 / 9} h={height ? height - 64 : "100vh"}>
                <ClientOnly>
                  {() => (
                    <Suspense
                      fallback={
                        <Skeleton w="full" h={height ? height - 64 : "100vh"} />
                      }
                    >
                      <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <RemixImage
                          image={img}
                          filter={"brightness(75%)"}
                          draggable={false}
                          loading="lazy"
                        />
                      </ErrorBoundary>
                    </Suspense>
                  )}
                </ClientOnly>
              </AspectRatio>
            </SwiperSlide>
          ))}
        </Swiper>
        <ClientOnly>
          {() => (
            <VStack
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="full"
              zIndex={600}
            >
              <Text
                fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                fontWeight="medium"
                letterSpacing={"0.05em"}
                textTransform="uppercase"
                wordBreak="break-word"
                textAlign="center"
                width="full"
                userSelect="none"
                textColor="white"
              >
                Infinite Possibilities through Integrated Solutions
              </Text>

              <Stack
                direction={{ base: "column", sm: "row" }}
                alignItems="center"
              >
                <Button
                  colorScheme="primary"
                  variant="solid"
                  bgColor="primary.500"
                  _hover={{ bgColor: "primary.600" }}
                  _active={{ bgColor: "primary.700" }}
                  textColor="white"
                  as={Link}
                  prefetch="render"
                  rel="prerender"
                  to="projects"
                  boxShadow="dark-lg"
                  rounded="md"
                  size="md"
                  rightIcon={<Icon as={BiBuildings} />}
                  draggable={false}
                  w="220px"
                >
                  Explore our Projects
                </Button>
                <Button
                  as={Link}
                  to="company"
                  boxShadow="dark-lg"
                  rounded="md"
                  size="md"
                  variant="solid"
                  bgColor="gray.50"
                  _hover={{ bgColor: "gray.300" }}
                  _active={{ bgColor: "gray.400" }}
                  textColor="black"
                  prefetch="render"
                  rel="prerender"
                  rightIcon={<Icon as={BiBook} />}
                  draggable={false}
                  w="150px"
                >
                  Learn More
                </Button>
              </Stack>
            </VStack>
          )}
        </ClientOnly>
      </Box>

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
                to={"/company"}
                draggable={false}
              >
                <CardBody p={0}>
                  <AspectRatio ratio={16 / 9} w="full">
                    <ClientOnly>
                      {() => (
                        <Suspense fallback={<Skeleton w="full" h="full" />}>
                          <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <RemixImage
                              image={data.images.companyThumbnail}
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
                  w="full"
                  p={4}
                  m={0}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing="1">
                    <Heading size="md">Company</Heading>
                    <Text>Learn more about our values</Text>
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
                              image={data.images.apt724Thumbnail}
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
                    <Heading size="md">Projects</Heading>
                    <Text>Explore our portofolio</Text>
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
                              image={data.images.officeThumbnail}
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
                    <Heading size="md">Resources</Heading>
                    <Text>View company resources </Text>
                  </Stack>

                  <ArrowForwardIcon />
                </CardFooter>
              </Card>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>

      <Divider />

      <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={20}>
        <VStack spacing="40px">
          <Heading textAlign="center">Trusted by our Clients</Heading>

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
            <Box rounded="md" bg="transparent" boxShadow={"lg"} w="full">
              <Swiper
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  type: "progressbar",
                }}
                modules={[Autoplay, Pagination]}
                loop
                cssMode={false}
                slidesPerView={breakpointSlidesPerView}
                style={{
                  borderRadius: "0.375rem",
                }}
                autoHeight={true}
                initialSlide={1}
              >
                {data.testimonials.map((value: any, index: any) => (
                  <SwiperSlide key={index}>
                    <Card
                      variant="elevated"
                      rounded="none"
                      h={{ base: "100%", xs: "300px", sm: "250px" }}
                      w="full"
                    >
                      <CardBody textAlign={{ base: "start", sm: "justify" }}>
                        {value.content}
                      </CardBody>

                      <Divider />
                      <CardFooter justify="space-between" alignItems="center">
                        <HStack spacing={2}>
                          <Avatar name={value.initials || value.name} />
                          <Flex direction="column">
                            <Text fontWeight="bold" fontSize="lg">
                              {value.name}
                            </Text>
                            <Text fontSize="md" color="gray.500">
                              {value.position}
                            </Text>
                          </Flex>
                        </HStack>
                        <Icon as={ImQuotesRight} w={8} h={8} />
                      </CardFooter>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </motion.div>
        </VStack>
      </Container>
      <Divider />

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
          <Box
            bg={useColorModeValue("white", "gray.700")}
            p={{ base: 4, sm: 8 }}
            rounded="md"
            boxShadow="xl"
          >
            <Stack
              pos="relative"
              zIndex={1}
              direction="column"
              spacing={5}
              textAlign="left"
            >
              <Heading
                fontSize="3xl"
                w="full"
                textAlign={{ base: "center", md: "start" }}
              >
                Looking to connect or work with us?
              </Heading>
              <Text
                fontSize="xl"
                color={useColorModeValue("gray.600", "gray.400")}
                textAlign={{ base: "justify", md: "start" }}
                w="full"
              >
                Allcon Contracting is a community of professionals dedicated to
                providing top-quality construction services. We welcome contact
                from job seekers and clients through our website or LinkedIn.
              </Text>

              <Stack direction={{ base: "column", md: "row" }} spacing={3}>
                <Button
                  leftIcon={<ChatIcon />}
                  as={Link}
                  to="/contacts"
                  rounded="md"
                >
                  Send us a Message
                </Button>
                <Button
                  leftIcon={<Icon as={GrWorkshop} />}
                  as={Link}
                  to="/contacts"
                  rounded="md"
                >
                  Employment Opportunities
                </Button>
                <Button
                  leftIcon={<Icon as={FaLinkedin} color="#0E76A8" />}
                  rounded="md"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/company/allcon-contracting/"
                    )
                  }
                >
                  Follow us on LinkedIn
                </Button>
              </Stack>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </>
  );
}
