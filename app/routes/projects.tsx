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
  InputRightElement,
  Kbd,
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

import { CloseIcon, QuestionIcon, Search2Icon } from "@chakra-ui/icons";
import projects from "~/utils/projects";

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Projects`,
  description: "Allcon Contracting project listing",
});

export const loader: LoaderFunction = async ({ request, params }: any) => {
  try {
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
        { projects: Array.from(projects.values()) },
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

  try {
    switch (data.get("type")) {
      case "search": {
        const search = data.get("search");
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
      }

      case "clear": {
        const session = await cookie.getSession(request.headers.get("Cookie"));

        return json(
          { status: "Clearing Search" },
          {
            headers: {
              "Set-Cookie": await cookie.destroySession(session),
            },
          }
        );
      }

      default: {
        throw new Error("Unexpected action");
      }
    }
  } catch (error) {
    return "error";
  }
}

export default function Index() {
  const [showButton, setShowButton] = useState({ index: null, flag: false });
  const submit = useSubmit();
  const inputRef = useRef<any>(null);
  const data = useLoaderData();

  function onEnter(e: any) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  function handleFormSearch(event: any) {
    submit(event.currentTarget);
  }

  function handleFormClear() {
    const formData = new FormData();
    formData.set("type", "clear");
    submit(formData, { method: "delete" });
    inputRef.current.value = "";
  }

  useEffect(() => {
    const ctrl1 = (e: KeyboardEvent) =>
      e.ctrlKey && e.key.toLowerCase() === "k";

    const handler = (e: KeyboardEvent) => {
      if (ctrl1(e)) {
        inputRef.current.focus();
      }
    };

    const ignore = (e: KeyboardEvent) => {
      if (ctrl1(e)) {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", handler);
    window.addEventListener("keydown", ignore);

    return () => {
      window.removeEventListener("keyup", handler);
      window.removeEventListener("keydown", ignore);
    };
  }, []);

  useEffect(() => {
    if (data.filter) {
      handleFormClear();
    }
  }, []);

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container
        maxW={"1600px"}
        px={{ base: 6, md: 10 }}
        py={14}
        as={Form}
        method="post"
        onChange={handleFormSearch}
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
                <InputRightElement
                  mr={{ base: 0, md: 8 }}
                  children={
                    <Flex gap={1} justifyContent="center" alignItems="center">
                      <Box display={{ base: "none", md: "flex" }} gap={1}>
                        <Kbd>Ctrl</Kbd>
                        <Kbd>K</Kbd>
                      </Box>
                      <Tooltip label="Clear Search" closeOnScroll>
                        <IconButton
                          aria-label="Clear Search"
                          size="xs"
                          onClick={handleFormClear}
                          icon={<CloseIcon />}
                        />
                      </Tooltip>
                    </Flex>
                  }
                />
                <Input
                  ref={inputRef}
                  type="text"
                  name="search"
                  colorScheme="primary"
                  placeholder="Search for projects"
                  w="full"
                  onKeyUp={onEnter}
                  defaultValue={data.filter}
                />
              </InputGroup>

              <input type="hidden" name="type" value="search" />
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
                  onMouseEnter={(e: any) => {
                    setShowButton({ index: index, flag: true });
                  }}
                  onMouseLeave={(e: any) => {
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
                  // h="full"
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
