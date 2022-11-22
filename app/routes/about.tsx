import {
  Container,
  Heading,
  VStack,
  Text,
  SlideFade,
  Image,
  Divider,
  Card,
  CardBody,
  Skeleton,
  Stack,
  Box,
  Avatar,
  AspectRatio,
} from "@chakra-ui/react";

import { Fragment, useEffect } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { profiles } from "~/utils/profiles";
import { any } from "zod";

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - About`,
  description: `Allcon Contracting is built on a reputation of delivering high
              quality projects serving a variety of private and public clients
              throughout New York State.`,
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
    <SlideFade in={true} reverse delay={0.1}>
      <Container maxW="1400px" px={{ base: 6, md: 10 }} py={14}>
        <VStack spacing="26px">
          <Heading textAlign="center">About Us</Heading>
          <VStack>
            <Text fontSize="xl" textAlign="justify">
              Allcon Contracting is built on a reputation of delivering high
              quality projects serving a variety of private and public clients
              throughout New York State.
              <br />
              <br /> Our Executive Management understands that teamwork, which
              includes hands on involvement of the owners, guarantees that all
              projects are completed on time and on budget. Allcon's staff is
              always meticulous with the details of each project and they
              continuously strive to go the extra mile and deliver quality
              results. From architects, planners, designers, and construction
              specialists, everyone works in a collaborative environment
              bringing forth their unique talent and techniques.
              <br />
              <br />
              Our Executive Management understands that teamwork, which includes
              hands on involvement of the owners, guarantees that all projects
              are completed on time and on budget. Allcon's staff is always
              meticulous with the details of each project and they continuously
              strive to go the extra mile and deliver quality results. From
              architects, planners, designers, and construction specialists,
              everyone works in a collaborative environment bringing forth their
              unique talent and techniques.
              <br />
              <br />
            </Text>
            <AspectRatio ratio={16 / 9} w="full">
              <Image
                src={data.allconStaff}
                alt="Company Group Photo"
                objectFit="contain"
                boxShadow="xl"
                rounded="md"
                userSelect="none"
                draggable={false}
                fallback={<Skeleton h="full" w="full" />}
              />
            </AspectRatio>
          </VStack>
        </VStack>
      </Container>
      <Divider />
      <Container maxW="1400px" px={{ base: 6, md: 10 }} py={14}>
        <VStack spacing="18px">
          <Heading textAlign="center"> Executives</Heading>
          <VStack spacing="26px">
            {data.profiles.map((value: any, index: any) => (
              <Card
                key={index}
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
                    fallback={
                      <Skeleton
                        w={"full"}
                        h={"full"}
                        display={{ base: "none", xl: "flex" }}
                      />
                    }
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

                  <Text py="2" fontSize="xl" textAlign="justify">
                    <span
                      dangerouslySetInnerHTML={{ __html: value.description }}
                    />
                  </Text>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </VStack>
      </Container>
    </SlideFade>
  );
}
