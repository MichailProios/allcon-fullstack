import {
  VStack,
  Image,
  AspectRatio,
  Spacer,
  Button,
  HStack,
  Grid,
  Box,
  Heading,
  Text,
  Container,
  Icon,
  Avatar,
  Link,
} from "@chakra-ui/react";
// import { Link } from "@remix-run/react";
import { BsHeart } from "react-icons/bs";
import { FaBlog, FaLinkedin, FaRegComment } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import RenderIfVisible from "react-render-if-visible";
import { createServerClient } from "~/utils/supabase.server";
import { useState } from "react";

import { WarningTwoIcon } from "@chakra-ui/icons";

import type { MetaFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    const response = new Response();
    const supabase = createServerClient({ request, response });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return json(null, {
      headers: response.headers,
    });
  } catch (error) {
    throw error;
  }
};

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Blog`,
  description: `Allcon Contracting blog posts.`,

  "og:title": "Allcon Contracting - Blog",
  "og:type": "business",
  "og:site_name": "Allcon Contracting",
  "og:description": `Allcon Contracting blog posts.`,
  "og:image":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "og:url": "https://allconcontracting.com/blog",
});

const Index = () => {
  return (
    <Container maxW="1200px" px={{ base: 5, md: 8 }} py={16} mx="auto">
      <VStack spacing="26px" w="full">
        <Heading textAlign="center">Blog Posts</Heading>

        <Box w="full">
          <AnimatePresence>
            {[
              {
                id: "1",
                title:
                  "All-Con Contracting Wins NACIA Award for Lupton Hall Roof Replacement Project at SUNY Farmingdale",
                username: "George Proios",
                tagList: ["SUNY", "contracting", "copper", "awards"],
                readingTime: 4,
                // commentsCount: 26,
                // reactionsCount: 100,
                postLink:
                  "https://www.linkedin.com/feed/update/urn:li:activity:7012154499112837120",
                publishedDate: "23 December 2022",
                userProfile: "",
                headerImage:
                  "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/7b6136cc-91ee-4ce6-9b8e-6e985405ae00/public",
              },
              {
                id: "2",
                title:
                  "All-Con Contracting Wishes Everyone a Happy and Prosperous New Year",
                username: "Michail Proios",
                readingTime: 2,
                // commentsCount: 26,
                // reactionsCount: 100,
                postLink:
                  "https://www.linkedin.com/feed/update/urn:li:activity:7015387195096104960",
                publishedDate: "1 January 2023",
                userProfile:
                  "https://lh3.googleusercontent.com/a/AEdFTp5-DGFL7R5gMGuJGmncPmthHqmYMkD3BBdAkQJWCQ=s96-c",
                headerImage:
                  "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/36387977-1c91-49f6-dfa8-4bc5c6b6c600/public",
              },
              {
                id: "3",
                title:
                  "All-Con Contracting Completes NYS Office of General Services' DOT Operations Facility in Elwood, NY",
                username: "Michail Proios",
                tagList: ["allcon", "ogs", "contracting"],
                readingTime: 3,
                // commentsCount: 26,
                // reactionsCount: 100,
                postLink:
                  "https://www.linkedin.com/feed/update/urn:li:activity:7014325531340853248",
                publishedDate: "12 December 2022",
                userProfile:
                  "https://lh3.googleusercontent.com/a/AEdFTp5-DGFL7R5gMGuJGmncPmthHqmYMkD3BBdAkQJWCQ=s96-c",
                headerImage:
                  "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/36387977-1c91-49f6-dfa8-4bc5c6b6c600/public",
              },
            ].map((post, index) => (
              <RenderIfVisible key={index} defaultHeight={1000}>
                <motion.div
                  layout
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{
                    type: "spring",
                    mass: 0.5,
                  }}
                >
                  <Box
                    w="full"
                    mt="3"
                    as="article"
                    bg="white"
                    borderRadius="md"
                    overflow="hidden"
                    boxShadow="lg"
                    border="1px solid #08090a1a"
                  >
                    {index === 0 ? (
                      <AspectRatio ratio={16 / 9}>
                        <Image alt="header image" src={post.headerImage} />
                      </AspectRatio>
                    ) : (
                      ""
                    )}

                    <Grid
                      templateColumns={{ base: "1fr", sm: "max-content 1fr" }}
                      gap={2}
                      p={4}
                      bg="gray.100"
                      _dark={{ bg: "gray.700" }}
                    >
                      <HStack display={{ base: "flex", sm: "block" }}>
                        <Avatar
                          src={post.userProfile}
                          w="8"
                          size="sm"
                          name={post.username}
                        />
                        <VStack
                          align="flex-start"
                          spacing={0}
                          display={{ base: "flex", sm: "none" }}
                        >
                          <Text
                            color="#4d5760"
                            fontSize="14px"
                            fontWeight="500"
                          >
                            {post.username}
                          </Text>
                          <Text color="#4d5760" fontSize="12px">
                            {post.publishedDate}
                          </Text>
                        </VStack>
                      </HStack>
                      <Box>
                        <VStack
                          align="flex-start"
                          spacing={0}
                          display={{ base: "none", sm: "flex" }}
                        >
                          <Text
                            color="#4d5760"
                            fontSize="14px"
                            fontWeight="500"
                          >
                            {post.username}
                          </Text>
                          <Text color="#4d5760" fontSize="12px">
                            {post.publishedDate}
                          </Text>
                        </VStack>
                        <Heading fontSize={{ base: "xl", sm: "3xl" }} mt="3">
                          <Text
                            href={post.postLink}
                            isExternal
                            _hover={{
                              color: "#323ebe",
                              textDecoration: "none",
                            }}
                            as={Link}
                          >
                            {post.title}
                          </Text>
                        </Heading>
                        {post?.tagList?.length > 0 && (
                          <HStack mt="3" fontSize="14px" color="#64707d">
                            {post.tagList!.map((tag, idx) => (
                              <Text key={idx}>#{tag}</Text>
                            ))}
                          </HStack>
                        )}
                        <HStack mt={3}>
                          {/* <Button
                            leftIcon={<BsHeart />}
                            ml={-2}
                            bg="transparent"
                            padding="6px 8px"
                            height="auto"
                            fontWeight="normal"
                            fontSize="14px"
                            lineHeight="1.2"
                            rounded="md"
                            _hover={{
                              bg: "gray.200",
                              _dark: { bg: "gray.600" },
                            }}
                          >
                            {post.reactionsCount}
                            <Box
                              ml="2"
                              as="span"
                              display={{ base: "none", sm: "block" }}
                            >
                              reactions
                            </Box>
                          </Button>
                          <Button
                            leftIcon={<FaRegComment />}
                            bg="transparent"
                            padding="6px 8px"
                            height="auto"
                            fontWeight="normal"
                            fontSize="14px"
                            lineHeight="1.2"
                            rounded="md"
                            _hover={{
                              bg: "gray.200",
                              _dark: { bg: "gray.600" },
                            }}
                          >
                            {post.commentsCount}{" "}
                            <Box
                              ml="2"
                              as="span"
                              display={{ base: "none", sm: "block" }}
                            >
                              comments
                            </Box>
                          </Button> */}
                          <Spacer />
                          <Text fontSize="12px">
                            {post.readingTime} min read
                          </Text>
                        </HStack>
                      </Box>
                    </Grid>
                  </Box>
                </motion.div>
              </RenderIfVisible>
            ))}
          </AnimatePresence>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
