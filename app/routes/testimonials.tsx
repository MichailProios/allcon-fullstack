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
import Slider from "react-slick";
import { Search2Icon } from "@chakra-ui/icons";

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Testimonials`,
  description: `Allcon Contracting testionies from clients`,
});

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    const testimonies = [
      {
        name: "Pamela Richard",
        position: "Director of Development",
        company: "AHRC New York",
        content: `Your gift of supplies for the renovation of AHRC’s Astoria’s Blue
              Feather Head Start program helped improve the educational
              experience for many small children who face big challenges every
              day.`,
      },

      {
        name: "Nancy Kaplan",
        position: "Ed.D., President, Board of Education",
        company: "Merrick Central Highschool District",
        content: `We appreciate your contribution of the utility and storage
              building for the students at Mepham High School.`,
      },
      {
        name: "Barry H. Greene",
        initials: "B G",
        position: "Cooperative President - 20 East 9th St.",
        content: `Most contractors I’ve worked with are usually focused on the next
              job as they are working on the current one. This is definitely not
              the case with ALL CON….anyone who chooses to work with them will
              be very happy and extremely satisfied with the experience and
              results.`,
      },
      {
        name: "Kim Zdrill",
        position: "FSA, MAAA - Berry St.",
        content: `Most contractors I’ve worked with are usually focused on the next
              job as they are working on the current one. This is definitely not
              the case with ALL CON….anyone who chooses to work with them will
              be very happy and extremely satisfied with the experience and
              results.`,
      },
      {
        name: "Edward L. Rose",
        initials: "E R",
        position: "Apt 53B Client",
        content: `At the end of the day, I knew exactly what I was paying for –
              without hidden costs or add-ons – and I was extremely satisfied
              with the results.`,
      },
      {
        name: "Roberta Sandemen",
        position: "470 Park Avenue",
        content: `The crew did a wonderful job…promptly, efficiently,
              helpfully….and exceptionally. I heartily recommend ALLCON
              Contracting.`,
      },
      {
        name: "Terri S. Triades",
        initials: "T T",
        position: "MERI TRIADES",
        content: `The crew did a wonderful job…promptly, efficiently,
              helpfully….and exceptionally. I heartily recommend ALLCON
              Contracting.`,
      },
      {
        name: "Alex Arker",
        position: "The Arker Companies Real Estate Development",
        content: `We found ALLCON to be completely reliable and dependable. They
              bring projects in on time and on budget.`,
      },
      {
        name: "Lenard Thylan",
        position: "Thylan Associates Inc. Real Estate and Corporate",
        content: `I recommend ALLCON Contracting because they are reliable,
              responsive, and dependable.`,
      },
    ];

    return { testimonies: testimonies };
  } catch (error) {
    throw error;
  }
};

export default function Index() {
  const { height } = useWindowDimensions();

  const data = useLoaderData();

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container maxW={"1200px"} px={{ base: 6, md: 10 }} py={14}>
        <VStack spacing="26px">
          <Heading textAlign="center">Testimonials</Heading>

          {data.testimonies.map((value: any, index: any) => (
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
              {data.testimonies.length - 1 !== index && <Divider my={6} />}
            </Fragment>
          ))}
        </VStack>
      </Container>
    </SlideFade>
  );
}
