import { Fragment, useRef, useState } from "react";
import {
  Text,
  Button,
  Center,
  Img,
  SlideFade,
  Box,
  HStack,
  VStack,
  Icon,
  AspectRatio,
  Skeleton,
  useColorModeValue,
  ButtonGroup,
  Stack,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Divider,
  IconButton,
  useBreakpointValue,
  Avatar,
} from "@chakra-ui/react";
// import { useDataRefresh } from "remix-utils";
import { BiBuildings, BiBook } from "react-icons/bi";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useWindowDimensions } from "~/utils/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Scrollbar } from "swiper";

import { useInView } from "react-intersection-observer";
import { ArrowForwardIcon, LinkIcon } from "@chakra-ui/icons";
import { ImQuotesRight } from "react-icons/im";
import { testimonials } from "~/utils/testimonials";

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    // await auth.protectedRoute(request);

    const lupton =
      "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/4aee4395-0887-4070-980f-427a13fdb400/hq";

    // const elwood =
    //   "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/c0ce0238-47bb-4d18-f278-79a57d207b00/hq";

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

    const greatneckRoofsThumbnail =
      "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e7f76ad3-ea23-4fde-e911-178b09bb5400/thumbnail";

    const officeThumbnail =
      "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/thumbnail";

    return {
      slideShow: [lupton, policeStation, nold, apt724, greatneckRoofs],
      images: { companyThumbnail, greatneckRoofsThumbnail, officeThumbnail },
      testimonials: Array.from(testimonials.values()),
    };
  } catch (error) {
    throw error;
  }
};

export default function Index() {
  // const { height, width } = useWindowDimensions();

  const data = useLoaderData();

  const cardsView = useInView();

  const testimonialsView = useInView();

  const breakpointHeight = useBreakpointValue(
    { base: "calc(100vh - 169px)", md: "calc(100vh - 64px)" },
    { ssr: true }
  );

  const breakpointSlidesPerView = useBreakpointValue(
    { base: 1, lg: 2 },
    { fallback: "xmd", ssr: true }
  );

  return (
    <SlideFade in={true} delay={0.1} unmountOnExit>
      <Box position="relative">
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          modules={[Autoplay, Pagination, EffectFade]}
          effect={"fade"}
          lazy={false}
          allowTouchMove={false}
          style={{
            height: breakpointHeight,
          }}
          pagination={{
            clickable: true,
          }}
        >
          {data.slideShow.map((img: any, index: any) => (
            <SwiperSlide key={index}>
              <AspectRatio
                ratio={16 / 9}
                height={breakpointHeight}
                overflow="hidden"
                display="block"
                lineHeight={0}
                h="full"
                maxW="full"
                maxH="full"
              >
                <Img
                  src={img}
                  alt={`Landing Page Image ${index}`}
                  w={"full"}
                  h="full"
                  maxW="full"
                  maxH="full"
                  overflow="hidden"
                  display="block"
                  lineHeight={0}
                  filter={"brightness(75%)"}
                  draggable={false}
                  loading="lazy"
                  crossOrigin="anonymous"
                />
              </AspectRatio>
            </SwiperSlide>
          ))}
        </Swiper>
        <VStack
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="full"
          zIndex={600}
        >
          <SlideFade in={true} reverse delay={0.5}>
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
              // textShadow="0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
            >
              Infinite Possibilities through Integrated Solutions
            </Text>
          </SlideFade>

          <SlideFade in={true} reverse delay={0.8}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              alignItems="center"
            >
              <Button
                colorScheme="primary"
                variant="solid"
                bgColor="#018b8b"
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
                to="about"
                boxShadow="dark-lg"
                rounded="md"
                size="md"
                variant="solid"
                bgColor="gray.50"
                _hover={{ bgColor: "gray.300" }}
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
          </SlideFade>
        </VStack>
      </Box>

      <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={20}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 2, xmd: 2, lg: 4 }}
          w="full"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
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
              to={"/about"}
              draggable={false}
            >
              <CardBody p={0}>
                <AspectRatio ratio={16 / 9} w="full">
                  <Img
                    src={data.images.companyThumbnail}
                    alt="Company Group Picture"
                    roundedTopLeft="md"
                    roundedTopRight="md"
                    w="full"
                    loading="lazy"
                    draggable={false}
                  />
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
                  <Heading size="md">About</Heading>
                  <Text>Learn more about our values</Text>
                </Stack>
                <ArrowForwardIcon />
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
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
                  <Img
                    src={data.images.greatneckRoofsThumbnail}
                    alt="Company Group Picture"
                    roundedTopLeft="md"
                    roundedTopRight="md"
                    w="full"
                    loading="lazy"
                    draggable={false}
                  />
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
            whileHover={{ scale: 1.01 }}
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
              to={"/testimonials"}
              draggable={false}
            >
              <CardBody p={0}>
                <AspectRatio ratio={16 / 9} w="full">
                  <Img
                    src={data.images.officeThumbnail}
                    alt="Company Group Picture"
                    roundedTopLeft="md"
                    roundedTopRight="md"
                    w="full"
                    draggable={false}
                    loading="lazy"
                  />
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
      </Container>

      <Divider />

      <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={20}>
        <VStack spacing="40px">
          <Flex
            flexDirection="row"
            alignItems="center"
            w="100%"
            justifyContent="center"
            gap={1}
          >
            <Heading textAlign="center">Trusted by our Clients</Heading>
            <IconButton
              variant="ghost"
              borderRadius="full"
              aria-label="Testimonials link"
              icon={<LinkIcon />}
              as={Link}
              to="/testimonials"
              draggable={false}
            />
          </Flex>
          <Box
            rounded="md"
            bg="transparent"
            boxShadow={"lg"}
            w="full"
            ref={testimonialsView.ref}
          >
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
              autoHeight
              slidesPerView={breakpointSlidesPerView}
              style={{
                borderRadius: "0.375rem",
              }}
            >
              {data.testimonials.map((value: any, index: any) => (
                <SwiperSlide key={index}>
                  <Card
                    variant="elevated"
                    rounded="none"
                    h={{ base: "auto", sm: "250px" }}
                    w="full"
                  >
                    <CardBody textAlign="justify">{value.content}</CardBody>

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
        </VStack>
      </Container>
      <Divider />

      <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={20}>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={5}
          alignItems={{ base: "flex-start", md: "center" }}
          justifyContent="space-between"
          rounded="md"
          boxShadow="xl"
          bg={useColorModeValue("white", "gray.700")}
          p={{ base: 8, md: 16 }}
        >
          <Box>
            <Heading fontSize="3xl" lineHeight={1.2} fontWeight="bold">
              Looking for more information?
            </Heading>
            <Text
              fontSize="2xl"
              lineHeight={1.2}
              fontWeight="bold"
              bgGradient="linear(to-l, #35a3a3,#018b8b)"
              bgClip="text"
            >
              Send us a message
            </Text>
          </Box>
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={3}
            w={{ base: "100%", sm: "auto" }}
          >
            <Button
              variant="solid"
              colorScheme="primary"
              as={Link}
              to="/contacts"
              draggable={false}
            >
              Contact Us
            </Button>
            <Button variant="solid" as={Link} to="/about" draggable={false}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </SlideFade>
  );
}
