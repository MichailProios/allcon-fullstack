import { Container, Box, Heading, VStack, SlideFade } from "@chakra-ui/react";
import { postsData } from "~/__temp/data";
import Card from "~/__temp/card";

const Index = () => {
  return (
    <SlideFade in={true} unmountOnExit reverse delay={0.1}>
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={16} mx="auto">
        <VStack spacing="26px" w="full">
          <Heading textAlign="center">Blog</Heading>

          <Box borderRadius="md">
            {postsData.map((post, index) => (
              <Card
                key={post.id}
                title={post.title}
                username={post.username}
                tagList={post.tagList}
                readingTime={post.readingTime}
                commentsCount={post.commentsCount}
                reactionsCount={post.reactionsCount}
                postLink={post.postLink}
                publishedDate={post.publishedDate}
                userProfile={post.userProfile}
                headerImage={index === 0 ? post.headerImage : ""}
              />
            ))}
          </Box>
        </VStack>
      </Container>
    </SlideFade>
  );
};

export default Index;
