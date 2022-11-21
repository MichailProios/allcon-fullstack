// import { useEffect, useState } from "react";

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
} from "@chakra-ui/react";
import Navbar from "app/components/Navbar";
import { useWindowDimensions } from "app/utils/hooks";
import { animateScroll as scroll } from "react-scroll";
import { useScrollButtonVisibility } from "app/utils/hooks";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { useTransition } from "@remix-run/react";

interface LayoutProps {
  children: ReactNode;
}

const navigationLinks = [
  { label: "About", url: "about" },
  { label: "Projects", url: "projects" },
  { label: "Testimonials", url: "testimonials" },
  { label: "Contacts", url: "contacts" },
];

export default function Layout({ children }: LayoutProps) {
  const { height } = useWindowDimensions();
  const showButton = useScrollButtonVisibility();
  // const transition = useTransition();

  const handleScrollToTop = () => {
    scroll.scrollToTop({
      duration: 400,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <Box
      display={"flex"}
      width={"100%"}
      minHeight={height || "100vh"}
      flexDirection={"column"}
      justifyContent="flex-start"
    >
      <Navbar navigationLinks={navigationLinks} />
      {/* <Progress
        isIndeterminate
        display={transition.state !== "idle" ? "flex" : "none"}
        size="xs"
        position="fixed"
        top={"64px"}
        zIndex={800}
        width={"100%"}
        backgroundColor="transparent"
        colorScheme={"primary"} */}
      {/* /> */}

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
              colorScheme={"primary"}
            >
              <ChevronUpIcon fontSize="1.5em" />
            </IconButton>
          </Tooltip>
        </Fade>
      </Box>
      <Box>{children}</Box>
      <Box marginTop={"auto"}></Box>
    </Box>
  );
}
