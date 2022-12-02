import { Fragment, useCallback, useEffect, useRef, useState } from "react";
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
  Skeleton,
  IconButton,
  Tooltip,
  AspectRatio,
  Highlight,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputRightElement,
  Kbd,
  Progress,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { animateScroll as scroll } from "react-scroll";

import { AnimatePresence, motion } from "framer-motion";

import { redirect, json } from "@remix-run/node";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import * as cookie from "app/utils/cookie.server";

// import {  } from "@remix-run/node";
import {
  useLoaderData,
  Link,
  useSubmit,
  Form,
  useBeforeUnload,
  useTransition,
} from "@remix-run/react";

import { CloseIcon, QuestionIcon, Search2Icon } from "@chakra-ui/icons";
import projects from "~/utils/projects";
import { useFirstRender, useLoading } from "~/utils/hooks";

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Projects`,
  description: "Allcon Contracting projects listing.",

  "og:title": "Allcon Contracting - Projects",
  "og:type": "business",
  "og:site_name": "Allcon Contracting",
  "og:description": `Allcon Contracting projects listing.`,
  "og:image":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e81be543-83e6-4173-3254-77df4d1ff900/thumbnail",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e81be543-83e6-4173-3254-77df4d1ff900/thumbnail",
  "og:url": "https://allconcontracting.com/projects",
});

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    const session = await cookie.getSession(request.headers.get("Cookie"));
    const filter = session.get("filter") || null;

    if (filter?.search && !filter?.clientCategory) {
      return json({
        filter: filter,
        projects: Array.from(projects.values()).filter(
          (value) =>
            value.name.toLowerCase().includes(filter?.search.toLowerCase()) ||
            value.client?.tag
              .toLowerCase()
              .includes(filter?.search.toLowerCase())
        ),
      });
    } else if (filter?.clientCategory && !filter?.search) {
      return json({
        filter: filter,
        projects: Array.from(projects.values()).filter(
          (value) =>
            value.client?.tag
              .toLowerCase()
              .includes(filter?.clientCategory.toLowerCase()) ||
            value.category?.tag
              .toLowerCase()
              .includes(filter?.clientCategory.toLowerCase())
        ),
      });
    } else if (filter?.search && filter?.clientCategory) {
      return json({
        filter: filter,
        projects: Array.from(projects.values()).filter(
          (value) =>
            (value.name.toLowerCase().includes(filter?.search.toLowerCase()) ||
              value.client?.tag
                .toLowerCase()
                .includes(filter?.search.toLowerCase())) &&
            (value.client?.tag
              .toLowerCase()
              .includes(filter?.clientCategory.toLowerCase()) ||
              value.category?.tag
                .toLowerCase()
                .includes(filter?.clientCategory.toLowerCase()))
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
    const type = data.get("type");
    const search = data.get("search") || "";
    const clientCategory = data.get("clientCategory") || "";

    switch (type) {
      case "search": {
        const session = await cookie.getSession(request.headers.get("Cookie"));
        session.flash("filter", {
          search: search,
          clientCategory: clientCategory,
        });

        return json(
          { status: "Filtering Projects" },
          {
            headers: {
              "Set-Cookie": await cookie.commitSession(session),
            },
          }
        );
      }

      case "clientCategory": {
        const session = await cookie.getSession(request.headers.get("Cookie"));
        session.flash("filter", {
          search: search,
          clientCategory: clientCategory,
        });

        return json(
          { status: "Filtering Projects" },
          {
            headers: {
              "Set-Cookie": await cookie.commitSession(session),
            },
          }
        );
      }

      case "clearSearch": {
        const session = await cookie.getSession(request.headers.get("Cookie"));
        session.flash("filter", {
          search: search,
          clientCategory: clientCategory,
        });

        return json(
          { status: "Clearing Search" },
          {
            headers: {
              "Set-Cookie": await cookie.commitSession(session),
            },
          }
        );
      }

      case "clearAll": {
        const session = await cookie.getSession(request.headers.get("Cookie"));

        return json(
          { status: "Clearing All" },
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
  const toast = useToast();
  const toastIdRef = useRef<any>();

  const submit = useSubmit();
  const inputRef = useRef<any>(null);
  const data = useLoaderData();
  const firstRender = useFirstRender();

  const [inputValue, setInputValue] = useState({
    text: data.filter?.search || "",
    type: "",
  });

  function onEnter(e: any) {
    if (e.key === "Enter") {
      e.target.blur();
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.type !== "clear") {
        handleFormSearch(inputValue.text);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toastIdRef.current) {
        toast.closeAll();
        toastIdRef.current = null;
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [toastIdRef.current]);

  useEffect(() => {
    return () => {
      toast.closeAll();
      toastIdRef.current = null;
    };
  }, []);

  function handleFormSearch(input: string) {
    if (!firstRender) {
      if (!toastIdRef.current) {
        toastIdRef.current = toast({
          title: "Searching projects",
          status: "loading",
          duration: null,
          isClosable: false,
        });
      } else if (toastIdRef.current) {
        toast.update(toastIdRef.current, {
          title: "Searching projects",
          status: "loading",
          duration: null,
          isClosable: false,
        });
      }
      const formData = new FormData();
      formData.set("search", input);
      formData.set("type", "search");
      formData.set(
        "clientCategory",
        checkClient(data.filter?.clientCategory).clientCategory
      );
      submit(formData, { method: "post" });
    }
  }

  function handleFormClientCategory(clientCategory: string) {
    if (!toastIdRef.current) {
      toastIdRef.current = toast({
        title: `Showing ${clientCategory || "all"} projects`,
        status: "loading",
        duration: null,
        isClosable: false,
      });
    } else if (toastIdRef.current) {
      toast.update(toastIdRef.current, {
        title: `Showing ${clientCategory || "all"} projects`,
        status: "loading",
        duration: null,
        isClosable: false,
      });
    }

    setInputValue({ text: "", type: "clear" });
    const formData = new FormData();
    formData.set("type", "clientCategory");
    formData.set("clientCategory", clientCategory);
    submit(formData, { method: "post" });
  }

  function handleFormSearchClear() {
    setInputValue({ text: "", type: "clear" });
    const formData = new FormData();
    formData.set("type", "clearSearch");
    formData.set("search", "");
    formData.set(
      "clientCategory",
      checkClient(data.filter?.clientCategory).clientCategory || ""
    );
    submit(formData, { method: "delete" });
  }

  function handleFormAllClear() {
    setInputValue({ text: "", type: "clear" });
    const formData = new FormData();
    formData.set("type", "clearAll");
    submit(formData, { method: "delete" });
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
      handleFormAllClear();
      scroll.scrollToTop({
        duration: 400,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, []);

  const [tabIndex, setTabIndex] = useState();

  function handleTabsChange(index: any) {
    setTabIndex(index);
  }

  function checkClient(clientCategory: string) {
    switch (clientCategory) {
      case "":
        return { index: 0, clientCategory: clientCategory };
      case "interior":
        return { index: 1, clientCategory: clientCategory };
      case "exterior":
        return { index: 2, clientCategory: clientCategory };
      case "suny":
        return { index: 3, clientCategory: clientCategory };
      case "ogs":
        return { index: 4, clientCategory: clientCategory };

      case "sca":
        return { index: 5, clientCategory: clientCategory };

      default:
        return { index: 0, clientCategory: "" };
    }
  }

  useEffect(() => {
    handleTabsChange(checkClient(data.filter?.clientCategory).index);
  }, [data.filter?.clientCategory]);

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container
        maxW={"1600px"}
        px={{ base: 6, md: 10 }}
        py={14}
        as={Form}
        method="post"
        onSubmit={() => {
          if (!firstRender) {
            if (!toastIdRef.current) {
              toastIdRef.current = toast({
                title: "Searching projects",
                status: "loading",
                duration: null,
                isClosable: false,
              });
            } else if (toastIdRef.current) {
              toast.update(toastIdRef.current, {
                title: "Searching projects",
                status: "loading",
                duration: null,
                isClosable: false,
              });
            }
          }
        }}
      >
        <VStack spacing="26px">
          <Heading textAlign="center">Projects</Heading>

          <VStack
            spacing={"16px"}
            justifyContent="center"
            alignItems="center"
            w="full"
          >
            <VStack
              spacing={2}
              justifyContent="center"
              alignItems="center"
              w="full"
            >
              <Tabs
                variant="unstyled"
                colorScheme="gray"
                orientation="horizontal"
                w="full"
                justifyContent="center"
                index={tabIndex}
                onChange={handleTabsChange}
              >
                <TabList justifyContent="center" w="full">
                  <SimpleGrid
                    justifyContent="center"
                    columns={{ base: 1, xs: 2, sm: 3, md: 3, lg: 6, xl: 6 }}
                    spacing={2}
                    w={{ base: "full", sm: "auto" }}
                  >
                    <Tooltip
                      label="Show all projects"
                      closeOnScroll
                      display={{ base: "none", sm: "flex" }}
                    >
                      <Tab
                        w={{ base: "full", sm: "8em" }}
                        fontWeight="semibold"
                        _selected={{
                          color: "white",
                          bg: "primary.500",
                        }}
                        rounded="md"
                        as={Button}
                        variant="outline"
                        boxShadow="md"
                        onClick={() => handleFormClientCategory("")}
                      >
                        All Projects
                      </Tab>
                    </Tooltip>
                    <Tooltip
                      label="Show interior projects"
                      closeOnScroll
                      display={{ base: "none", sm: "flex" }}
                    >
                      <Tab
                        w={{ base: "full", sm: "8em" }}
                        fontWeight="semibold"
                        _selected={{ color: "white", bg: "primary.500" }}
                        rounded="md"
                        as={Button}
                        variant="outline"
                        boxShadow="md"
                        onClick={() => handleFormClientCategory("interior")}
                      >
                        Interior
                      </Tab>
                    </Tooltip>
                    <Tooltip
                      label="Show exterior projects"
                      closeOnScroll
                      display={{ base: "none", sm: "flex" }}
                    >
                      <Tab
                        w={{ base: "full", sm: "8em" }}
                        fontWeight="semibold"
                        _selected={{ color: "white", bg: "primary.500" }}
                        rounded="md"
                        as={Button}
                        variant="outline"
                        boxShadow="md"
                        onClick={() => handleFormClientCategory("exterior")}
                      >
                        Exterior
                      </Tab>
                    </Tooltip>
                    <Tooltip
                      label="Show State University of New York projects"
                      closeOnScroll
                      display={{ base: "none", sm: "flex" }}
                    >
                      <Tab
                        w={{ base: "full", sm: "8em" }}
                        fontWeight="semibold"
                        _selected={{ color: "white", bg: "primary.500" }}
                        rounded="md"
                        as={Button}
                        variant="outline"
                        boxShadow="md"
                        onClick={() => handleFormClientCategory("suny")}
                      >
                        SUNY
                      </Tab>
                    </Tooltip>
                    <Tooltip
                      label="Show NYS Office of General Services projects"
                      closeOnScroll
                      display={{ base: "none", sm: "flex" }}
                    >
                      <Tab
                        w={{ base: "full", sm: "8em" }}
                        fontWeight="semibold"
                        _selected={{
                          color: "white",
                          bg: "primary.500",
                        }}
                        rounded="md"
                        as={Button}
                        variant="outline"
                        boxShadow="md"
                        onClick={() => handleFormClientCategory("ogs")}
                      >
                        OGS
                      </Tab>
                    </Tooltip>
                    <Tooltip
                      label="Show School Construction Authority projects"
                      closeOnScroll
                      display={{ base: "none", sm: "flex" }}
                    >
                      <Tab
                        w={{ base: "full", sm: "8em" }}
                        fontWeight="semibold"
                        _selected={{ color: "white", bg: "primary.500" }}
                        rounded="md"
                        as={Button}
                        variant="outline"
                        boxShadow="md"
                        onClick={() => handleFormClientCategory("sca")}
                      >
                        SCA
                      </Tab>
                    </Tooltip>
                  </SimpleGrid>
                </TabList>
              </Tabs>

              <Stack
                direction={{ base: "column", sm: "row" }}
                w="full"
                justifyContent="center"
                alignItems="center"
              >
                <InputGroup
                  w="full"
                  colorScheme="primary"
                  boxShadow="md"
                  rounded="md"
                >
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
                            onClick={handleFormSearchClear}
                            icon={<CloseIcon />}
                          />
                        </Tooltip>
                      </Flex>
                    }
                  />
                  <Input
                    type="search"
                    name="search"
                    spellCheck="false"
                    autoComplete="off"
                    onChange={(e) =>
                      setInputValue({
                        text: e.target.value,
                        type: "input-change",
                      })
                    }
                    value={inputValue.text}
                    colorScheme="primary"
                    placeholder={`Search ${
                      checkClient(data.filter?.clientCategory).clientCategory ||
                      "all"
                    } projects`}
                    w="full"
                    onKeyUp={onEnter}
                    // defaultValue={data.filter?.search}
                  />
                </InputGroup>
              </Stack>
            </VStack>
            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 2, xl: 2 }}
              spacing={4}
              w="full"
            >
              <AnimatePresence>
                {data.projects.map((value: any, index: any) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{
                        type: "tween",
                        duration: 0.2,
                      }}
                    >
                      <Card
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
                        as={Link}
                        to={value.path}
                        prefetch="intent"
                        rel="prefetch"
                        draggable={false}
                        w="full"
                      >
                        <AspectRatio
                          key={index}
                          ratio={{ base: 4 / 3, md: 16 / 9 }}
                        >
                          <Image
                            roundedTopLeft="md"
                            roundedTopRight="md"
                            src={value.thumbnail}
                            alt={`${value.name} project`}
                            boxShadow="xl"
                            draggable={false}
                            userSelect="none"
                            w="full"
                            loading="lazy"
                            fallback={
                              <Skeleton
                                h={{ base: "350px", sm: "450px" }}
                                w="full"
                              />
                            }
                          />
                        </AspectRatio>
                        <CardFooter justifyContent="center" p={2}>
                          <Text textAlign="center" fontSize="xl">
                            <Highlight
                              query={data.filter?.search || ""}
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
                                <Badge textColor="#22543D" bgColor="#C6F6D5">
                                  Completed
                                </Badge>
                              </Tooltip>
                            )}

                            {value.status?.completed === false && (
                              <Tooltip label={value.status?.text} closeOnScroll>
                                <Badge textColor="#744210" bgColor="#FEFCBF">
                                  in progress
                                </Badge>
                              </Tooltip>
                            )}

                            {value.category?.tag && (
                              <Tooltip
                                key={index}
                                label={value.category?.text}
                                closeOnScroll
                              >
                                <Badge textColor="#234E52" bgColor="#B2F5EA">
                                  {value.category.tag}
                                </Badge>
                              </Tooltip>
                            )}

                            {value.client?.tag && (
                              <Tooltip label={value.client?.text} closeOnScroll>
                                <Badge textColor="#2A4365" bgColor="#BEE3F8">
                                  {value.client.tag}
                                </Badge>
                              </Tooltip>
                            )}
                          </VStack>
                        </Box>

                        <Box display={{ base: "none", lg: "flex" }}>
                          <SlideFade
                            in={
                              showButton.index === index
                                ? showButton.flag
                                : false
                            }
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
                              <Button
                                variant="solid"
                                boxShadow="lg"
                                rounded="md"
                                bgColor="gray.50"
                                textColor="black"
                                _hover={{ bgColor: "gray.200" }}
                              >
                                View Project
                              </Button>
                            </Box>
                          </SlideFade>
                        </Box>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </SimpleGrid>
          </VStack>
          {data.projects.length <= 0 && (
            <ScaleFade in={true} delay={0.3}>
              <Box textAlign="center" py={10} px={6}>
                <QuestionIcon boxSize={"50px"} color="primary.500" />
                <Heading as="h2" size="lg" mt={6} mb={2}>
                  No Results
                </Heading>
                <Text color={"gray.500"}>
                  The search terms you provided did not match any of our
                  records. Please try again using different keywords.
                </Text>
              </Box>
            </ScaleFade>
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
