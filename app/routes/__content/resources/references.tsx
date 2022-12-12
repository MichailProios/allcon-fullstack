import { Fragment, useEffect } from "react";
import {
  Text,
  Button,
  Center,
  Image,
  SlideFade,
  ScaleFade,
  Box,
  HStack,
  VStack,
  Icon,
  Container,
  Heading,
  Card,
  CardBody,
  SimpleGrid,
  CardFooter,
  Input,
  InputLeftElement,
  InputGroup,
  Flex,
  Stack,
  Select,
  useColorMode,
  useColorModeValue,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

// import { useDataRefresh } from "remix-utils";
import { BiBuildings } from "react-icons/bi";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useWindowDimensions } from "~/utils/hooks";

// import * as auth from "app/utils/auth.server";
// import { useTransition } from "@remix-run/react";
// import Slider from "react-slick";
import { Search2Icon } from "@chakra-ui/icons";
import { testimonials } from "~/utils/testimonials";

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Testimonials`,
  description: `Allcon Contracting testimonials from clients.`,

  "og:title": "Allcon Contracting - Testimonials",
  "og:type": "business",
  "og:site_name": "Allcon Contracting",
  "og:description": `Allcon Contracting testimonials from clients.`,
  "og:image":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "og:url": "https://allconcontracting.com/testimonials",
});

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    return { references: Array.from(testimonials.values()) };
  } catch (error) {
    throw error;
  }
};

export default function Index() {
  const data = useLoaderData();

  return (
    <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={14}>
      <VStack spacing="26px">
        <Heading textAlign="center">References</Heading>

        {data.references.map((value: any, index: any) => (
          <Fragment key={index}>
            <VStack spacing={3} pt={1} justify="center">
              <Avatar
                size="xl"
                showBorder={true}
                borderColor="primary.400"
                name={value.initials || value.name}
                src={value.image}
              />
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="lg">
                  {value.name}
                </Text>
                <Text fontWeight="medium" fontSize="sm" color="gray.400">
                  {value.position} {value.company && <> at </>}
                  {value.company}
                </Text>
              </Box>
              <Box textAlign="center" maxW="4xl">
                <Text fontSize="md" fontWeight="medium">
                  {value.content}
                </Text>
              </Box>
            </VStack>
            {data.references.length - 1 !== index && (
              <Divider my={6} w="100vw" />
            )}
          </Fragment>
        ))}
      </VStack>
    </Container>
  );
}
