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
  SimpleGrid,
  CardFooter,
  Input,
  InputLeftElement,
  InputGroup,
  Flex,
  Stack,
  Select,
  Skeleton,
  ButtonGroup,
  IconButton,
  Tooltip,
  AspectRatio,
} from "@chakra-ui/react";

import { LoaderFunction, MetaFunction, redirect, json } from "@remix-run/node";

// import {  } from "@remix-run/node";
import { useLoaderData, Link, useSubmit, Form } from "@remix-run/react";
import { useWindowDimensions } from "~/utils/hooks";

// import * as auth from "app/utils/auth.server";
// import { useTransition } from "@remix-run/react";
import Slider from "react-slick";
import { Search2Icon } from "@chakra-ui/icons";
import projects from "~/utils/projects";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Projects`,
  description: "Allcon Contracting project listing",
});

export const loader: LoaderFunction = async ({ request, params }: any) => {
  try {
    return json({
      projects: Array.from(projects.values()),
    });
  } catch (error) {
    throw error;
  }
};

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const searchParams = data.get("search");
  const sectorParams = data.get("sector");

  let searchUrl = null;

  if (searchParams) {
    searchUrl = `?search=${searchParams}`;
  }

  let sectorUrl = null;

  if (sectorParams) {
    sectorUrl = `?sector=${sectorParams}`;
  }

  if (sectorParams && searchParams) {
    sectorUrl = `&sector=${sectorParams}`;
  }

  const url = `${searchUrl || ""}${sectorUrl || ""}`;

  try {
    if (searchParams || sectorParams) {
      return redirect(`/projects/${url}`);
    } else {
      return redirect("/projects");
    }
  } catch (error) {
    return "error";
  }
}

export default function Index() {
  const [showButton, setShowButton] = useState({ index: null, flag: false });
  const submit = useSubmit();
  const data = useLoaderData();

  function handleChange(event: any) {
    submit(event.currentTarget, { replace: true });
  }

  useEffect(() => {
    submit(null, { method: "post", action: "/projects" });
  }, []);

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container
        maxW={"1600px"}
        px={{ base: 6, md: 10 }}
        py={14}
        as={Form}
        method="post"
        action="/projects"
        onChange={handleChange}
      >
        <VStack spacing="26px">
          <Heading textAlign="center">Projects</Heading>
          <VStack
            spacing="16px"
            justifyContent="center"
            alignItems="center"
            w="full"
          >
            <Stack
              direction={{ base: "column", sm: "row" }}
              w="full"
              justifyContent="center"
              alignItems="center"
            >
              <InputGroup w="full" colorScheme="primary">
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon color="gray.300" />}
                />
                <Input
                  type="text"
                  name="search"
                  colorScheme="primary"
                  placeholder="Search for projects"
                  w="full"
                />
              </InputGroup>

              <Select
                colorScheme="primary"
                placeholder="All Sectors"
                w={{ base: "full", sm: "220px" }}
                name="sector"
              >
                <option value="public">Public Sector</option>
                <option value="private">Private Sector</option>
              </Select>
            </Stack>
            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 2, xl: 2 }}
              spacing={4}
              w="full"
            >
              {data.projects.map((value: any, index: any) => (
                <Card
                  key={index}
                  variant="elevated"
                  rounded="md"
                  boxShadow="xl"
                  position="relative"
                  onMouseEnter={(e) => {
                    setShowButton({ index: index, flag: true });
                  }}
                  onMouseLeave={(e) => {
                    setShowButton({ index: index, flag: false });
                  }}
                  transition="transform 0.15s ease-in-out"
                  _hover={{
                    transform: { md: "none", lg: "scale3d(1.01, 1.01, 1)" },
                  }}
                  as={Link}
                  to={value.path}
                  draggable={false}
                  w="full"
                  h="full"
                >
                  <AspectRatio key={index} ratio={16 / 9}>
                    <Image
                      roundedTopLeft="md"
                      roundedTopRight="md"
                      // objectFit="cover"
                      // h={{ base: "350px", sm: "450px" }}
                      src={value.thumbnail}
                      alt={`${value.name} project`}
                      boxShadow="xl"
                      draggable={false}
                      userSelect="none"
                      w="full"
                      fallback={
                        <Skeleton h={{ base: "350px", sm: "450px" }} w="full" />
                      }
                    />
                  </AspectRatio>
                  <CardFooter justifyContent="center" p={2}>
                    <Text textAlign="center" fontSize="xl">
                      {value.name}
                    </Text>
                  </CardFooter>

                  <Box display={{ base: "none", lg: "flex" }}>
                    <SlideFade
                      in={showButton.index === index ? showButton.flag : false}
                      reverse
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                      >
                        <Button variant="solid" boxShadow="lg" rounded="md">
                          View Project
                        </Button>
                      </Box>
                    </SlideFade>
                  </Box>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
          {data.projects.length <= 0 && (
            <Text textAlign="center" fontSize="lg">
              No Results
            </Text>
          )}
        </VStack>
      </Container>
    </SlideFade>
  );
}
