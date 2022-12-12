import { ReactElement, useState } from "react";
import {
  Box,
  SimpleGrid,
  Container,
  Icon,
  Text,
  Stack,
  Flex,
  VStack,
  Heading,
  SlideFade,
  useColorModeValue,
  Button,
  Collapse,
  Slide,
  useBreakpointValue,
} from "@chakra-ui/react";

import { motion } from "framer-motion";

import { FcPicture, FcFinePrint, FcCollaboration } from "react-icons/fc";
import { Link } from "@remix-run/react";
import { ArrowForwardIcon, LinkIcon } from "@chakra-ui/icons";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
  url: string;
}

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Resources`,
  description: `Allcon Contracting resources.`,

  "og:title": "Allcon Contracting - Resources",
  "og:type": "business",
  "og:site_name": "Allcon Contracting",
  "og:description": `Allcon Contracting resources.`,
  "og:image":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "og:url": "https://allconcontracting.com/testimonials",
});

const Feature = ({ title, text, icon, url }: FeatureProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{
        type: "tween",
        duration: 0.1,
      }}
      style={{ width: "100%" }}
    >
      <Stack
        as={Link}
        to={url}
        boxShadow="xl"
        borderRadius="md"
        p={4}
        transition="all 150ms"
        position="relative"
        bgColor={useColorModeValue("white", "gray.700")}
        draggable={false}
      >
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={"gray.100"}
          mb={1}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{title}</Text>
        <Text
          color={useColorModeValue("gray.600", "gray.300")}
          textAlign="start"
        >
          {text}
        </Text>

        <LinkIcon position="absolute" top="10px" right="10px" />
      </Stack>
    </motion.div>
  );
};
export default function Resources() {
  return (
    // <SlideFade in={true} delay={0.1} unmountOnExit>
    <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={14}>
      <VStack spacing="26px">
        <Heading textAlign="center">Resources</Heading>
        <Box>
          <SimpleGrid
            columns={{ base: 1, lg: 3 }}
            spacing={{ base: 10, lg: 4 }}
          >
            <Feature
              icon={<Icon as={FcPicture} w={10} h={10} />}
              title={"Media"}
              text={`The media section of our website features a variety of additional content, including videos and images of our accomplishments. You can also see behind-the-scenes footage of our team at work. Explore this section to see even more examples of the high-quality workmanship that sets us apart from other contractors.
                `}
              url="/media"
            />
            <Feature
              icon={<Icon as={FcFinePrint} w={10} h={10} />}
              title={"Awards & Recognitions"}
              text={`The Awards and Recognitions section highlights the company's commitment to excellence and leadership in the construction industry. This dedication to excellence is further demonstrated by the recognition that Allcon has received from industry organizations, publications, clients, and peers.
                
                `}
              url="/awards"
            />
            <Feature
              icon={<Icon as={FcCollaboration} w={10} h={10} />}
              title={"References"}
              text={`The Testimonials section features comments and reviews from past clients. It provides insights into the experiences of others who have worked with Allcon Contracting, offering a glimpse into the quality of their work and customer service. These testimonials also serve as social proof for potential customers.
                   `}
              url="/References"
            />
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
    // </SlideFade>
  );
}
