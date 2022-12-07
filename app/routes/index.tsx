import { Fragment, useEffect } from "react";
import {
  Text,
  Button,
  Center,
  Image,
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
} from "@chakra-ui/react";
// import { useDataRefresh } from "remix-utils";
import { BiBuildings, BiBook } from "react-icons/bi";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useWindowDimensions } from "~/utils/hooks";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper";

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

    return [lupton, policeStation, nold, apt724, greatneckRoofs];
  } catch (error) {
    throw error;
  }
};

export default function Index() {
  const { height } = useWindowDimensions();

  const images = useLoaderData();

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Box>
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
            height: height ? `calc(${height}px - 64px)` : `calc(100vh - 64px)`,
          }}
          pagination={{
            clickable: true,
          }}
        >
          {images.map((img: any, index: any) => (
            <SwiperSlide key={index}>
              <AspectRatio
                ratio={16 / 9}
                height={
                  height ? `calc(${height}px - 64px)` : `calc(100vh - 64px)`
                }
                overflow="hidden"
                display="block"
                lineHeight={0}
                w="full"
                h="full"
                maxW="full"
                maxH="full"
              >
                <Image
                  src={img}
                  alt={`Landing Page Image ${index}`}
                  w="full"
                  h="full"
                  maxW="full"
                  maxH="full"
                  fallback={<Skeleton h="full" w="full" />}
                  overflow="hidden"
                  display="block"
                  lineHeight={0}
                  filter={"brightness(75%)"}
                  draggable={false}
                  loading="eager"
                  crossOrigin="anonymous"
                />
              </AspectRatio>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </Slider> */}
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
    </SlideFade>
  );
}
