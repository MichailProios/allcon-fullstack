import { Fragment } from "react";
import {
  Text,
  Box,
  VStack,
  Container,
  Heading,
  Avatar,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { testimonials } from "~/utils/testimonials";
import { Link } from "@remix-run/react";
import { createServerClient } from "~/utils/supabase.server";
import { motion } from "framer-motion";
export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Testimonials`,
  description: `Allcon Contracting testimonials from clients.`,

  "og:title": "Allcon Contracting - Testimonials",
  "og:type": "business",
  "og:site_name": "Allcon Contracting",
  "og:description": `Allcon Contracting testimonials from clients.`,
  "og:image":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "og:url": "https://allconcontracting.com/testimonials",
});

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    const response = new Response();
    const supabase = createServerClient({ request, response });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return json(
      { references: Array.from(testimonials.values()) },
      {
        headers: response.headers,
      }
    );
  } catch (error) {
    throw error;
  }
};

export default function Index() {
  const data = useLoaderData();

  return (
    <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={14}>
      <Breadcrumb display={{ base: "none", md: "flex" }}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/resources">
            Resources
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/resources/references">
            References
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing="26px">
        <Heading textAlign="center">References</Heading>
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
          {data.references.map((value: any, index: any) => (
            <Fragment key={index}>
              <VStack spacing={3} pt={1} justify="center">
                <Avatar
                  size="xl"
                  showBorder={true}
                  borderColor="primary.400"
                  name={value.initials || value.name}
                  src={value.image}
                />
                <Box textAlign="center">
                  <Text fontWeight="bold" fontSize="lg">
                    {value.name}
                  </Text>
                  <Text fontWeight="medium" fontSize="sm" color="gray.400">
                    {value.position} {value.company && <> at </>}
                    {value.company}
                  </Text>
                </Box>
                <Box textAlign="center" maxW="4xl">
                  <Text fontSize="md" fontWeight="medium">
                    {value.content}
                  </Text>
                </Box>
              </VStack>
              {data.references.length - 1 !== index && (
                <Divider my={6} w="100vw" />
              )}
            </Fragment>
          ))}
        </motion.div>
      </VStack>
    </Container>
  );
}
