import {
  Container,
  Heading,
  VStack,
  Text,
  SlideFade,
  Img,
  Divider,
  Card,
  CardBody,
  Skeleton,
  Stack,
  Box,
  Avatar,
  AspectRatio,
  Image,
} from "@chakra-ui/react";

import { Fragment, useEffect } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import RenderIfVisible from "react-render-if-visible";
import { AnimatePresence, motion } from "framer-motion";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { profiles } from "~/utils/profiles";
import { any } from "zod";

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

    return json({
      allconStaff: company,
      profiles: Array.from(profiles.values()),
    });
  } catch (error) {
    throw error;
  }
};

export default function About() {
  const data = useLoaderData();

  return (
    // <SlideFade in={true} delay={0.1} unmountOnExit>
    <>
      <Container maxW="1200px" px={{ base: 3, md: 6 }} py={14}>
        <VStack spacing="26px">
          <Heading textAlign="center">About Us</Heading>
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
              <Image
                src={data.allconStaff}
                alt="Company Group Photo"
                boxShadow="xl"
                rounded="md"
                userSelect="none"
                draggable={false}
                loading="lazy"
                fallback={<Skeleton w="full" h="full" />}
              />
            </AspectRatio>
          </VStack>
        </VStack>
      </Container>
      <Divider />
      <Container maxW="1200px" px={{ base: 3, md: 6 }} py={14}>
        <VStack spacing="26px">
          <Heading textAlign="center"> Executives</Heading>

          <AnimatePresence>
            {data.profiles.map((value: any, index: any) => (
              <RenderIfVisible key={index} defaultHeight={1200}>
                <motion.div
                  layout
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
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
                      <Image
                        roundedTopLeft="md"
                        roundedBottomLeft="md"
                        objectFit="cover"
                        src={value.image}
                        alt={`${value.title} profile`}
                        boxShadow="xl"
                        draggable={false}
                        userSelect="none"
                        loading="lazy"
                        fallback={<Skeleton w="full" h="full" />}
                      />
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
        {/* </VStack> */}
      </Container>
    </>
    // </SlideFade>
  );
}
