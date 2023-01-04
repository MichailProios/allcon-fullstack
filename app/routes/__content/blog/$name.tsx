import { Suspense, useCallback, useRef, useEffect, useState } from "react";
import {
  Text,
  Box,
  HStack,
  VStack,
  Icon,
  Container,
  Heading,
  Card,
  CardBody,
  Flex,
  Stack,
  Avatar,
  Divider,
  IconButton,
  StackDivider,
  Skeleton,
  AspectRatio,
  Tag,
  TagLabel,
  Badge,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Fade,
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";

import { motion, AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";

// import { motion, useScroll, useSpring } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Thumbs,
  Lazy,
  FreeMode,
  Pagination,
  Navigation,
  Keyboard,
} from "swiper";

import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { redirect } from "@remix-run/node";

import { json } from "@remix-run/node";

import { Link, useLoaderData } from "@remix-run/react";
// import { useWindowDimensions } from "~/utils/hooks";

// import { GrNext, GrPrevious } from "react-icons/gr";

import {
  ChevronRightIcon,
  ChevronLeftIcon,
  InfoIcon,
  CloseIcon,
} from "@chakra-ui/icons";

// import Slider from "react-slick";

// import AwesomeSlider from "react-awesome-slider";

import { projects } from "~/utils/projects";

import {
  AiOutlineDollarCircle,
  AiOutlineFileText,
  AiOutlineCheckCircle,
  AiOutlineTag,
} from "react-icons/ai";
import { FcVideoFile } from "react-icons/fc";
import { BiBuildings, BiMap, BiExpand } from "react-icons/bi";
import { useWindowDimensions } from "~/utils/hooks";
import { createServerClient } from "~/utils/supabase.server";
import RemixImage from "~/components/RemixImage";
import ErrorFallback from "~/components/ErrorFallback";
import { ClientOnly } from "remix-utils/build/react";

export const meta: MetaFunction = ({ params }: any) =>
  projects.has(params?.name.toLowerCase())
    ? {
        title: `Allcon Contracting - ${
          projects.get(params.name.toLowerCase()).name
        }`,
        description: projects.get(params.name.toLowerCase()).description,

        "og:title": `Allcon Contracting - ${
          projects.get(params.name.toLowerCase()).name
        }`,
        "og:type": "business",
        "og:site_name": "Allcon Contracting",
        "og:description": projects.get(params.name.toLowerCase()).description,
        "og:image": projects.get(params.name.toLowerCase()).thumbnail + "/meta",

        "twitter:card":
          projects.get(params.name.toLowerCase()).thumbnail + "/meta",
        "og:url": `https://allconcontracting.com${
          projects.get(params.name.toLowerCase()).path
        }`,
      }
    : {
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
      };

export const loader: LoaderFunction = async ({ request, params }: any) => {
  try {
    const response = new Response();
    const supabase = createServerClient({ request, response });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return json(
      //   {
      //     project: project,
      //   },
      null,
      { headers: response.headers }
    );
  } catch (error) {
    throw error;
  }
};

export default function Articles() {
  return (
    // <SlideFade in={true} unmountOnExit reverse delay={0.05}>
    <>
      <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={14}>
        <Breadcrumb display={{ base: "none", md: "flex" }}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/blog">
              Blog
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/blog`}>
              Post Name
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <VStack spacing="26px" w="full">
          <Heading textAlign="center">Blog Header</Heading>
        </VStack>

        <motion.div
          layout
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{
            type: "spring",
            mass: 0.5,
          }}
          style={{ width: "100%" }}
        ></motion.div>
      </Container>
    </>
  );
}
