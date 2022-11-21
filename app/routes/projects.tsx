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
} from "@chakra-ui/react";

import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node";

// import {  } from "@remix-run/node";
import { useLoaderData, Link, useSubmit, Form } from "@remix-run/react";
import { useWindowDimensions } from "~/utils/hooks";

// import * as auth from "app/utils/auth.server";
// import { useTransition } from "@remix-run/react";
import Slider from "react-slick";
import { Search2Icon } from "@chakra-ui/icons";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

export const loader: LoaderFunction = async ({ request, params }: any) => {
  try {
    const lupton =
      "https://allconcontracting.com/image-resizing?&quality=80&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/lupton-hall/10-23-1-22.jpg";
    const stdemetrios =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/optimizedImages/image003.jpg";
    const nold =
      "https://allconcontracting.com/image-resizing?&quality=80&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/optimizedImages/11-6-21-2.webp";
    const brightwater500 =
      "https://allconcontracting.com/image-resizing?&quality=80&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/500brightwater/1-18-2022-26.jpg";
    const bareBurger =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/bareburger/DSC00354.JPG";
    const wilsonAnimal =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/willstonanimal/DSC00051.JPG";
    const west255 =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/255w/1DSC00385.JPG";
    const east209th =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/20east9th/DSC00345.JPG";
    const upperEastVetenary =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/uppereastveterinary/DSC00250.JPG";
    const carlePlaceAuditorium =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/carlplace/DSC00161.JPG";
    const carlPlaceLobby =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/carlplacelobby/carlplacelobby.JPG";
    const carlPlaceLib =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/carlplacelibrary/DSC00231.JPG";
    const njvet =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/njvet/DSC00265.JPG";
    const hudsonAnimal =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/hudsonanimal/DSC00249.JPG";
    const westchesterAve =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/866westchester/DSC00300.JPG";
    const pierrpointStreet =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/55pierre/DSC00083.JPG";
    const w79thStreet =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/164w79th/image001.jpg";
    const townhouse17w =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/17w10street/IMG_7490.jpg";

    const ogsElwood =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/OGS_Elwood/20220412_120728229_iOS.jpg";

    const greatneckRoofs =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/greatneck-terrace-roofs/11-13-21-5.jpg";

    const successAcademy =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/SuccessAcademySchools/BBR_0252-edit-1.jpg";

    const rockvillePolice =
      "https://allconcontracting.com/image-resizing?&quality=90&height=1920&width=1080&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/police-station-email/police-station-05.jpg";

    const apt724 =
      "https://allconcontracting.com/image-resizing?&quality=90&height=3840&width=2160&sharpen=2&metadata=none&image=https://allconcontracting.com:2096/files/getFile/Projects/724/3-8-20.7.jpg";

    const projects = [
      {
        title: "Lupton Hall - Roof Replacement",
        image: lupton,
        sector: "public",
        link: "/projects/LuptonHall",
      },

      {
        title: "DOT Elwood Operation Facility",
        image: ogsElwood,
        sector: "public",
        link: "/projects/DOTElwood",
      },

      {
        title: "Farmingdale Nold Hall Gymnasium",
        image: nold,
        sector: "public",
        link: "/projects/Nold",
      },

      {
        title: "500 Brightwater Court",
        image: brightwater500,
        sector: "public",
        link: "/projects/500Bridgewater",
      },
      {
        title: "Rockville Centre Police Station",
        image: rockvillePolice,
        sector: "public",
        link: "/projects/RockvilleCentrePolice",
      },

      {
        title: "Greatneck Terrace Roofs",
        image: greatneckRoofs,
        sector: "public",
        link: "/projects/GreatneckTerraceRoofs",
      },
      {
        title: "Apartment 724",
        image: apt724,
        sector: "public",
        link: "/projects/Apartment724",
      },
      {
        title: "Success Academy Schools",
        image: successAcademy,
        sector: "public",
        link: "/projects/SuccessAcademySchools",
      },
      {
        title: "St. Demetrios Greek Orthodox Church",
        image: stdemetrios,
        sector: "public",
        link: "/projects/SaintDemetriosChurch",
      },
      {
        title: "Bareburger 1681 East 87th Street",
        image: bareBurger,
        sector: "public",
        link: "/projects/Bareburger",
      },
      {
        title: "Williston Animal Hospital",
        image: wilsonAnimal,
        sector: "public",
        link: "/projects/WilsonAnimal",
      },
      {
        title: "255 West 108th Street",
        image: west255,
        sector: "public",
        link: "/projects/255West",
      },

      {
        title: "20 East 9th Street",
        image: east209th,
        sector: "public",
        link: "/projects/20East",
      },
      {
        title: "Upper East Side Veterinary Hospital",
        image: upperEastVetenary,
        sector: "public",
        link: "/projects/UpperEastVetenary",
      },
      {
        title: "Carle Place UFSD – Auditorium Renovations",
        image: carlePlaceAuditorium,
        sector: "public",
        link: "/projects/CarlePlaceAuditorium",
      },

      {
        title: "Carle Place UFSD – Lobby Renovations",
        image: carlPlaceLobby,
        sector: "public",
        link: "/projects/CarlePlaceLobby",
      },

      {
        title: "Carle Place UFSD – Library Renovations",
        image: carlPlaceLib,
        sector: "public",
        link: "/projects/CarlePlaceLibrary",
      },
      {
        title: "New Jersey Veterinary Hospital",
        image: njvet,
        sector: "public",
        link: "/projects/NewJerseyVeterinary ",
      },
      {
        title: "Hudson Animal Hospital",
        image: hudsonAnimal,
        sector: "public",
        link: "/projects/HudsonAnimalHospital",
      },
      {
        title: "866 Westchester Ave.",
        image: westchesterAve,
        sector: "public",
        link: "/projects/866Westchester",
      },
      {
        title: "55 Pierrpoint Street",
        image: pierrpointStreet,
        sector: "private",
        link: "/projects/55Pierrpoint",
      },
      {
        title: "164 W79th Street",
        image: w79thStreet,
        sector: "private",
        link: "/projects/164_W79th",
      },

      {
        title: "17W 10th St Townhouse",
        image: townhouse17w,
        sector: "private",
        link: "/projects/17W_10th_Townhouse ",
      },
    ];

    const url = new URL(request.url);
    const searchParams = url.searchParams.get("search");
    const sectorParams = url.searchParams.get("sector");

    if (searchParams && sectorParams) {
      const filtredProjects = projects.filter(
        (value) =>
          value.title.toLowerCase().includes(searchParams.toLowerCase()) &&
          value.sector.toLowerCase().includes(sectorParams.toLowerCase())
      );

      return { projects: filtredProjects };
    }

    if (searchParams) {
      const filtredProjects = projects.filter((value) =>
        value.title.toLowerCase().includes(searchParams.toLowerCase())
      );

      return { projects: filtredProjects };
    }

    if (sectorParams) {
      const filtredProjects = projects.filter((value) =>
        value.sector.toLowerCase().includes(sectorParams.toLowerCase())
      );

      return { projects: filtredProjects };
    }

    return { projects: projects };
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
                  to={value.link}
                  w="full"
                >
                  <Image
                    roundedTopLeft="md"
                    roundedTopRight="md"
                    objectFit="cover"
                    h={{ base: "350px", sm: "450px" }}
                    src={value.image}
                    alt={`${value.title} project`}
                    boxShadow="xl"
                    draggable={false}
                    userSelect="none"
                    w="full"
                    fallback={
                      <Skeleton h={{ base: "350px", sm: "450px" }} w="full" />
                    }
                  />
                  <CardFooter justifyContent="center" p={2}>
                    <Text textAlign="center" fontSize="xl">
                      {value.title}
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
