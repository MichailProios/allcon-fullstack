import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useLayoutEffect,
} from "react";

import {
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
  useMatches,
} from "@remix-run/react";

import {
  Show,
  Spinner,
  Flex,
  Img,
  HStack,
  Button,
  IconButton,
  useColorModeValue,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerFooter,
  VStack,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerHeader,
  DrawerCloseButton,
  useBreakpoint,
  Box,
  Tabs,
  TabList,
  Tab,
  SlideFade,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  ButtonGroup,
  useOutsideClick,
  Text,
  TagLabel,
  TagRightIcon,
  useTab,
  useMultiStyleConfig,
  Collapse,
  Divider,
  Image,
  Skeleton,
  Icon,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { createServerClient } from "~/utils/supabase.server";
import type { LoaderFunction } from "@remix-run/node";
import { RiAccountCircleFill } from "react-icons/ri";
import { NavLink } from "@remix-run/react";

import { MdAccountCircle } from "react-icons/md";
import { redirect, json } from "@remix-run/node";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useContainerDimensions } from "~/utils/hooks";
import {
  IoLogOutOutline,
  IoPersonAddSharp,
  IoPersonCircleOutline,
} from "react-icons/io5";

const logo_full_dark =
  "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e81be543-83e6-4173-3254-77df4d1ff900/thumbnail";

const logo_full_light =
  "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/aabe8ae8-4716-4d41-f8ab-92df61f51900/thumbnail";

const logo_small =
  "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/fa4b2f8e-d107-45eb-e36d-adbb14f13a00/thumbnail";

interface NavbarProps {
  navigationLinks: { label: string; url: string }[];
}

export default function Navbar({ navigationLinks }: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const breakpoint = useBreakpoint({ ssr: true });

  useEffect(() => {
    if (breakpoint === "lg") {
      onClose();
    }
  }, [breakpoint, onClose]);

  return (
    <>
      <NavbarHeader
        isDrawerOpen={isOpen}
        onDrawerOpen={onOpen}
        onDrawerClose={onClose}
        btnRef={btnRef}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        navigationLinks={navigationLinks}
      />
      <NavbarDrawer
        isDrawerOpen={isOpen}
        onDrawerOpen={onOpen}
        onDrawerClose={onClose}
        btnRef={btnRef}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        navigationLinks={navigationLinks}
      />
    </>
  );
}

interface SubLinksProps {
  label: string;
  url: string;
}

interface NavbarHeaderProps {
  isDrawerOpen: any;
  onDrawerOpen: any;
  onDrawerClose: any;
  btnRef: any;
  colorMode: any;
  toggleColorMode: any;
  navigationLinks: {
    label: string;
    url: string;
    subLinks?: Array<SubLinksProps>;
  }[];
}

