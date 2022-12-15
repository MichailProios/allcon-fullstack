import { Box, Heading, Text, Container, SlideFade } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Awards`,
  description: `Allcon Contracting Awards.`,

  "og:title": "Allcon Contracting - Awards",
  "og:type": "business",
  "og:site_name": "Allcon Contracting",
  "og:description": `Allcon Contracting Awards.`,
  "og:image":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "og:url": "https://allconcontracting.com/testimonials",
});

export default function Awards() {
  return (
    // <SlideFade in={true} unmountOnExit reverse delay={0.05}>
    <Container maxW="1200px" px={{ base: 3, md: 6 }} py={14}>
      <Box textAlign="center" py={10} px={6}>
        <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          This page is under construction
        </Heading>
        <Text color={"gray.500"}>
          Currently, the section of our website that you are trying to access is
          undergoing construction. We apologize for any inconvenience this may
          cause and ask for your patience as we work to improve this part of the
          website. We appreciate your understanding and thank you for visiting
          our website. Please check back soon for updates on the progress of
          this new development.
        </Text>
      </Box>
    </Container>
    // </SlideFade>
  );
}
