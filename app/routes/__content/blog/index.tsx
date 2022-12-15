import {
  Container,
  Box,
  Heading,
  VStack,
  SlideFade,
  Image,
  AspectRatio,
  Spacer,
  Button,
  HStack,
  Grid,
  Text,
} from "@chakra-ui/react";

import { Link } from "@remix-run/react";
import { postsData } from "~/__temp/data";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import RenderIfVisible from "react-render-if-visible";
const Index = () => {
  return (
    <SlideFade in={true} unmountOnExit reverse delay={0.05}>
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={16} mx="auto">
        <VStack spacing="26px" w="full">
          <Heading textAlign="center">Blog Posts</Heading>

          <AnimatePresence>
            <Box w="full">
              {postsData.map((post, index) => (
                <RenderIfVisible key={index} defaultHeight={1000}>
                  <motion.div
                    layout
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
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
                          <Image
                            alt="user profile"
                            src={post.userProfile}
                            w="8"
                            borderRadius="full"
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
                              to={post.postLink}
                              _hover={{
                                color: "#323ebe",
                                textDecoration: "none",
                              }}
                              as={Link}
                            >
                              {post.title}
                            </Text>
                          </Heading>
                          <HStack mt="3" fontSize="14px" color="#64707d">
                            {post.tagList!.map((tag, idx) => (
                              <Text key={idx}>#{tag}</Text>
                            ))}
                          </HStack>
                          <HStack mt={3}>
                            <Button
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
                            </Button>
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
            </Box>
          </AnimatePresence>
        </VStack>
      </Container>
    </SlideFade>
  );
};

export default Index;