function NavbarHeader({
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
  btnRef,
  colorMode,
  toggleColorMode,
  navigationLinks,
}: NavbarHeaderProps) {
  const location = useMatches()[1];
  const [tabIndex, setTabIndex] = useState();

  const handleTabsChange = (index: any) => {
    setTabIndex(index);
  };

  // useEffect(() => {
  //   handleTabsChange(
  //     location?.pathname.startsWith("/about")
  //       ? 0
  //       : location?.pathname.includes("/projects")
  //       ? 1
  //       : location?.pathname.includes("/resources") ||
  //         location?.pathname.includes("/testimonials") ||
  //         location?.pathname.includes("/media") ||
  //         location?.pathname.includes("/awards")
  //       ? 2
  //       : location?.pathname.includes("/contacts")
  //       ? 3
  //       : null
  //   );
  // }, [location?.pathname]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const ref = useRef<any>();

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  const loaderData = useLoaderData();

  const fetcher = useFetcher();
  const toast = useToast();

  function handleLogout() {
    fetcher.submit(null, { method: "delete" });

    toast({
      title: "Signed Out Successfully",
      variant: "solid",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
      containerStyle: {
        mt: "80px",
        mr: "10px",
      },
    });
  }

  return (
    <Flex
      h={16}
      alignItems={"center"}
      justifyContent={"center"}
      px={{ base: 4, sm: 6, lg: 8 }}
      bg={useColorModeValue("gray.50", "gray.900")}
      position="sticky"
      top={0}
      zIndex={800}
      width={"100%"}
      as="header"
      boxShadow={"md"}
      opacity={0.95}
      // onMouseLeave={projectsPopper.onClose}
    >
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"100%"}
        maxW={"1600px"}
      >
        <HStack spacing="20px">
          <NavLink to={"/"} prefetch="render" rel="prefetch" draggable={false}>
            <Box
              sx={{
                display: "flex",
                "@media screen and (max-width: 360px)": {
                  display: "none",
                },
              }}
            >
              <Image
                objectFit="contain"
                h={"50px"}
                w={"auto"}
                minWidth="230px"
                src={colorMode === "light" ? logo_full_dark : logo_full_light}
                alt="Allcon-Logo"
                loading="eager"
                draggable={false}
                fallback={<Skeleton w="full" h="full" />}
              />
            </Box>
            <Box
              sx={{
                display: "none",
                "@media screen and (max-width: 360px)": {
                  display: "flex",
                },
              }}
            >
              <Image
                objectFit="contain"
                h={"50px"}
                w={"auto"}
                src={logo_small}
                alt="Allcon-Logo"
                draggable={false}
                loading="eager"
                fallback={<Skeleton w="full" h="full" />}
              />
            </Box>
          </NavLink>

          <HStack spacing={"8px"} display={{ base: "none", lg: "flex" }}>
            {navigationLinks.map((link, index) => (
              <Box key={index}>
                {!link.subLinks && (
                  <NavLink
                    key={index}
                    to={link.url}
                    draggable="false"
                    prefetch="render"
                  >
                    {({ isActive }) => (
                      <Button
                        onClick={onClose}
                        variant="ghost"
                        isActive={isActive}
                        fontWeight="semibold"
                      >
                        {link.label}
                      </Button>
                    )}
                  </NavLink>
                )}

                {link.subLinks && <NavbarPopover link={link} index={index} />}
              </Box>
            ))}
          </HStack>
        </HStack>

        <HStack spacing={"8px"} display={{ base: "none", lg: "flex" }}>
          <IconButton
            variant={"ghost"}
            aria-label="Color Scheme"
            onClick={() => {
              toggleColorMode();
            }}
            color={useColorModeValue("gray.600", "gray.300")}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </IconButton>
          <Popover
            closeDelay={200}
            openDelay={0}
            isLazy
            placement="bottom"
            lazyBehavior="unmount"
            isOpen={isOpen}
            returnFocusOnClose={false}
            autoFocus={false}
            orientation="vertical"
            matchWidth
          >
            <PopoverAnchor>
              <Button
                isActive={isOpen}
                pr={2}
                pl={2}
                variant="ghost"
                onClick={onOpen}
                leftIcon={
                  loaderData?.session ? (
                    <Avatar
                      size="xs"
                      name={
                        loaderData?.session &&
                        `${loaderData?.session?.user.user_metadata.firstName} ${loaderData?.session?.user.user_metadata.lastName}`
                      }
                      src=""
                    />
                  ) : (
                    <Icon
                      color="gray.600"
                      _dark={{ color: "gray.300" }}
                      w={6}
                      h={6}
                      as={RiAccountCircleFill}
                    />
                  )
                }
              >
                {loaderData?.session
                  ? `${loaderData?.session?.user.user_metadata.firstName} ${loaderData?.session?.user.user_metadata.lastName}`
                  : "Join our Community"}
              </Button>
            </PopoverAnchor>
            {loaderData?.session ? (
              <PopoverContent w="full" boxShadow="lg" ref={ref}>
                <PopoverBody w="full" p={0}>
                  <ButtonGroup
                    size="md"
                    w="full"
                    variant="ghost"
                    orientation="vertical"
                    spacing={0}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button
                      fontSize="sm"
                      w="full"
                      onClick={onClose}
                      borderRadius="none"
                      as={Link}
                      to="/profile"
                      rightIcon={
                        <Icon w={5} h={5} as={IoPersonCircleOutline} />
                      }
                    >
                      Profile
                    </Button>

                    <Button
                      fontSize="sm"
                      w="full"
                      onClick={() => {
                        onClose();
                        handleLogout();
                      }}
                      borderRadius="none"
                      rightIcon={<Icon w={5} h={5} as={IoLogOutOutline} />}
                    >
                      Sign Out
                    </Button>
                  </ButtonGroup>
                </PopoverBody>
              </PopoverContent>
            ) : (
              <PopoverContent w="full" boxShadow="lg" ref={ref}>
                <PopoverBody w="full" p={0}>
                  <Text p={2} textAlign="center">
                    Become a Member
                  </Text>
                  <Divider w="full" />
                  <ButtonGroup p={2} size="sm" w="full" justifyContent="center">
                    <Button
                      fontSize="sm"
                      w="full"
                      as={Link}
                      to="/login"
                      onClick={onClose}
                    >
                      Sign In
                    </Button>
                    <Button
                      fontSize="sm"
                      w="full"
                      colorScheme="primary"
                      as={Link}
                      to="/register"
                      onClick={onClose}
                    >
                      Sign Up
                    </Button>
                  </ButtonGroup>
                </PopoverBody>{" "}
              </PopoverContent>
            )}
          </Popover>
        </HStack>

        <HStack spacing="8px" display={{ lg: "none" }}>
          <IconButton
            variant={"ghost"}
            aria-label="Color Scheme"
            onClick={() => {
              toggleColorMode();
            }}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </IconButton>
          <IconButton
            aria-label="Open Drawer"
            ref={btnRef}
            onClick={onDrawerOpen}
          >
            <HamburgerIcon />
          </IconButton>
        </HStack>
      </Flex>
    </Flex>
  );
}

