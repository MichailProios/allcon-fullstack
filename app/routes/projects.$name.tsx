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
  Badge,
} from "@chakra-ui/react";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { json } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { useWindowDimensions } from "~/utils/hooks";

// import { GrNext, GrPrevious } from "react-icons/gr";

import { ChevronRightIcon, ChevronLeftIcon, InfoIcon } from "@chakra-ui/icons";

import Slider from "react-slick";

import { projects } from "~/utils/projects";

import {
  AiOutlineDollarCircle,
  AiOutlineCalendar,
  AiOutlineFileText,
} from "react-icons/ai";
import { BiBuildings, BiMap } from "react-icons/bi";

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
      <Container maxW={"1400px"} px={{ base: 6, md: 10 }} py={14}>
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
              dots={false}
              infinite={true}
              speed={300}
              lazyLoad="progressive"
              slidesToShow={1}
              slidesToScroll={1}
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
                            // pointerEvents: "none",
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
      </Container>{" "}
      <Divider />
      <Container maxW={"1400px"} px={{ base: 6, md: 10 }} py={14}>
        <VStack spacing="18px">
          {data.project.clientAffiliatedAgency ||
          data.project.location ||
          data.project.status ||
          data.project.costBudget ||
          data.project.designer ||
          data.project.description ? (
            <>
              {" "}
              <Heading textAlign="center">Project Information</Heading>
              <Card rounded="md" boxShadow="xl" w={"full"}>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    {data.project.location && (
                      <Box>
                        <Tag size="lg" borderRadius="full">
                          <Icon h={6} w={6} as={BiMap} ml={-1} mr={2} />
                          <TagLabel fontSize="lg">Location</TagLabel>
                        </Tag>
                        <AspectRatio
                          ratio={{ base: 1, md: 16 / 9 }}
                          maxW="100%"
                          mb={4}
                          ml={1}
                          mt={4}
                        >
                          <iframe
                            title={`Project ${data.project.title} location`}
                            src={data.project.location}
                            style={{
                              border: "none",
                              height: "100%",
                              width: "100%",
                              borderRadius: "0.375rem",
                              color: "#f3f3f3",
                            }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </AspectRatio>
                      </Box>
                    )}
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

                    {data.project.status && (
                      <Box>
                        <HStack alignItems="center">
                          <Tag size="lg" borderRadius="full">
                            <Icon
                              h={6}
                              w={6}
                              as={AiOutlineCalendar}
                              ml={-1}
                              mr={2}
                            />
                            <TagLabel fontSize="lg">Status</TagLabel>
                          </Tag>
                          {data.project.status.completed ? (
                            <Badge colorScheme="green">completed</Badge>
                          ) : (
                            <Badge colorScheme="yellow">not completed</Badge>
                          )}
                        </HStack>
                        <Text fontSize="xl">{data.project.status.text}</Text>
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
                        <Text
                          pl="1"
                          pt="2"
                          fontSize="xl"
                          textAlign={{ base: "start", sm: "justify" }}
                        >
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
            </>
          ) : (
            <Card rounded="md" boxShadow="xl" w={"full"}>
              <CardBody>
                <Box textAlign="center" py={10} px={6}>
                  <InfoIcon boxSize={"50px"} color={"primary.500"} />
                  <Heading as="h2" size="lg" mt={6} mb={2}>
                    This project has no additional information
                  </Heading>
                  <Text color={"gray.500"}>
                    Our team is devoted to providing accurate data for each
                    project. Please allow us some time as we update "
                    {data.project.name}"
                  </Text>
                </Box>
              </CardBody>
            </Card>
          )}
        </VStack>
      </Container>
    </SlideFade>
  );
}
