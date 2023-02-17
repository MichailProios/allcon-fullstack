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
    const { data: project } = await supabase
      .from("projects")
      .select(
        `name, thumbnail, url,location, cost  , description, status, completed, show_category_tag, show_client_tag, project_clients(name, tag), project_designers(name, initials),
      project_categories(name, tag), project_media(source, aspect_ratio, type, order)`
      )
      .eq(`url`, params?.name.toLowerCase())
      .single();

    if (!project) {
      return redirect("/projects");
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return json(
      {
        project: project,
      },
      { headers: response.headers }
    );
  } catch (error) {
    throw error;
  }
};

export default function Project() {
  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const sliderRefLarge = useRef<any>(null);

  const handlePrevLarge = useCallback(() => {
    if (!sliderRefLarge.current) return;
    sliderRefLarge.current.swiper.slidePrev();
  }, []);

  const handleNextLarge = useCallback(() => {
    if (!sliderRefLarge.current) return;
    sliderRefLarge.current.swiper.slideNext();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRefThumb = useRef<any>(null);

  const updateIndex = useCallback(
    () => setCurrentSlide(sliderRef.current.swiper.realIndex),
    []
  );

  // Add eventlisteners for swiper after initializing
  useEffect(() => {
    const swiperInstance = sliderRef.current.swiper;

    if (swiperInstance) {
      swiperInstance.on("slideChange", updateIndex);
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.off("slideChange", updateIndex);
      }
    };
  }, [updateIndex]);

  const data = useLoaderData();

  const media: any = Object.values(data.project.project_media).sort(
    (a: any, b: any) => a.order - b.order
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const thumbsBreakpoint = useBreakpointValue(
    { base: 2, xs: 3, sm: 3, md: 4, lg: 6 },
    { fallback: "lg", ssr: true }
  );

  const cssModeBreakpoint = useBreakpointValue(
    { base: true, md: false },
    { fallback: "md", ssr: true }
  );

  const { height } = useWindowDimensions();

  return (
    // <SlideFade in={true} unmountOnExit reverse delay={0.05}>
    <>
      <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={14}>
        <Breadcrumb display={{ base: "none", md: "flex" }}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/projects">
              Projects
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/projects/${data.project.url}`}>
              {data.project.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <VStack spacing="26px" w="full">
          <Heading textAlign="center">{data.project.name}</Heading>
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
        >
          <VStack mt={"26px"} w="full" h="full">
            <Box position={"relative"} w="full">
              <IconButton
                display={media.length > 1 ? "flex" : "none"}
                aria-label="left-arrow"
                variant="solid"
                borderRadius="full"
                position="absolute"
                left={{ base: "5px", md: "10px" }}
                top="50%"
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={handlePrev}
                icon={<ChevronLeftIcon w={6} h={6} />}
                bgColor="gray.50"
                textColor="black"
                _hover={{ bgColor: "gray.300" }}
                _active={{ bgColor: "gray.400" }}
              />

              <IconButton
                display={media.length > 1 ? "flex" : "none"}
                aria-label="right-arrow"
                variant="solid"
                borderRadius="full"
                position="absolute"
                right={{ base: "5px", md: "10px" }}
                top="50%"
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={handleNext}
                icon={<ChevronRightIcon w={6} h={6} />}
                bgColor="gray.50"
                textColor="black"
                _hover={{ bgColor: "gray.300" }}
                _active={{ bgColor: "gray.400" }}
              />

              <IconButton
                aria-label="expand-arrow"
                variant="solid"
                size={"md"}
                borderRadius="full"
                position="absolute"
                top={{ base: "5px", md: "10px" }}
                right={{ base: "5px", md: "10px" }}
                transform={"translate(0%, 0%)"}
                zIndex={2}
                onClick={onOpen}
                icon={<Icon w={5} h={5} as={BiExpand} />}
                bgColor="gray.50"
                textColor="black"
                _hover={{ bgColor: "gray.300" }}
                _active={{ bgColor: "gray.400" }}
              />

              <Box boxShadow="xl" w={"full"}>
                <Swiper
                  style={{
                    borderRadius: "0.375rem",
                  }}
                  keyboard={{
                    enabled: true,
                  }}
                  lazy={{ loadPrevNext: true, loadPrevNextAmount: 2 }}
                  modules={[Lazy, Navigation, Thumbs, Keyboard]}
                  effect={"slide"}
                  thumbs={{ swiper: thumbsSwiper }}
                  ref={sliderRef}
                  spaceBetween={30}
                  // loop={media.length > 1 ? true : false}
                  autoHeight
                  cssMode={cssModeBreakpoint}
                >
                  {media.map((value: any, index: any) => {
                    return (
                      <SwiperSlide key={index}>
                        <AspectRatio
                          ratio={{
                            base: 1,
                            sm: 16 / 9,
                          }}
                          h="full"
                          w="full"
                          maxH="full"
                          maxW="full"
                        >
                          <ClientOnly fallback={<Skeleton w="full" h="full" />}>
                            {() => (
                              <Suspense
                                fallback={<Skeleton w="full" h="full" />}
                              >
                                <ErrorBoundary
                                  FallbackComponent={ErrorFallback}
                                >
                                  {value.type === "image" ? (
                                    <RemixImage
                                      image={value.source + "/public"}
                                      // alt={`Project Image ${index}`}
                                      loading="eager"
                                      w="full"
                                      h="full"
                                      draggable={false}
                                    />
                                  ) : value.type === "video" ? (
                                    <iframe
                                      title={`Project Video ${index}`}
                                      src={value.source}
                                      allowFullScreen
                                      draggable={false}
                                      loading="lazy"
                                      allow="gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                      style={{
                                        border: "none",
                                        height: "100%",
                                        width: "100%",
                                        color: "#f3f3f3",
                                      }}
                                    />
                                  ) : null}
                                </ErrorBoundary>
                              </Suspense>
                            )}
                          </ClientOnly>
                        </AspectRatio>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
            </Box>

            <Fade
              in={true}
              style={{ width: "100%", maxHeight: "100px" }}
              unmountOnExit={false}
              transition={{ enter: { duration: 0 }, exit: { duration: 0 } }}
            >
              <Box
                w="full"
                display={{
                  base: "none",
                  xs: media.length > 1 ? "block" : "none",
                }}
              >
                <AnimatePresence>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={8}
                    slidesPerView={thumbsBreakpoint}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    style={{
                      borderRadius: "0.375rem",
                    }}
                    ref={sliderRefThumb}
                    centerInsufficientSlides
                  >
                    {media.map((value: any, index: any) => {
                      return (
                        <SwiperSlide key={index}>
                          <motion.div
                            whileHover={{ scale: 1.01, cursor: "pointer" }}
                            whileTap={{ scale: 0.99 }}
                            transition={{
                              type: "tween",
                              duration: 0.1,
                            }}
                            key={index}
                          >
                            <AspectRatio ratio={16 / 9} w="full" h="full">
                              <ClientOnly
                                fallback={<Skeleton w="full" h="full" />}
                              >
                                {() => (
                                  <Suspense
                                    fallback={<Skeleton w="full" h="full" />}
                                  >
                                    <ErrorBoundary
                                      FallbackComponent={ErrorFallback}
                                    >
                                      {value.type === "image" ? (
                                        <RemixImage
                                          image={value.source + "/meta"}
                                          loading="eager"
                                          borderRadius="md"
                                          zIndex={9000}
                                          opacity={
                                            currentSlide === index ? 1 : 0.8
                                          }
                                          transition="opacity 200ms"
                                          w="full"
                                          h="full"
                                        />
                                      ) : value.type === "video" ? (
                                        <Box
                                          borderRadius="md"
                                          w="full"
                                          h="full"
                                          bgColor="gray.100"
                                          _dark={{ bgColor: "gray.600" }}
                                        >
                                          <Icon
                                            w="full"
                                            h="full"
                                            as={FcVideoFile}
                                          />
                                        </Box>
                                      ) : null}
                                    </ErrorBoundary>
                                  </Suspense>
                                )}
                              </ClientOnly>
                            </AspectRatio>
                          </motion.div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </AnimatePresence>
              </Box>
            </Fade>
          </VStack>
        </motion.div>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          blockScrollOnMount
          closeOnOverlayClick
          isCentered
          scrollBehavior="inside"
          size="full"
          motionPreset="slideInBottom"
        >
          <ModalOverlay />

          <ModalContent p={0} m={0}>
            <IconButton
              aria-label="close"
              variant="solid"
              size="md"
              borderRadius="full"
              colorScheme="primary"
              position="absolute"
              top={"10px"}
              right={"10px"}
              transform={"translate(0%, 0%)"}
              zIndex={2}
              onClick={onClose}
              icon={<CloseIcon w={3} h={3} />}
            />
            <ModalBody overflow="hidden" h={`${height}px`} p={0} m={0}>
              <Box position={"relative"} w="full" h={`${height}px`}>
                <IconButton
                  display={media.length > 1 ? "flex" : "none"}
                  aria-label="left-arrow"
                  variant="solid"
                  borderRadius="full"
                  position="absolute"
                  left={{ base: "5px", md: "10px" }}
                  top="50%"
                  transform={"translate(0%, -50%)"}
                  zIndex={400}
                  onClick={handlePrevLarge}
                  icon={<ChevronLeftIcon w={6} h={6} />}
                  bgColor="gray.50"
                  textColor="black"
                  _active={{ bgColor: "gray.400" }}
                  _hover={{ bgColor: "gray.300" }}
                />

                <IconButton
                  display={media.length > 1 ? "flex" : "none"}
                  aria-label="right-arrow"
                  variant="solid"
                  borderRadius="full"
                  position="absolute"
                  right={{ base: "5px", md: "10px" }}
                  top="50%"
                  transform={"translate(0%, -50%)"}
                  zIndex={400}
                  onClick={handleNextLarge}
                  icon={<ChevronRightIcon w={6} h={6} />}
                  bgColor="gray.50"
                  textColor="black"
                  _active={{ bgColor: "gray.400" }}
                  _hover={{ bgColor: "gray.300" }}
                />

                <Box boxShadow="xl" w={"full"}>
                  <Swiper
                    style={{
                      objectFit: "contain",
                      height: `${height}px`,
                      width: "100%",
                    }}
                    initialSlide={sliderRef.current?.swiper.realIndex ?? 0}
                    lazy={{ loadPrevNext: true, loadPrevNextAmount: 2 }}
                    modules={[Lazy, Navigation, Pagination, Keyboard]}
                    keyboard={{
                      enabled: true,
                    }}
                    effect={"slide"}
                    pagination={{
                      type: "progressbar",
                    }}
                    ref={sliderRefLarge}
                    spaceBetween={30}
                    // loop={media.length > 1 ? true : false}
                    autoHeight
                    cssMode={cssModeBreakpoint}
                  >
                    {media.map((value: any, index: any) => {
                      return (
                        <SwiperSlide
                          key={index}
                          style={{ height: `${height}px`, width: "100%" }}
                        >
                          <ClientOnly fallback={<Skeleton w="full" h="full" />}>
                            {() => (
                              <Suspense
                                fallback={
                                  <Box w="full" h="full" position="relative">
                                    <Flex
                                      alignItems="center"
                                      flexDirection="column"
                                      position="absolute"
                                      top="50%"
                                      left="50%"
                                      transform={"translate(-50%, -50%)"}
                                    >
                                      <Spinner color="primary.500" size="xl" />

                                      <Text>Loading Image</Text>
                                    </Flex>
                                  </Box>
                                }
                              >
                                <ErrorBoundary
                                  FallbackComponent={ErrorFallback}
                                >
                                  {value.type === "image" ? (
                                    <RemixImage
                                      image={value.source + "/hq"}
                                      // alt={`Project Image ${index}`}
                                      loading="eager"
                                      w="full"
                                      maxW="full"
                                      maxH="full"
                                      objectFit="contain"
                                      draggable={false}
                                      h={`${height}px`}
                                    />
                                  ) : value.type === "video" ? (
                                    <AspectRatio
                                      ratio={{
                                        base: 1,
                                        sm:
                                          value.aspect_ratio !== 16 / 9
                                            ? 4 / 3
                                            : 16 / 9,
                                      }}
                                      h={`${height}px`}
                                    >
                                      <iframe
                                        title={`Project Video ${index}`}
                                        src={value.source}
                                        allowFullScreen
                                        draggable={false}
                                        allow="gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                        loading="lazy"
                                        style={{
                                          border: "none",
                                          height: "100%",
                                          width: "100%",
                                          color: "#f3f3f3",
                                        }}
                                      />
                                    </AspectRatio>
                                  ) : null}
                                </ErrorBoundary>
                              </Suspense>
                            )}
                          </ClientOnly>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
      <Divider />
      <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={14}>
        <VStack spacing="18px">
          {data.project.name ||
          data.project.project_categories ||
          data.project.project_clients ||
          data.project.location ||
          data.project.status ||
          data.project.cost ||
          data.project.project_designers ||
          data.project.description ? (
            <>
              <Heading textAlign="center">Project Information</Heading>
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
              >
                <Card rounded="md" boxShadow="xl" w={"full"}>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      {data.project.location && (
                        <Box>
                          <Tag size="lg" borderRadius="full">
                            <Icon h={6} w={6} as={BiMap} ml={-1} mr={2} />
                            <TagLabel fontSize="lg">Location</TagLabel>
                          </Tag>
                          <AspectRatio
                            ratio={{ base: 1, md: 16 / 9 }}
                            maxW="100%"
                            mb={4}
                            ml={1}
                            mt={4}
                          >
                            <iframe
                              title={`Project ${data.project.name} location`}
                              src={data.project.location}
                              style={{
                                border: "none",
                                height: "100%",
                                width: "100%",
                                borderRadius: "0.375rem",
                                color: "#f3f3f3",
                              }}
                              allowFullScreen={false}
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </AspectRatio>
                        </Box>
                      )}
                      {data.project.project_clients && (
                        <Box>
                          <HStack alignItems="center">
                            <Tag size="lg" borderRadius="full">
                              <Icon
                                h={6}
                                w={6}
                                as={BiBuildings}
                                ml={-1}
                                mr={2}
                              />
                              <TagLabel fontSize="lg">Client</TagLabel>
                            </Tag>
                            {data.project.project_clients.tag && (
                              <Badge colorScheme="blue">
                                {data.project.project_clients.tag}
                              </Badge>
                            )}
                          </HStack>

                          <Text pl="1" pt="2" fontSize="xl">
                            {data.project.project_clients.name}
                          </Text>
                        </Box>
                      )}

                      {data.project.status && (
                        <Box>
                          <HStack alignItems="center">
                            <Tag size="lg" borderRadius="full">
                              <Icon
                                h={6}
                                w={6}
                                as={AiOutlineCheckCircle}
                                ml={-1}
                                mr={2}
                              />
                              <TagLabel fontSize="lg">Status</TagLabel>
                            </Tag>
                            {data.project.completed ? (
                              <Badge colorScheme="green">completed</Badge>
                            ) : (
                              <Badge colorScheme="yellow">in progress</Badge>
                            )}
                          </HStack>
                          <Text pl="1" pt="2" fontSize="xl">
                            {data.project.status}
                          </Text>
                        </Box>
                      )}

                      {data.project.project_categories && (
                        <Box>
                          <HStack alignItems="center">
                            <Tag size="lg" borderRadius="full">
                              <Icon
                                h={6}
                                w={6}
                                as={AiOutlineTag}
                                ml={-1}
                                mr={2}
                              />
                              <TagLabel fontSize="lg">Category</TagLabel>
                            </Tag>
                            {data.project.project_categories.tag && (
                              <Badge colorScheme="blue">
                                {data.project.project_categories.tag}
                              </Badge>
                            )}
                          </HStack>

                          <Text pl="1" pt="2" fontSize="xl">
                            {data.project.project_categories.name}
                          </Text>
                        </Box>
                      )}

                      {data.project.cost && (
                        <Box>
                          <Tag size="lg" borderRadius="full">
                            <Icon
                              h={6}
                              w={6}
                              as={AiOutlineDollarCircle}
                              ml={-1}
                              mr={2}
                            />
                            <TagLabel fontSize="lg">Cost</TagLabel>
                          </Tag>
                          <Text pl="1" pt="2" fontSize="xl">
                            {data.project.cost}
                          </Text>
                        </Box>
                      )}

                      {data.project.project_designers && (
                        <Box>
                          <Tag size="lg" borderRadius="full">
                            <Avatar
                              size="xs"
                              name={data.project.project_designers.initials}
                              ml={-1}
                              mr={2}
                            />
                            <TagLabel fontSize="lg">Designer</TagLabel>
                          </Tag>
                          <Text pl="1" pt="2" fontSize="xl">
                            {data.project.project_designers.name}
                          </Text>
                        </Box>
                      )}

                      {data.project.description && (
                        <Box>
                          <Tag size="lg" borderRadius="full">
                            <Icon
                              h={6}
                              w={6}
                              as={AiOutlineFileText}
                              ml={-1}
                              mr={2}
                            />
                            <TagLabel fontSize="lg">Description</TagLabel>
                          </Tag>
                          <Text
                            pl="1"
                            pt="2"
                            fontSize="xl"
                            textAlign={{ base: "start", sm: "justify" }}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: data.project.description,
                              }}
                            />
                          </Text>
                        </Box>
                      )}
                    </Stack>
                  </CardBody>
                </Card>
              </motion.div>
            </>
          ) : (
            <Card rounded="md" boxShadow="xl" w={"full"}>
              <CardBody>
                <Box textAlign="center" py={10} px={6}>
                  <InfoIcon boxSize={"50px"} color={"primary.500"} />
                  <Heading as="h2" size="lg" mt={6} mb={2}>
                    This project has no additional information
                  </Heading>
                  <Text color={"gray.500"}>
                    Our team is devoted to providing accurate data for each
                    project. Please allow us some time as we update "
                    {data.project.name}"
                  </Text>
                </Box>
              </CardBody>
            </Card>
          )}
        </VStack>
      </Container>
    </>
    // </SlideFade>
  );
}
