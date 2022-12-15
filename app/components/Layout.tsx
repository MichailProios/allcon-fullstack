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
import profiles from "~/utils/profiles";

interface LayoutProps {
  children: ReactNode;
  context?: any;
}

const navigationLinks = [
  { label: "About", url: "/about" },
  {
    label: "Blog",
    url: "/blog",
  },

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
      { label: "All Resources", url: "/resources" },
      { label: "Awards", url: "/resources/awards" },
      { label: "Diversity", url: "/resources/diversity" },
      { label: "References", url: "/resources/references" },
      { label: "Certifications", url: "/resources/certifications" },
      { label: "Media", url: "/resources/media" },
      { label: "Brochures", url: "/resources/brochures" },
    ],
  },
  { label: "Contacts", url: "contacts" },
];

export default function Layout({ children, context }: LayoutProps) {
  const { height } = useWindowDimensions();
  const showButton = useScrollButtonVisibility();

  const handleScrollToTop = () => {
    scroll.scrollToTop({
      duration: 400,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const route = useMatches()[1];

  if (!route?.pathname.includes("/privacy")) {
    return (
      <Box
        display={"flex"}
        width={"100%"}
        minHeight={height || "100vh"}
        flexDirection={"column"}
        justifyContent="flex-start"
      >
        <Navbar navigationLinks={navigationLinks} context={context} />

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
        {!route?.pathname.includes("/login") &&
          !route?.pathname.includes("/register") && (
            <Box marginTop={"auto"}>
              <Footer />
            </Box>
          )}
      </Box>
    );
  } else {
    return <>{children}</>;
  }
}