interface NavbarDrawerProps {
  isDrawerOpen: any;
  onDrawerOpen: any;
  onDrawerClose: any;
  btnRef: any;
  colorMode: any;
  toggleColorMode: any;
  navigationLinks: {
    label: string;
    url: string;
    subLinks?: Array<SubLinksProps>;
  }[];
}

function NavbarDrawer({
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
  btnRef,
  colorMode,
  toggleColorMode,
  navigationLinks,
}: NavbarDrawerProps) {
  const location = useMatches()[1];
  const [tabIndex, setTabIndex] = useState();

  // const handleTabsChange = (index: any) => {
  //   setTabIndex(index);
  // };

  // useEffect(() => {
  //   handleTabsChange(
  //     location?.pathname.startsWith("/about")
  //       ? 0
  //       : location?.pathname.includes("/projects")
  //       ? 1
  //       : location?.pathname.includes("/blog")
  //       ? 2
  //       : location?.pathname.includes("/resources") ||
  //         location?.pathname.includes("/testimonials") ||
  //         location?.pathname.includes("/media") ||
  //         location?.pathname.includes("/awards")
  //       ? 3
  //       : location?.pathname.includes("/contacts")
  //       ? 4
  //       : null
  //   );
  // }, [location?.pathname]);

  return (
    <Drawer
      isOpen={isDrawerOpen}
      placement="right"
      size="xs"
      onClose={onDrawerClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader p={2} alignSelf="center">
          <NavLink
            to={"/"}
            onClick={onDrawerClose}
            prefetch="render"
            rel="prefetch"
          >
            <Image
              objectFit="contain"
              h={50}
              w={"auto"}
              src={logo_small}
              alt="Allcon-Logo"
              draggable={false}
              loading="eager"
              fallback={<Skeleton w="full" h="full" />}
            />
          </NavLink>
        </DrawerHeader>
        <DrawerBody>
          {/* <Tabs
            colorScheme="primary"
            isManual
            align="center"
            isFitted
            index={tabIndex}
            // onChange={handleTabsChange}
            orientation="vertical"
          > */}
          <VStack spacing="12px" w={"full"}>
            {navigationLinks.map((link, index) => (
              <Box key={index} w="full">
                {!link.subLinks && (
                  // <Tab
                  //   key={index}
                  //   as={NavLink}
                  //   to={link.url}
                  //   _focus={{ boxShadow: "none" }}
                  //   draggable={false}
                  //   prefetch="render"
                  //   rel="prefetch"
                  //   fontSize="md"
                  //   w={"100%"}
                  // >
                  //   {link.label}
                  // </Tab>

                  <NavLink
                    key={index}
                    to={link.url}
                    draggable="false"
                    prefetch="render"
                  >
                    {({ isActive }) => (
                      <Button
                        onClick={onDrawerClose}
                        variant="ghost"
                        isActive={isActive}
                        w={"100%"}
                      >
                        {link.label}
                      </Button>
                    )}
                  </NavLink>
                )}

                {link.subLinks && (
                  <SubLinks
                    link={link}
                    index={index}
                    tabIndex={tabIndex}
                    onDrawerClose={onDrawerClose}
                  />
                )}
              </Box>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function NavbarPopover({ link, index }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let timeout: any = null;

  const timer = () => {
    timeout = setTimeout(() => {
      onClose();
    }, 100);
  };

  function closePopover() {
    clearTimeout(timeout);
    timer();
  }

  function openPopover() {
    clearTimeout(timeout);
    onOpen();
  }

  return (
    <Popover
      closeDelay={200}
      openDelay={0}
      isLazy
      placement="bottom"
      lazyBehavior="unmount"
      isOpen={isOpen}
      returnFocusOnClose={false}
      autoFocus={false}
      gutter={22}
      orientation="vertical"
    >
      <PopoverAnchor>
        <NavLink key={index} to={link.url} draggable="false" prefetch="render">
          {({ isActive }) => (
            <Button
              onClick={onClose}
              onMouseEnter={openPopover}
              onMouseLeave={closePopover}
              variant="ghost"
              isActive={isActive}
              fontWeight="semibold"
              rightIcon={<ChevronDownIcon />}
            >
              {link.label}
            </Button>
          )}
        </NavLink>
      </PopoverAnchor>
      <PopoverContent
        w="8.5em"
        boxShadow="lg"
        onMouseEnter={openPopover}
        onMouseLeave={closePopover}
      >
        <PopoverBody w="full" p={0}>
          <ButtonGroup
            orientation="vertical"
            variant="ghost"
            size="md"
            spacing="2px"
            w="full"
          >
            {link.subLinks.map((subLink: any, index: any) => (
              <Button
                key={index}
                as={Link}
                to={subLink.url}
                borderRadius="none"
                fontWeight="normal"
                onClick={onClose}
                draggable={false}
              >
                {subLink.label}
              </Button>
            ))}
          </ButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

function SubLinks({ link, index, tabIndex, onDrawerClose }: any) {
  const [show, setShow] = useState(tabIndex === index ? true : false);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Flex w="full">
        <NavLink
          key={index}
          to={link.url}
          draggable="false"
          prefetch="render"
          style={{ width: "100%", marginRight: "-40px" }}
        >
          {({ isActive }) => (
            <Button
              onClick={onDrawerClose}
              variant="ghost"
              isActive={isActive}
              w={"100%"}
            >
              {link.label}
            </Button>
          )}
        </NavLink>

        <IconButton
          aria-label="Sublinks"
          variant="ghost"
          icon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={handleToggle}
        />
      </Flex>

      <Collapse in={show} unmountOnExit>
        <ButtonGroup
          orientation="vertical"
          variant="ghost"
          size="md"
          spacing="2px"
          w="full"
          mt={2}
          mb={2}
        >
          {/* <Divider /> */}
          {link.subLinks.map((subLink: any, index: any) => (
            <Button
              w="full"
              key={index}
              as={NavLink}
              to={subLink.url}
              borderRadius="none"
              fontWeight="normal"
              prefetch="intent"
              // fontSize="md"
              onClick={onDrawerClose}
            >
              {subLink.label}
            </Button>
          ))}
        </ButtonGroup>
      </Collapse>
    </>
  );
}
