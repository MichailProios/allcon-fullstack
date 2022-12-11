import { useEffect, useState, useRef } from "react";

import { motion, useAnimationControls } from "framer-motion";

import type { ReactNode } from "react";

import {
  Fade,
  Divider,
  IconButton,
  Box,
  useDisclosure,
  Show,
  Tooltip,
  Center,
  Skeleton,
  Spinner,
  Progress,
  VStack,
} from "@chakra-ui/react";
import Navbar from "app/components/Navbar";
import { useWindowDimensions } from "app/utils/hooks";
import { animateScroll as scroll } from "react-scroll";
import { useScrollButtonVisibility } from "app/utils/hooks";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { useMatches, useTransition } from "@remix-run/react";
import Footer from "~/components/Footer";

import { useLoading } from "app/utils/hooks";

interface LayoutProps {
  children: ReactNode;
}

const navigationLinks = [
  { label: "About", url: "about" },
  {
    label: "Projects",
    url: "projects",
    subLinks: [
      { label: "All Projects", url: "/projects" },
      { label: "Interior", url: "/projects?category=interior" },
      { label: "Exterior", url: "/projects?category=exterior" },
      { label: "SUNY", url: "/projects?category=suny" },
      { label: "OGS", url: "/projects?category=ogs" },
      { label: "SCA", url: "/projects?category=sca" },
      { label: "Other", url: "/projects?category=other" },
    ],
  },

  {
    label: "Resources",
    url: "resources",
    subLinks: [
      { label: "Blog", url: "/blog" },
      { label: "Awards", url: "/awards" },
      { label: "Testimonials", url: "/testimonials" },
    ],
  },
  { label: "Contacts", url: "contacts" },
];

export default function Layout({ children }: LayoutProps) {
  const { height } = useWindowDimensions();
  const showButton = useScrollButtonVisibility();
  const transition = useTransition();

  const handleScrollToTop = () => {
    scroll.scrollToTop({
      duration: 400,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const routeLoading = useLoading();

  useEffect(() => {
    if (transition.state === "loading" && transition.type === "normalLoad") {
      routeLoading.startLoading();
    }

    if (transition.state === "idle") {
      setTimeout(() => {
        routeLoading.finishLoading();
      }, 1);
    }
  }, [transition, routeLoading]);

  const route = useMatches()[1].pathname;

  return (
    <Box
      display={"flex"}
      width={"100%"}
      minHeight={height || "100vh"}
      flexDirection={"column"}
      justifyContent="flex-start"
    >
      <Navbar navigationLinks={navigationLinks} />

      <Progress
        display={routeLoading.isLoading ? "flex" : "none"}
        value={routeLoading.loadingValue}
        height="3px"
        position="fixed"
        top={"64px"}
        zIndex={800}
        width="full"
        backgroundColor="transparent"
        colorScheme={"primary"}
        sx={{
          "& > div:first-of-type": {
            transitionProperty: "width",
          },
        }}
      />

      <Box display={{ base: "none", md: "flex" }}>
        <Fade in={showButton} unmountOnExit style={{ zIndex: 1000 }}>
          <Tooltip label="Scroll to Top" closeOnScroll>
            <IconButton
              onClick={handleScrollToTop}
              aria-label="top"
              zIndex={1000}
              shadow="lg"
              size="lg"
              rounded={"full"}
              position="fixed"
              bottom={12}
              right={16}
              overflow="hidden"
              colorScheme={"primary"}
            >
              <ChevronUpIcon fontSize="1.5em" />
            </IconButton>
          </Tooltip>
        </Fade>
      </Box>
      <Box>{children}</Box>
      {!route.includes("/login") && !route.includes("/register") && (
        <Box marginTop={"auto"}>
          <Footer />
        </Box>
      )}
    </Box>
  );
}
