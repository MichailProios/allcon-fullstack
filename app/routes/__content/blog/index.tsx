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
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { postsData } from "~/__temp/data";
import { BsHeart } from "react-icons/bs";
import { FaBlog, FaLinkedin } from "react-icons/fa";
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

const Index = () => {
  return (
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
      <Container maxW="1200px" px={{ base: 3, md: 6 }} py={14}>
        <Box textAlign="center" py={10} px={6}>
          <Icon as={FaBlog} boxSize={"50px"} color={"green.300"} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Coming Soon
          </Heading>
          <VStack>
            <Text color={"gray.500"}>
              Our blog page is coming soon, but we are excited to bring you a
              wide variety of informative and interesting content in the near
              future. Be sure to check back regularly or follow us on social
              media to stay up-to-date on new blog posts as they are released.
              We can't wait to share our insights and expertise with you through
              our blog.
            </Text>

            <Text color={"gray.500"}>
              In the meantime, be sure to follow us on LinkedIn for updates and
              insights from the Allcon Contracting team.
            </Text>

            <Button
              leftIcon={<Icon as={FaLinkedin} color="#0E76A8" />}
              rounded="md"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/company/allcon-contracting/"
                )
              }
            >
              Follow us on LinkedIn
            </Button>
          </VStack>
        </Box>
      </Container>
    </motion.div>

    // <Container maxW="1200px" px={{ base: 5, md: 8 }} py={16} mx="auto">
    //   <VStack spacing="26px" w="full">
    //     <Heading textAlign="center">Blog Posts</Heading>

    //     <Box w="full">
    //       <AnimatePresence>
    //         {postsData.map((post, index) => (
    //           <RenderIfVisible key={index} defaultHeight={1000}>
    //             <motion.div
    //               layout
    //               initial={{ y: 20, opacity: 0 }}
    //               animate={{ y: 0, opacity: 1 }}
    //               exit={{ y: 20, opacity: 0 }}
    //               transition={{
    //                 type: "spring",
    //                 mass: 0.5,
    //               }}
    //             >
    //               <Box
    //                 w="full"
    //                 mt="3"
    //                 as="article"
    //                 bg="white"
    //                 borderRadius="md"
    //                 overflow="hidden"
    //                 boxShadow="lg"
    //                 border="1px solid #08090a1a"
    //               >
    //                 {index === 0 ? (
    //                   <AspectRatio ratio={16 / 9}>
    //                     <Image alt="header image" src={post.headerImage} />
    //                   </AspectRatio>
    //                 ) : (
    //                   ""
    //                 )}

    //                 <Grid
    //                   templateColumns={{ base: "1fr", sm: "max-content 1fr" }}
    //                   gap={2}
    //                   p={4}
    //                   bg="gray.100"
    //                   _dark={{ bg: "gray.700" }}
    //                 >
    //                   <HStack display={{ base: "flex", sm: "block" }}>
    //                     <Image
    //                       alt="user profile"
    //                       src={post.userProfile}
    //                       w="8"
    //                       borderRadius="full"
    //                     />
    //                     <VStack
    //                       align="flex-start"
    //                       spacing={0}
    //                       display={{ base: "flex", sm: "none" }}
    //                     >
    //                       <Text
    //                         color="#4d5760"
    //                         fontSize="14px"
    //                         fontWeight="500"
    //                       >
    //                         {post.username}
    //                       </Text>
    //                       <Text color="#4d5760" fontSize="12px">
    //                         {post.publishedDate}
    //                       </Text>
    //                     </VStack>
    //                   </HStack>
    //                   <Box>
    //                     <VStack
    //                       align="flex-start"
    //                       spacing={0}
    //                       display={{ base: "none", sm: "flex" }}
    //                     >
    //                       <Text
    //                         color="#4d5760"
    //                         fontSize="14px"
    //                         fontWeight="500"
    //                       >
    //                         {post.username}
    //                       </Text>
    //                       <Text color="#4d5760" fontSize="12px">
    //                         {post.publishedDate}
    //                       </Text>
    //                     </VStack>
    //                     <Heading fontSize={{ base: "xl", sm: "3xl" }} mt="3">
    //                       <Text
    //                         to={post.postLink}
    //                         _hover={{
    //                           color: "#323ebe",
    //                           textDecoration: "none",
    //                         }}
    //                         as={Link}
    //                       >
    //                         {post.title}
    //                       </Text>
    //                     </Heading>
    //                     <HStack mt="3" fontSize="14px" color="#64707d">
    //                       {post.tagList!.map((tag, idx) => (
    //                         <Text key={idx}>#{tag}</Text>
    //                       ))}
    //                     </HStack>
    //                     <HStack mt={3}>
    //                       <Button
    //                         leftIcon={<BsHeart />}
    //                         ml={-2}
    //                         bg="transparent"
    //                         padding="6px 8px"
    //                         height="auto"
    //                         fontWeight="normal"
    //                         fontSize="14px"
    //                         lineHeight="1.2"
    //                         rounded="md"
    //                         _hover={{
    //                           bg: "gray.200",
    //                           _dark: { bg: "gray.600" },
    //                         }}
    //                       >
    //                         {post.reactionsCount}
    //                         <Box
    //                           ml="2"
    //                           as="span"
    //                           display={{ base: "none", sm: "block" }}
    //                         >
    //                           reactions
    //                         </Box>
    //                       </Button>
    //                       <Button
    //                         leftIcon={<FaRegComment />}
    //                         bg="transparent"
    //                         padding="6px 8px"
    //                         height="auto"
    //                         fontWeight="normal"
    //                         fontSize="14px"
    //                         lineHeight="1.2"
    //                         rounded="md"
    //                         _hover={{
    //                           bg: "gray.200",
    //                           _dark: { bg: "gray.600" },
    //                         }}
    //                       >
    //                         {post.commentsCount}{" "}
    //                         <Box
    //                           ml="2"
    //                           as="span"
    //                           display={{ base: "none", sm: "block" }}
    //                         >
    //                           comments
    //                         </Box>
    //                       </Button>
    //                       <Spacer />
    //                       <Text fontSize="12px">
    //                         {post.readingTime} min read
    //                       </Text>
    //                     </HStack>
    //                   </Box>
    //                 </Grid>
    //               </Box>
    //             </motion.div>
    //           </RenderIfVisible>
    //         ))}
    //       </AnimatePresence>
    //     </Box>
    //   </VStack>
    // </Container>
  );
};

export default Index;
