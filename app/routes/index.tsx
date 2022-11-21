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
} from "@chakra-ui/react";
// import { useDataRefresh } from "remix-utils";
import { BiBuildings } from "react-icons/bi";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useWindowDimensions } from "~/utils/hooks";

// import * as auth from "app/utils/auth.server";
// import { useTransition } from "@remix-run/react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    // await auth.protectedRoute(request);

    const lupton =
      "https://allconcontracting.com/image-resizing?&quality=90&height=3840&width=2160&sharpen=1&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/lupton-hall/10-23-1-22.jpg";

    const elwood =
      "https://allconcontracting.com/image-resizing?&quality=90&height=3840&width=2160&sharpen=1&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/OGS_Elwood/20220412_120728229_iOS.jpg";

    const policeStation =
      "https://allconcontracting.com/image-resizing?&quality=90&height=3840&width=2160&sharpen=1&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/police-station-email/police-station-05.jpg";

    const nold =
      "https://allconcontracting.com/image-resizing?&quality=90&height=3840&width=2160&sharpen=1&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/nold/11-6-21-2.webp";

    const apt724 =
      "https://allconcontracting.com/image-resizing?&quality=90&height=3840&width=2160&sharpen=1&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/724/3-8-20.7.jpg";

    const greatneckRoofs =
      "https://allconcontracting.com/image-resizing?&quality=90&height=3840&width=2160&sharpen=1&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/greatneck-terrace-roofs/11-13-21-5.jpg";

    return [lupton, elwood, policeStation, nold, apt724, greatneckRoofs];
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
        <Slider
          fade={true}
          infinite={true}
          autoplay={true}
          autoplaySpeed={3000}
          // speed={1000}
          arrows={false}
          draggable={false}
          swipe={false}
          pauseOnHover={false}
          lazyLoad={"progressive"}
        >
          {images.map((img: any, index: any) => (
            <Image
              key={index}
              src={img}
              alt={`Landing Page Image ${index}`}
              objectFit="cover"
              height={
                height ? `calc(${height}px - 64px)` : `calc(100vh - 64px)`
              }
              w="full"
            />
          ))}
        </Slider>
        <VStack
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="full"
        >
          <SlideFade in={true} reverse delay={0.6}>
            <Text
              fontSize={"3xl"}
              fontWeight="medium"
              letterSpacing="0.1em"
              textTransform="uppercase"
              wordBreak="break-word"
              textAlign="center"
              width="full"
              userSelect="none"
              textColor="white"
              textShadow="0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
            >
              Infinite Possibilities through Integrated Solutions
            </Text>
          </SlideFade>

          <SlideFade in={true} reverse delay={1}>
            <Button
              colorScheme="primary"
              variant="solid"
              // textColor="white"
              as={Link}
              to="projects"
              boxShadow="dark-lg"
              rounded="md"
              size="md"
              rightIcon={<Icon as={BiBuildings} />}
            >
              Explore our Projects
            </Button>
          </SlideFade>
        </VStack>
      </Box>
    </SlideFade>
  );
}
