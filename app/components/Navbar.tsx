import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useLayoutEffect,
} from "react";

import { Outlet, useMatches } from "@remix-run/react";

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
} from "@chakra-ui/react";

import { NavLink } from "@remix-run/react";

// import Footer from "app/components/Footer";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useContainerDimensions } from "~/utils/hooks";

// import LogoSideways from "public/logos/Logo-Sideways.svg";
// import LogoPlain from "public/logos/Logo-Plain.svg";

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

  useEffect(() => {
    handleTabsChange(
      location?.pathname.startsWith("/about")
        ? 0
        : location?.pathname.includes("/projects")
        ? 1
        : location?.pathname.includes("/testimonials")
        ? 2
        : location?.pathname.includes("/contacts")
        ? 3
        : null
    );
  }, [location?.pathname]);

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
        <HStack spacing="40px">
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
        </HStack>

        <Tabs
          display={{ base: "none", md: "flex" }}
          colorScheme="primary"
          orientation="horizontal"
          isManual
          align="center"
          isFitted
          index={tabIndex}
          onChange={handleTabsChange}
        >
          <HStack spacing="16px">
            {navigationLinks.map((link, index) => (
              <Box key={index}>
                {!link.subLinks && (
                  <Tab
                    as={NavLink}
                    to={link.url}
                    _focus={{ boxShadow: "none" }}
                    draggable={false}
                    prefetch="render"
                    rel="prefetch"
                  >
                    {link.label}
                  </Tab>
                )}

                {link.subLinks && (
                  <Popover
                    trigger="hover"
                    // closeDelay={200}
                    // openDelay={200}
                    isLazy
                    placement="bottom"
                    lazyBehavior="unmount"
                  >
                    <PopoverTrigger>
                      <Tab
                        as={NavLink}
                        to={link.url}
                        _focus={{ boxShadow: "none" }}
                        draggable={false}
                        prefetch="render"
                        rel="prefetch"
                      >
                        {link.label}
                      </Tab>
                    </PopoverTrigger>

                    <PopoverContent w="8em" boxShadow="lg">
                      <PopoverBody w="full" p={0} m={0}>
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
                              as={NavLink}
                              to={subLink.url}
                              borderRadius="none"
                              fontWeight="normal"
                              prefetch="intent"
                              // rel="prefetch"
                            >
                              {subLink.label}
                            </Button>
                          ))}
                        </ButtonGroup>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                )}
              </Box>
            ))}
            <IconButton
              variant={"ghost"}
              aria-label="Color Scheme"
              onClick={() => {
                toggleColorMode();
              }}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </HStack>
        </Tabs>

        <HStack spacing="10px" display={{ md: "none" }}>
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

  const handleTabsChange = (index: any) => {
    setTabIndex(index);
  };

  useEffect(() => {
    handleTabsChange(
      location?.pathname.startsWith("/about")
        ? 0
        : location?.pathname.includes("/projects")
        ? 1
        : location?.pathname.includes("/testimonials")
        ? 2
        : location?.pathname.includes("/contacts")
        ? 3
        : null
    );
  }, [location?.pathname]);

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
          <Tabs
            colorScheme="primary"
            isManual
            align="center"
            isFitted
            index={tabIndex}
            onChange={handleTabsChange}
            orientation="vertical"
          >
            <VStack spacing="12px" w={"100%"}>
              {navigationLinks.map((link, index) => (
                <Box key={index} w="full">
                  {!link.subLinks && (
                    <Tab
                      key={index}
                      as={NavLink}
                      to={link.url}
                      _focus={{ boxShadow: "none" }}
                      draggable={false}
                      prefetch="render"
                      rel="prefetch"
                      fontSize="md"
                      w={"100%"}
                      onClick={onDrawerClose}
                    >
                      {link.label}
                    </Tab>
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
          </Tabs>
          {/* </VStack> */}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

function SubLinks({ link, index, tabIndex, onDrawerClose }: any) {
  const [show, setShow] = useState(tabIndex === index ? true : false);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Flex>
        <Tab
          _focus={{ boxShadow: "none" }}
          draggable={false}
          key={index}
          fontSize="md"
          w={"100%"}
          as={NavLink}
          to={link.url}
          onClick={onDrawerClose}
          prefetch="render"
          rel="prefetch"
          mr="-40px"
        >
          {link.label}
        </Tab>

        <IconButton
          aria-label="Sublinks"
          variant="solid"
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
              fontSize="sm"
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
