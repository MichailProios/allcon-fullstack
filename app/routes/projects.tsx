import { Fragment, LegacyRef, useEffect, useRef, useState } from "react";
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
  Checkbox,
  FormControl,
  FormLabel,
  Switch,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Highlight,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import { redirect, json } from "@remix-run/node";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import * as cookie from "app/utils/cookie.server";

// import {  } from "@remix-run/node";
import {
  useLoaderData,
  Link,
  useSubmit,
  Form,
  useMatches,
  useTransition,
} from "@remix-run/react";
import { useWindowDimensions } from "~/utils/hooks";

// import * as auth from "app/utils/auth.server";
// import { useTransition } from "@remix-run/react";
import Slider from "react-slick";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  QuestionIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import projects from "~/utils/projects";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Projects`,
  description: "Allcon Contracting project listing",
});

export const loader: LoaderFunction = async ({ request, params }: any) => {
  try {
    // const url = new URL(request.url);
    // const search = url.searchParams.get("search");

    // if (search) {
    //   return json({
    // search: search,
    // projects: Array.from(projects.values()).filter((value) =>
    //   value.name.toLowerCase().includes(search)
    // ),
    //   });
    // } else {
    // return json({
    //   projects: Array.from(projects.values()),
    // });
    // }

    const session = await cookie.getSession(request.headers.get("Cookie"));
    const filter = session.get("filter") || null;

    if (filter?.search) {
      return json({
        filter: filter?.search,
        projects: Array.from(projects.values()).filter(
          (value) =>
            value.name.toLowerCase().includes(filter?.search.toLowerCase()) ||
            value.client?.tag
              .toLowerCase()
              .includes(filter?.search.toLowerCase())
        ),
      });
    } else {
      return json(
        {
          projects: Array.from(projects.values()),
        },
        {
          headers: {
            "Set-Cookie": await cookie.destroySession(session),
          },
        }
      );
    }
  } catch (error) {
    throw error;
  }
};

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const search = data.get("search");

  console.log(search);
  // const sectorParams = data.get("sector");

  // const [parent, enableAnimations] = useAutoAnimate();

  // if (searchParams) {
  //   searchUrl = `?search=${searchParams}`;
  // }

  // let sectorUrl = null;

  // if (sectorParams) {
  //   sectorUrl = `?sector=${sectorParams}`;
  // }

  // if (sectorParams && searchParams) {
  //   sectorUrl = `&sector=${sectorParams}`;
  // }

  // const url = `${searchUrl || ""}${sectorUrl || ""}`;

  // try {
  //   if (searchParams || sectorParams) {
  //     return redirect(`/projects${url}`);
  //   } else {
  //     return redirect("/projects");

  //   }
  try {
    const session = await cookie.getSession(request.headers.get("Cookie"));
    session.flash("filter", { search });

    return json(
      { status: "Filtering Projects" },
      {
        headers: {
          "Set-Cookie": await cookie.commitSession(session),
        },
      }
    );
  } catch (error) {
    return "error";
  }
}

export default function Index() {
  const [showButton, setShowButton] = useState({ index: null, flag: false });
  const submit = useSubmit();
  const data = useLoaderData();

  function handleChange(event: any) {
    submit(event.currentTarget);
  }

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container
        maxW={"1600px"}
        px={{ base: 6, md: 10 }}
        py={14}
        as={Form}
        method="post"
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
            {/* <Tabs
              variant="unstyled"
              colorScheme="gray"
              orientation="horizontal"
              w="full"
              justifyContent="center"
            >
              <TabList
                gap={2}
                justifyContent="center"
                flexDirection={{ base: "column", sm: "row" }}
              >
                <Tab
                  w={{ base: "100%", sm: "8em" }}
                  fontWeight="semibold"
                  _selected={{ bg: "primary.200" }}
                  rounded="md"
                  as={Button}
                  variant="solid"
                >
                  All Projects
                </Tab>
                <Tab
                  w={{ base: "100%", sm: "8em" }}
                  fontWeight="semibold"
                  _selected={{ bg: "primary.200" }}
                  rounded="md"
                  as={Button}
                  variant="solid"
                >
                  SUNY
                </Tab>
                <Tab
                  w={{ base: "100%", sm: "8em" }}
                  fontWeight="semibold"
                  _selected={{ bg: "primary.200" }}
                  rounded="md"
                  as={Button}
                  variant="solid"
                >
                  OGS
                </Tab>
                <Tab
                  w={{ base: "100%", sm: "8em" }}
                  fontWeight="semibold"
                  _selected={{ bg: "primary.200" }}
                  rounded="md"
                  as={Button}
                  variant="solid"
                >
                  SCA
                </Tab>
                <Tab
                  w={{ base: "100%", sm: "8em" }}
                  fontWeight="semibold"
                  _selected={{ bg: "primary.200" }}
                  rounded="md"
                  as={Button}
                  variant="solid"
                >
                  Interior
                </Tab>
              </TabList>
            </Tabs> */}

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
                  defaultValue={data.filter}
                  bgColor="gray.50"
                />
              </InputGroup>

              {/* <Select
                colorScheme="primary"
                placeholder="All Sectors"
                w={{ base: "full", sm: "220px" }}
                name="sector"
              >
                <option value="public">Public Sector</option>
                <option value="private">Private Sector</option>
              </Select> */}

              {/* <Menu closeOnSelect={false} autoSelect={false}>
                <MenuButton
                  as={Button}
                  bgColor="gray.50"
                  rightIcon={<ChevronDownIcon />}
                >
                  Filter
                </MenuButton>
                <MenuList>
                  <MenuItem _hover={{ bgColor: "transparent" }}>
                    <Flex direction="column">
                      <Checkbox
                        isChecked={allChecked}
                        isIndeterminate={isIndeterminate}
                        onChange={(e) =>
                          setCheckedItems([e.target.checked, e.target.checked])
                        }
                      >
                        All Sectors
                      </Checkbox>
                      <Stack pl={6} mt={1} spacing={1}>
                        <Checkbox
                          isChecked={checkedItems[0]}
                          onChange={(e) =>
                            setCheckedItems([e.target.checked, checkedItems[1]])
                          }
                        >
                          Private Sector
                        </Checkbox>
                        <Checkbox
                          isChecked={checkedItems[1]}
                          onChange={(e) =>
                            setCheckedItems([checkedItems[0], e.target.checked])
                          }
                        >
                          Public Sector
                        </Checkbox>
                      </Stack>
                    </Flex>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem _hover={{ bgColor: "transparent" }}>
                    <Flex direction="column">
                      <Checkbox
                        isChecked={allChecked1}
                        isIndeterminate={isIndeterminate1}
                        onChange={(e) =>
                          setCheckedItems1([
                            e.target.checked,
                            e.target.checked,
                            e.target.checked,
                          ])
                        }
                      >
                        All Categories
                      </Checkbox>
                      <Stack pl={6} mt={1} spacing={1}>
                        <Checkbox
                          isChecked={checkedItems1[0]}
                          onChange={(e) =>
                            setCheckedItems1([
                              e.target.checked,
                              checkedItems1[1],
                              checkedItems1[2],
                            ])
                          }
                        >
                          Exterior
                        </Checkbox>
                        <Checkbox
                          isChecked={checkedItems1[1]}
                          onChange={(e) =>
                            setCheckedItems1([
                              checkedItems1[0],
                              e.target.checked,
                              checkedItems1[2],
                            ])
                          }
                        >
                          Interior
                        </Checkbox>
                        <Checkbox
                          isChecked={checkedItems1[2]}
                          onChange={(e) =>
                            setCheckedItems1([
                              checkedItems1[0],
                              checkedItems1[1],
                              e.target.checked,
                            ])
                          }
                        >
                          Apartments
                        </Checkbox>
                      </Stack>
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu> */}
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
                  <AspectRatio key={index} ratio={{ base: 4 / 3, md: 16 / 9 }}>
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
                      <Highlight
                        query={data.filter || ""}
                        styles={{
                          px: "4px",
                          py: "4px",
                          bg: "primary.100",
                          borderRadius: "0.375rem",
                        }}
                      >
                        {value.name as string}
                      </Highlight>
                    </Text>
                  </CardFooter>

                  <Box position="absolute" top="8px" right="8px">
                    <VStack alignItems="flex-end" spacing={2}>
                      {value.status?.completed === true && (
                        <Tooltip label={value.status?.text} closeOnScroll>
                          <Badge colorScheme="green">Completed</Badge>
                        </Tooltip>
                      )}

                      {value.status?.completed === false && (
                        <Tooltip label={value.status?.text} closeOnScroll>
                          <Badge colorScheme="yellow">in progress</Badge>
                        </Tooltip>
                      )}
                      {value?.categories &&
                        value.categories.map((value: any, index: any) => (
                          <Tooltip key={index} label={value.text} closeOnScroll>
                            <Badge colorScheme="teal">{value.tag}</Badge>
                          </Tooltip>
                        ))}
                      {value.client?.tag && (
                        <Tooltip label={value.client?.text} closeOnScroll>
                          <Badge colorScheme="blue">{value.client.tag}</Badge>
                        </Tooltip>
                      )}
                    </VStack>
                  </Box>

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
            <Box textAlign="center" py={10} px={6}>
              <QuestionIcon boxSize={"50px"} color="primary.500" />
              <Heading as="h2" size="lg" mt={6} mb={2}>
                No Results
              </Heading>
              <Text color={"gray.500"}>
                The search terms you provided did not match any of our records.
                Please try again using different keywords.
              </Text>
            </Box>
          )}
        </VStack>
      </Container>

      {/* <Container maxW={"1600px"} px={2} py={4}>
        <Flex w="full" alignItems="center" justifyContent="center">
          <IconButton
            aria-label="previous"
            mx={1}
            px={4}
            py={2}
            rounded="md"
            icon={<ChevronLeftIcon />}
          />
          <Button
            mx={1}
            px={4}
            py={2}
            rounded="md"
            isActive
            colorScheme="primary"
          >
            1
          </Button>
          <Button mx={1} px={4} py={2} rounded="md">
            2
          </Button>
          <Button mx={1} px={4} py={2} rounded="md">
            3
          </Button>
          <IconButton
            aria-label="next"
            mx={1}
            px={4}
            py={2}
            rounded="md"
            icon={<ChevronRightIcon />}
          />
        </Flex>
      </Container> */}
    </SlideFade>
  );
}
