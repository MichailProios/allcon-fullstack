import { useState, useEffect, useRef } from "react";

import { NavLink, Link, useFetcher, useLoaderData } from "@remix-run/react";

import {
  Flex,
  HStack,
  Button,
  IconButton,
  useColorModeValue,
  useColorMode,
  Drawer,
  DrawerBody,
  VStack,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerHeader,
  DrawerCloseButton,
  useBreakpoint,
  Box,
  Popover,
  PopoverContent,
  PopoverBody,
  ButtonGroup,
  useOutsideClick,
  Text,
  Collapse,
  Divider,
  Image,
  Skeleton,
  Icon,
  Avatar,
  useToast,
  PopoverAnchor,
  DrawerFooter,
} from "@chakra-ui/react";

import { RiAccountCircleFill } from "react-icons/ri";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";

import { IoLogOutOutline, IoPersonCircleOutline } from "react-icons/io5";

const logo_full_dark =
  "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/e81be543-83e6-4173-3254-77df4d1ff900/thumbnail";

const logo_full_light =
  "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/aabe8ae8-4716-4d41-f8ab-92df61f51900/thumbnail";

const logo_small =
  "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/fa4b2f8e-d107-45eb-e36d-adbb14f13a00/thumbnail";

interface NavbarProps {
  navigationLinks: { label: string; url: string }[];
  context: any;
}

export default function Navbar({ navigationLinks, context }: NavbarProps) {
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ref = useRef<any>();

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  const toast = useToast();
  const fetcher = useFetcher();

  function handleLogout() {
    fetcher.submit(null, { method: "delete" });

    toast({
      title: "Signed Out Successfully",
      variant: "solid",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  const loaderData = useLoaderData();

  return (
    <Flex
      h={16}
      alignItems={"center"}
      justifyContent={"center"}
      px={{ base: 4, sm: 6, lg: 8 }}
      bg={useColorModeValue("gray.50", "gray.700")}
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
        <HStack spacing="20px">
          <NavLink to={"/"} draggable={false}>
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

          <HStack spacing={"8px"} display={{ base: "none", xlg: "flex" }}>
            {navigationLinks.map((link, index) => (
              <Box key={index}>
                {!link.subLinks && (
                  <NavLink key={index} to={link.url} draggable="false">
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

        <HStack spacing={"8px"} display={{ base: "none", xlg: "flex" }}>
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
          <Box>
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
                    loaderData?.profile ? (
                      <Avatar
                        size="xs"
                        name={loaderData?.profile.full_name}
                        src={loaderData?.profile.avatar_url}
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
                  {loaderData?.profile
                    ? loaderData?.profile.full_name
                    : "Join our Community"}
                </Button>
              </PopoverAnchor>
              {loaderData?.profile ? (
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
                    <ButtonGroup
                      p={2}
                      size="sm"
                      w="full"
                      justifyContent="center"
                    >
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
                  </PopoverBody>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        </HStack>

        <HStack spacing="8px" display={{ xlg: "none" }}>
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ref = useRef<any>();

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  const toast = useToast();

  const fetcher = useFetcher();

  function handleLogout() {
    fetcher.submit(null, { method: "delete" });

    toast({
      title: "Signed Out Successfully",
      variant: "solid",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  const loaderData = useLoaderData();

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
          <NavLink to={"/"} onClick={onDrawerClose}>
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
          <VStack spacing="12px" w={"full"}>
            {navigationLinks.map((link, index) => (
              <Box key={index} w="full">
                {!link.subLinks && (
                  <NavLink key={index} to={link.url} draggable="false">
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
                    onDrawerClose={onDrawerClose}
                  />
                )}
              </Box>
            ))}
          </VStack>
        </DrawerBody>
        <DrawerFooter w="full" justifyContent="center" alignItems="center">
          <Box>
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
                    loaderData?.profile ? (
                      <Avatar
                        size="xs"
                        name={loaderData?.profile.full_name}
                        src={loaderData?.profile.avatar_url}
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
                  {loaderData?.profile
                    ? loaderData?.profile.full_name
                    : "Join our Community"}
                </Button>
              </PopoverAnchor>
              {loaderData?.profile ? (
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
                        onClick={() => {
                          onClose();
                          onDrawerClose();
                        }}
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
                          onDrawerClose();
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
                    <ButtonGroup
                      p={2}
                      size="md"
                      w="full"
                      justifyContent="center"
                      orientation="vertical"
                    >
                      <Button
                        fontSize="sm"
                        w="full"
                        as={Link}
                        to="/login"
                        onClick={() => {
                          onClose();
                          onDrawerClose();
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        fontSize="sm"
                        w="full"
                        colorScheme="primary"
                        as={Link}
                        to="/register"
                        onClick={() => {
                          onClose();
                          onDrawerClose();
                        }}
                      >
                        Sign Up
                      </Button>
                    </ButtonGroup>
                  </PopoverBody>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        </DrawerFooter>
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
        <NavLink key={index} to={link.url} draggable={false}>
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

function SubLinks({ link, index, onDrawerClose }: any) {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Flex w="full">
        <NavLink
          key={index}
          to={link.url}
          draggable="false"
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
