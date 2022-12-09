import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  Button,
  Center,
  Img,
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
  Grid,
  GridItem,
  useBreakpoint,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useDisclosure,
  useOutsideClick,
  filter,
  Image,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

import { animateScroll as scroll } from "react-scroll";

import { AnimatePresence, motion } from "framer-motion";

import RenderIfVisible from "react-render-if-visible";

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
  useFetcher,
  useMatches,
  useSearchParams,
} from "@remix-run/react";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  QuestionIcon,
  Search2Icon,
} from "@chakra-ui/icons";
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
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e7f76ad3-ea23-4fde-e911-178b09bb5400/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e7f76ad3-ea23-4fde-e911-178b09bb5400/meta",
  "og:url": "https://allconcontracting.com/projects",
});

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category") || null;

    const session = await cookie.getSession(request.headers.get("Cookie"));
    const filter = session.get("filter") || null;

    console.log(category);

    if (filter?.search && !category) {
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
    } else if (category && !filter?.search) {
      return json({
        filter: filter,
        projects: Array.from(projects.values()).filter(
          (value) =>
            value.client?.tag.toLowerCase().includes(category.toLowerCase()) ||
            value.category?.tag.toLowerCase().includes(category.toLowerCase())
        ),
      });
    } else if (filter?.search && category) {
      return json({
        filter: filter,
        projects: Array.from(projects.values()).filter(
          (value) =>
            (value.name.toLowerCase().includes(filter?.search.toLowerCase()) ||
              value.client?.tag
                .toLowerCase()
                .includes(filter?.search.toLowerCase())) &&
            (value.client?.tag.toLowerCase().includes(category.toLowerCase()) ||
              value.category?.tag
                .toLowerCase()
                .includes(category.toLowerCase()))
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

    switch (type) {
      case "search": {
        const session = await cookie.getSession(request.headers.get("Cookie"));
        session.flash("filter", {
          search: search,
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

  const [searchParams, setSearchParams] = useSearchParams();
  const clientCategory: any = searchParams.get("category") || "";
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

  // const [searchParams] = useSearchParams();
  // const category = searchParams.getAll("category");
  // console.log(category);

  // useEffect(() => {
  //   if (category) {
  //     scroll.scrollToTop({
  //       duration: 400,
  //       delay: 300,
  //       smooth: "easeInOutQuart",
  //     });
  //   }
  // }, []);

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

  const fetcher = useFetcher();

  function handleFormSearch(input: string) {
    if (!firstRender) {
      if (!toastIdRef.current) {
        toastIdRef.current = toast({
          title: "Searching projects",
          status: "loading",
          duration: null,
          isClosable: false,
          variant: "solid",
        });
      } else if (toastIdRef.current) {
        toast.update(toastIdRef.current, {
          title: "Searching projects",
          status: "loading",
          duration: null,
          isClosable: false,
          variant: "solid",
        });
      }
      const formData = new FormData();
      formData.set("search", input);
      formData.set("type", "search");
      fetcher.submit(formData, { method: "post" });
    }
  }

  function handleClientCategory(category: string) {
    if (!toastIdRef.current) {
      toastIdRef.current = toast({
        title: `Showing ${category || "all"} projects`,
        status: "loading",
        duration: null,
        isClosable: false,
      });
    } else if (toastIdRef.current) {
      toast.update(toastIdRef.current, {
        title: `Showing ${category || "all"} projects`,
        status: "loading",
        duration: null,
        isClosable: false,
      });
    }

    if (category) {
      setSearchParams({ category: category });
    } else {
      setSearchParams({});
    }

    // handleFormSearchClear();
  }

  function handleFormSearchClear() {
    setInputValue({ text: "", type: "clear" });

    const formData = new FormData();
    formData.set("type", "clearSearch");
    formData.set("search", "");
    fetcher.submit(formData, { method: "delete" });
  }

  function handleFormAllClear() {
    setInputValue({ text: "", type: "clear" });
    const formData = new FormData();
    formData.set("type", "clearAll");
    fetcher.submit(formData, {
      method: "delete",
    });
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

      case "other":
        return { index: 6, clientCategory: clientCategory };

      default:
        return { index: 0, clientCategory: "" };
    }
  }

  useEffect(() => {
    handleTabsChange(checkClient(clientCategory).index);
  }, [clientCategory]);

  useEffect(() => {
    if (data.filter) {
      handleFormAllClear();
    }

    return () => {
      handleFormAllClear();
    };
  }, []);

  useEffect(() => {
    handleFormSearchClear();
  }, [clientCategory]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuRef = useRef<any>();

  useOutsideClick({
    ref: menuRef,
    handler: () => onClose(),
  });

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container
        maxW={"1600px"}
        px={{ base: 3, md: 6 }}
        py={14}
        // as={Form}
        // method="post"
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
                display={{ base: "none", smd: "flex" }}
              >
                <TabList
                  justifyContent="center"
                  w="full"
                  display="flex"
                  gap={{ base: 1, lg: 2 }}
                >
                  <Tooltip label="Show all projects" closeOnScroll>
                    <Tab
                      w={{ base: "auto", lg: "8em" }}
                      fontWeight="semibold"
                      _selected={{
                        color: "white",
                        bg: "primary.500",
                      }}
                      rounded="md"
                      as={Button}
                      variant="outline"
                      boxShadow="md"
                      onClick={() => handleClientCategory("")}
                    >
                      All Projects
                    </Tab>
                  </Tooltip>

                  <Tooltip label="Show interior projects" closeOnScroll>
                    <Tab
                      w={{ md: "auto", lg: "8em" }}
                      fontWeight="semibold"
                      _selected={{ color: "white", bg: "primary.500" }}
                      rounded="md"
                      as={Button}
                      variant="outline"
                      boxShadow="md"
                      onClick={() => handleClientCategory("interior")}
                    >
                      Interior
                    </Tab>
                  </Tooltip>

                  <Tooltip label="Show exterior projects" closeOnScroll>
                    <Tab
                      w={{ md: "auto", lg: "8em" }}
                      fontWeight="semibold"
                      _selected={{ color: "white", bg: "primary.500" }}
                      rounded="md"
                      as={Button}
                      variant="outline"
                      boxShadow="md"
                      onClick={() => handleClientCategory("exterior")}
                    >
                      Exterior
                    </Tab>
                  </Tooltip>

                  <Tooltip
                    label="Show State University of New York projects"
                    closeOnScroll
                  >
                    <Tab
                      w={{ md: "auto", lg: "8em" }}
                      fontWeight="semibold"
                      _selected={{ color: "white", bg: "primary.500" }}
                      rounded="md"
                      as={Button}
                      variant="outline"
                      boxShadow="md"
                      onClick={() => handleClientCategory("suny")}
                    >
                      SUNY
                    </Tab>
                  </Tooltip>

                  <Tooltip
                    label="Show NYS Office of General Services projects"
                    closeOnScroll
                  >
                    <Tab
                      w={{ md: "auto", lg: "8em" }}
                      fontWeight="semibold"
                      _selected={{
                        color: "white",
                        bg: "primary.500",
                      }}
                      rounded="md"
                      as={Button}
                      variant="outline"
                      boxShadow="md"
                      onClick={() => handleClientCategory("ogs")}
                    >
                      OGS
                    </Tab>
                  </Tooltip>

                  <Tooltip
                    label="Show School Construction Authority projects"
                    closeOnScroll
                  >
                    <Tab
                      w={{ md: "auto", lg: "8em" }}
                      fontWeight="semibold"
                      _selected={{ color: "white", bg: "primary.500" }}
                      rounded="md"
                      as={Button}
                      variant="outline"
                      boxShadow="md"
                      onClick={() => handleClientCategory("sca")}
                    >
                      SCA
                    </Tab>
                  </Tooltip>

                  <Tooltip
                    label="Show other miscellaneous projects"
                    closeOnScroll
                  >
                    <Tab
                      w={{ md: "auto", lg: "8em" }}
                      fontWeight="semibold"
                      _selected={{ color: "white", bg: "primary.500" }}
                      rounded="md"
                      as={Button}
                      variant="outline"
                      boxShadow="md"
                      onClick={() => handleClientCategory("other")}
                    >
                      Other
                    </Tab>
                  </Tooltip>
                </TabList>
              </Tabs>

              <Box
                display={{ base: "flex", smd: "none" }}
                w="full"
                ref={menuRef}
              >
                <Menu
                  autoSelect={false}
                  matchWidth
                  placement="bottom"
                  isOpen={isOpen}
                >
                  <MenuButton
                    as={Button}
                    w="full"
                    fontWeight="semibold"
                    rounded="md"
                    variant={clientCategory ? "solid" : "outline"}
                    boxShadow="md"
                    textAlign="start"
                    rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={isOpen ? onClose : onOpen}
                    textColor={clientCategory && "white"}
                    bgColor={clientCategory && "primary.500"}
                    _hover={
                      clientCategory && {
                        bgColor: "primary.600",
                        textColor: "white",
                      }
                    }
                    _active={
                      clientCategory && {
                        bgColor: "primary.700",
                        textColor: "white",
                      }
                    }
                  >
                    {clientCategory
                      ? `${
                          clientCategory.charAt(0).toUpperCase() +
                          clientCategory.slice(1)
                        } Projects`
                      : "Filter Projects"}
                  </MenuButton>

                  <MenuList p={1} m={0} boxShadow="2xl" zIndex={500} minW={0}>
                    <Tabs
                      variant="unstyled"
                      colorScheme="gray"
                      orientation="vertical"
                      w="full"
                      index={tabIndex}
                      onChange={handleTabsChange}
                    >
                      <TabList w="full" gap={1}>
                        <Tab
                          w="full"
                          fontWeight="semibold"
                          _selected={{
                            color: "white",
                            bg: "primary.500",
                          }}
                          rounded="md"
                          as={Button}
                          variant="outline"
                          boxShadow="md"
                          onClick={() => {
                            handleClientCategory("");
                            onClose();
                          }}
                        >
                          All Projects
                        </Tab>
                        <Tab
                          w="full"
                          fontWeight="semibold"
                          _selected={{
                            color: "white",
                            bg: "primary.500",
                          }}
                          rounded="md"
                          as={Button}
                          variant="outline"
                          boxShadow="md"
                          onClick={() => {
                            handleClientCategory("interior");
                            onClose();
                          }}
                        >
                          Interior
                        </Tab>
                        <Tab
                          w="full"
                          fontWeight="semibold"
                          _selected={{
                            color: "white",
                            bg: "primary.500",
                          }}
                          rounded="md"
                          as={Button}
                          variant="outline"
                          boxShadow="md"
                          onClick={() => {
                            handleClientCategory("exterior");
                            onClose();
                          }}
                        >
                          Exterior
                        </Tab>
                        <Tab
                          w="full"
                          fontWeight="semibold"
                          _selected={{
                            color: "white",
                            bg: "primary.500",
                          }}
                          rounded="md"
                          as={Button}
                          variant="outline"
                          boxShadow="md"
                          onClick={() => {
                            handleClientCategory("suny");
                            onClose();
                          }}
                        >
                          SUNY
                        </Tab>
                        <Tab
                          w="full"
                          fontWeight="semibold"
                          _selected={{
                            color: "white",
                            bg: "primary.500",
                          }}
                          rounded="md"
                          as={Button}
                          variant="outline"
                          boxShadow="md"
                          onClick={() => {
                            handleClientCategory("ogs");
                            onClose();
                          }}
                        >
                          OGS
                        </Tab>
                        <Tab
                          w="full"
                          fontWeight="semibold"
                          _selected={{
                            color: "white",
                            bg: "primary.500",
                          }}
                          rounded="md"
                          as={Button}
                          variant="outline"
                          boxShadow="md"
                          onClick={() => {
                            handleClientCategory("sca");
                            onClose();
                          }}
                        >
                          SCA
                        </Tab>
                        <Tab
                          w="full"
                          fontWeight="semibold"
                          _selected={{
                            color: "white",
                            bg: "primary.500",
                          }}
                          rounded="md"
                          as={Button}
                          variant="outline"
                          boxShadow="md"
                          onClick={() => {
                            handleClientCategory("other");
                            onClose();
                          }}
                        >
                          Other
                        </Tab>
                      </TabList>
                    </Tabs>
                  </MenuList>
                </Menu>
              </Box>

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
                    ref={inputRef}
                    onChange={(e) =>
                      setInputValue({
                        text: e.target.value,
                        type: "input-change",
                      })
                    }
                    value={inputValue.text}
                    colorScheme="primary"
                    placeholder={`Search ${
                      checkClient(clientCategory).clientCategory || "all"
                    } projects`}
                    w="full"
                    onKeyUp={onEnter}
                    // defaultValue={data.filter?.search}
                  />
                </InputGroup>
              </Stack>
            </VStack>
            <SimpleGrid
              columns={{ base: 1, smd: 1, md: 1, xmd: 2, lg: 2, xl: 2 }}
              spacing={4}
              w="full"
            >
              <AnimatePresence>
                {data.projects.map((value: any, index: any) => (
                  <RenderIfVisible key={index} defaultHeight={500}>
                    <motion.div
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
                              src={value.thumbnail + "/thumbnail"}
                              alt={`${value.name} project`}
                              boxShadow="xl"
                              draggable={false}
                              userSelect="none"
                              w="full"
                              loading="lazy"
                              fallback={<Skeleton w="full" h="full" />}
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
                                <Tooltip
                                  label={value.status?.text}
                                  closeOnScroll
                                >
                                  <Badge textColor="#22543D" bgColor="#C6F6D5">
                                    Completed
                                  </Badge>
                                </Tooltip>
                              )}

                              {value.status?.completed === false && (
                                <Tooltip
                                  label={value.status?.text}
                                  closeOnScroll
                                >
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
                                <Tooltip
                                  label={value.client?.text}
                                  closeOnScroll
                                >
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
                  </RenderIfVisible>
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
    </SlideFade>
  );
}
