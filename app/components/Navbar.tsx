import { useState, useEffect, useRef, forwardRef } from "react";

import { Outlet, useMatches } from "@remix-run/react";

import {
  Show,
  Spinner,
  Flex,
  Image,
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
} from "@chakra-ui/react";

import { NavLink } from "@remix-run/react";

// import Footer from "app/components/Footer";

import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

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
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        btnRef={btnRef}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        navigationLinks={navigationLinks}
      />
      <NavbarDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        btnRef={btnRef}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        navigationLinks={navigationLinks}
      />
    </>
  );
}

interface NavbarHeaderProps {
  isOpen: any;
  onOpen: any;
  onClose: any;
  btnRef: any;
  colorMode: any;
  toggleColorMode: any;
  navigationLinks: { label: string; url: string }[];
}

function NavbarHeader({
  isOpen,
  onOpen,
  onClose,
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
                draggable="false"
                loading="eager"
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
                draggable="false"
                loading="eager"
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
              <Tab
                key={index}
                as={NavLink}
                to={link.url}
                _focus={{ boxShadow: "none" }}
                draggable={false}
                prefetch="render"
                rel="prefetch"
              >
                {link.label}
              </Tab>
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
          <IconButton aria-label="Open Drawer" ref={btnRef} onClick={onOpen}>
            <HamburgerIcon />
          </IconButton>
        </HStack>
      </Flex>
    </Flex>
  );
}

interface NavbarDrawerProps {
  isOpen: any;
  onOpen: any;
  onClose: any;
  btnRef: any;
  colorMode: any;
  toggleColorMode: any;
  navigationLinks: { label: string; url: string }[];
}

function NavbarDrawer({
  isOpen,
  onOpen,
  onClose,
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
      isOpen={isOpen}
      placement="right"
      size="xs"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader p={2} alignSelf="center">
          <NavLink to={"/"} onClick={onClose} prefetch="render" rel="prefetch">
            <Image
              objectFit="contain"
              h={50}
              w={"auto"}
              src={logo_small}
              alt="Allcon-Logo"
              draggable="false"
              loading="eager"
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
                  onClick={onClose}
                >
                  {link.label}
                </Tab>
              ))}
            </VStack>
          </Tabs>
          {/* </VStack> */}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
