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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { Database } from "~/utils/db_types";

import { motion } from "framer-motion";
import { SupabaseClient } from "@supabase/auth-helpers-remix";

import {
  FcGallery,
  FcFinePrint,
  FcCollaboration,
  FcRules,
  FcConferenceCall,
  FcDiploma1,
} from "react-icons/fc";
import { Link, useOutletContext } from "@remix-run/react";
import { ArrowForwardIcon, LinkIcon } from "@chakra-ui/icons";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { createServerClient } from "~/utils/supabase.server";

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
  "og:url": "https://allconcontracting.com/References",
});

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    const response = new Response();
    const supabase = createServerClient({ request, response });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return json(null, {
      headers: response.headers,
    });
  } catch (error) {
    throw error;
  }
};

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
        h="full"
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
export default function Index() {
  return (
    // <SlideFade in={true} unmountOnExit reverse delay={0.05}>
    <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={14}>
      <VStack spacing="26px">
        <Heading textAlign="center">Resources</Heading>
        <Box>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 2, xl: 3 }}
            spacing={{ base: 4, lg: 4 }}
          >
            <Feature
              icon={<Icon as={FcFinePrint} w={10} h={10} />}
              title={"Awards & Recognitions"}
              text={`The Awards and Recognitions section highlights the company's commitment to excellence and leadership in the construction industry. This dedication to excellence is further demonstrated by the recognition that Allcon has received from industry organizations, publications, clients, and peers.
                
                `}
              url="/resources/awards"
            />
            <Feature
              icon={<Icon as={FcConferenceCall} w={10} h={10} />}
              title={"Diversity & Equality"}
              text={`The Diversity & Equality section is dedicated to showcasing the company's commitment to promoting diversity and inclusion in the workplace. This section features information on the company's policies and initiatives aimed at promoting equal opportunities and fostering a positive, inclusive work environment. 
                   `}
              url="/resources/diversity"
            />
            <Feature
              icon={<Icon as={FcCollaboration} w={10} h={10} />}
              title={"References"}
              text={`The References section features comments and reviews from past clients. It provides insights into the experiences of others who have worked with Allcon Contracting, offering a glimpse into the quality of their work and customer service. These References also serve as social proof for potential customers.
                   `}
              url="/resources/references"
            />
            <Feature
              icon={<Icon as={FcDiploma1} w={10} h={10} />}
              title={"Certifications"}
              text={`The Certifications section displays the professional certifications that Allcon has earned. This section provides insight into our work and customer service quality. These certifications also serve as social proof for potential clients, showing that we have met industry standards.`}
              url="/resources/certifications"
            />
            <Feature
              icon={<Icon as={FcGallery} w={10} h={10} />}
              title={"Media"}
              text={`The Media section features a variety of additional content, including videos and images of our accomplishments. You can also see behind-the-scenes footage of our team at work. Explore this section to see even more examples of the high-quality workmanship that sets us apart from other contractors.
                `}
              url="/resources/media"
            />

            <Feature
              icon={<Icon as={FcRules} w={10} h={10} />}
              title={"Brochures"}
              text={`The Brochures section features a collection of PDF brochures that provide detailed information on the company's services and capabilities. These brochures offer potential customers a convenient and easy-to-access way to learn more about the company and the types of projects we have successfully completed in the past.
                   `}
              url="/resources/brochures"
            />
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
    // </SlideFade>
  );
}
