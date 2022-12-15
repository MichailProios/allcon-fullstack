import { Flex, Heading } from "@chakra-ui/react";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  console.error(error);

  return (
    <Flex flexDirection="column">
      <Heading as="h2" size="md">
        Failed to load
      </Heading>
    </Flex>
  );
}
