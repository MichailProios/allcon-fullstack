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
  AspectRatio,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { json } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { useWindowDimensions } from "~/utils/hooks";

// import { GrNext, GrPrevious } from "react-icons/gr";

import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

import Slider from "react-slick";

import { projects } from "~/utils/projects";

import {
  AiOutlineDollarCircle,
  AiOutlineCalendar,
  AiOutlineFileText,
} from "react-icons/ai";
import { BiBuildings } from "react-icons/bi";

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - ${projects.get(params.name.toLowerCase()).name}`,
  description: projects.get(params.name.toLowerCase()).description,
});

export const loader: LoaderFunction = async ({ request, params }: any) => {
  try {
    if (!projects.has(params.name.toLowerCase())) {
      throw "No Project";
    }

    const project = projects.get(params.name.toLowerCase());

    return json({
      project: project,
    });
  } catch (error) {
    throw error;
  }
};

export default function Index() {
  const [slider, setSlider] = useState<Slider | null>(null);
  const data = useLoaderData();

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container maxW={"1500px"} px={{ base: 6, md: 10 }} py={14}>
        <VStack spacing="26px" w="full">
          <Heading textAlign="center">{data.project.name}</Heading>
        </VStack>

        <Box position={"relative"} w="full">
          <IconButton
            aria-label="left-arrow"
            variant="solid"
            borderRadius="full"
            position="absolute"
            left={{ base: "5px", md: "10px" }}
            top="50%"
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
            icon={<ChevronLeftIcon w={6} h={6} />}
          />

          <IconButton
            aria-label="right-arrow"
            variant="solid"
            borderRadius="full"
            position="absolute"
            right={{ base: "5px", md: "10px" }}
            top="50%"
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
            icon={<ChevronRightIcon w={6} h={6} />}
          />

          <Box mt={"26px"}>
            <Slider
              arrows={false}
              infinite={true}
              speed={300}
              lazyLoad="progressive"
              ref={(slider) => setSlider(slider)}
            >
              {Object.values(data.project.media)
                .sort((a: any, b: any) => a.order - b.order)
                .map((value: any, index: any) => {
                  if (value.image) {
                    return (
                      <AspectRatio key={index} ratio={{ base: 1, md: 16 / 9 }}>
                        <Image
                          src={value.image}
                          alt={`Project Image ${index}`}
                          // objectFit="scale-down"
                          rounded="md"
                          fallback={<Skeleton h="full" w="full" />}
                        />
                      </AspectRatio>
                    );
                  } else if (value.video) {
                    return (
                      <AspectRatio key={index} ratio={{ base: 1, md: 16 / 9 }}>
                        <iframe
                          title={`Project Video ${index}`}
                          src={value.video}
                          allow="accelerometer, gyroscope; autoplay; encrypted-media; picture-in-picture;"
                          style={{
                            border: "none",
                            height: "100%",
                            width: "100%",
                            borderRadius: "0.375rem",
                            color: "#f3f3f3",
                            pointerEvents: "none",
                          }}
                        />
                      </AspectRatio>
                    );
                  } else {
                    return null;
                  }
                })}
            </Slider>
          </Box>
        </Box>
      </Container>
      {data.project.clientAffiliatedAgency ||
      data.project.yearCompleted ||
      data.project.costBudget ||
      data.project.designer ||
      data.project.description ? (
        <>
          <Divider />
          <Container maxW={"1500px"} px={{ base: 6, md: 10 }} py={14}>
            <VStack spacing="18px">
              <Heading textAlign="center">Project Information</Heading>
              <Card rounded="md" boxShadow="xl" w={"full"}>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    {data.project.clientAffiliatedAgency && (
                      <Box>
                        <Tag size="lg" borderRadius="full">
                          <Icon h={6} w={6} as={BiBuildings} ml={-1} mr={2} />
                          <TagLabel fontSize="lg">
                            Client / Affiliated Agency
                          </TagLabel>
                        </Tag>
                        <Text pl="1" pt="2" fontSize="xl">
                          {data.project.clientAffiliatedAgency}
                        </Text>
                      </Box>
                    )}

                    {data.project.yearCompleted && (
                      <Box>
                        <Tag size="lg" borderRadius="full">
                          <Icon
                            h={6}
                            w={6}
                            as={AiOutlineCalendar}
                            ml={-1}
                            mr={2}
                          />
                          <TagLabel fontSize="lg">Year Completed</TagLabel>
                        </Tag>
                        <Text pl="1" pt="2" fontSize="xl">
                          {data.project.yearCompleted}
                        </Text>
                      </Box>
                    )}

                    {data.project.costBudget && (
                      <Box>
                        <Tag size="lg" borderRadius="full">
                          <Icon
                            h={6}
                            w={6}
                            as={AiOutlineDollarCircle}
                            ml={-1}
                            mr={2}
                          />
                          <TagLabel fontSize="lg">Cost / Budget</TagLabel>
                        </Tag>
                        <Text pl="1" pt="2" fontSize="xl">
                          {data.project.costBudget}
                        </Text>
                      </Box>
                    )}

                    {data.project.designer && (
                      <Box>
                        <Tag size="lg" borderRadius="full">
                          <Avatar
                            size="xs"
                            name={data.project.designer}
                            ml={-1}
                            mr={2}
                          />
                          <TagLabel fontSize="lg">Designer</TagLabel>
                        </Tag>
                        <Text pl="1" pt="2" fontSize="xl">
                          {data.project.designer}
                        </Text>
                      </Box>
                    )}

                    {data.project.description && (
                      <Box>
                        <Tag size="lg" borderRadius="full">
                          <Icon
                            h={6}
                            w={6}
                            as={AiOutlineFileText}
                            ml={-1}
                            mr={2}
                          />
                          <TagLabel fontSize="lg">Description</TagLabel>
                        </Tag>
                        <Text pl="1" pt="2" fontSize="xl" textAlign="justify">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: data.project.description,
                            }}
                          />
                        </Text>
                      </Box>
                    )}
                  </Stack>
                </CardBody>
              </Card>
            </VStack>
          </Container>
        </>
      ) : null}
    </SlideFade>
  );
}
