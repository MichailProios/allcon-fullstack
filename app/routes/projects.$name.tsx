import { Fragment, useEffect, useState } from "react";
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
  CardHeader,
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
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  StackDivider,
  Skeleton,
} from "@chakra-ui/react";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { useWindowDimensions } from "~/utils/hooks";

// import { GrNext, GrPrevious } from "react-icons/gr";

import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

import Slider from "react-slick";

import { projects } from "~/utils/projects";

export const loader: LoaderFunction = async ({ request, params }: any) => {
  try {
    if (!projects.has(params.name.toLowerCase())) {
      throw "No Project";
    }

    const project = projects.get(params.name.toLowerCase());

    const res = await fetch(
      `https://allconcontracting.com:2096/files/getFileList${project.pictures}`
    );

    const pictureList = await res.json();

    return { project: project, pictures: pictureList };
  } catch (error) {
    throw error;
  }
};

export default function Index() {
  const [slider, setSlider] = useState<Slider | null>(null);
  const data = useLoaderData();

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container maxW={"1600px"} px={{ base: 6, md: 10 }} py={14}>
        <VStack spacing="26px" w="full">
          <Heading textAlign="center">{data.project.projectName}</Heading>
        </VStack>

        <Box position={"relative"} w="full">
          <IconButton
            aria-label="left-arrow"
            variant={{ base: "solid", xl: "ghost" }}
            borderRadius="full"
            position="absolute"
            left="10px"
            top="50%"
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
            icon={<ChevronLeftIcon w={6} h={6} />}
          />

          <IconButton
            aria-label="right-arrow"
            variant={{ base: "solid", xl: "ghost" }}
            borderRadius="full"
            position="absolute"
            right="10px"
            top="50%"
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
            icon={<ChevronRightIcon w={6} h={6} />}
          />

          <Box mt={"26px"}>
            <Slider
              arrows={false}
              // dots={Object.values(data.pictures).length <= 8 ? true : false}\

              infinite={true}
              speed={300}
              ref={(slider) => setSlider(slider)}
            >
              {Object.values(data.pictures).map((img: any, index: any) => (
                <Image
                  key={index}
                  src={
                    `https://allconcontracting.com/image-resizing?&quality=${data.project.quality}&height=1920&width=1080&metadata=none&image=` +
                    img
                  }
                  alt={`Project Image ${index}`}
                  objectFit="contain"
                  height="800px"
                  rounded="md"
                  fallback={<Skeleton h="800px" w="full" />}
                />
              ))}
            </Slider>
          </Box>
        </Box>
      </Container>
      <Container maxW={"1600px"} px={{ base: 6, md: 10 }} py={14}>
        <VStack spacing="18px">
          <Heading textAlign="center">Project Information</Heading>
          <Card rounded="md" boxShadow="xl" w={"full"}>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading fontSize="lg" textTransform="uppercase">
                    Client / Affiliated Agency
                  </Heading>
                  <Text pt="2" fontSize="xl">
                    {data.project.clientAffiliatedAgency}
                  </Text>
                </Box>
                <Box>
                  <Heading fontSize="lg" textTransform="uppercase">
                    Year Completed
                  </Heading>
                  <Text pt="2" fontSize="xl">
                    {data.project.yearCompleted}
                  </Text>
                </Box>
                <Box>
                  <Heading fontSize="lg" textTransform="uppercase">
                    Cost / Budget
                  </Heading>
                  <Text pt="2" fontSize="xl">
                    {data.project.projectCostBudget}
                  </Text>
                </Box>
                <Box>
                  <Heading fontSize="lg" textTransform="uppercase">
                    Designer
                  </Heading>
                  <Text pt="2" fontSize="xl">
                    {data.project.projectDesigner}
                  </Text>
                </Box>
                <Box>
                  <Heading fontSize="lg" textTransform="uppercase">
                    Description
                  </Heading>
                  <Text pt="2" fontSize="xl">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: data.project.description,
                      }}
                    />
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </SlideFade>
  );
}
