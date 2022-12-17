import {
  Box,
  Heading,
  Text,
  Container,
  SlideFade,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Icon,
  useToast,
  Alert,
  AlertTitle,
  Button,
} from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { createServerClient } from "~/utils/supabase.server";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
  useMatches,
  useOutletContext,
} from "@remix-run/react";
import RenderIfVisible from "react-render-if-visible";
import { AnimatePresence, motion } from "framer-motion";

import type { SupabaseClient } from "@supabase/auth-helpers-remix";
import type { Database } from "~/utils/db_types";
import { useEffect, useRef } from "react";
import { VscFilePdf } from "react-icons/vsc";

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Brochures`,
  description: `Allcon Contracting Brochures.`,

  "og:title": "Allcon Contracting - Brochures",
  "og:type": "business",
  "og:site_name": "Allcon Contracting",
  "og:description": `Allcon Contracting Brochures.`,
  "og:image":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "og:url": "https://allconcontracting.com/resources/brochures",
});

export const loader: LoaderFunction = async ({ request }: any) => {
  try {
    const response = new Response();
    const supabase = createServerClient({ request, response });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data: allBrochures, error } = await supabase.storage
      .from("brochures")
      .list();

    return json(
      { allBrochures },
      {
        headers: response.headers,
      }
    );
  } catch (error) {
    throw error;
  }
};

export default function Brochures() {
  const loaderData = useLoaderData();

  return (
    <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={14}>
      <Breadcrumb display={{ base: "none", md: "flex" }}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/resources">
            Resources
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/resources/brochures">
            Brochures
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing="26px">
        <Heading textAlign="center">Brochures</Heading>
        <SimpleGrid
          w="full"
          columns={{ base: 1, smd: 2, md: 2, xmd: 3, lg: 3, xl: 4 }}
          spacing={4}
        >
          <AnimatePresence>
            {loaderData.allBrochures.map((value, index) => (
              <RenderIfVisible key={index} defaultHeight={1000}>
                <motion.div
                  layout
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{
                    y: { duration: 0.2 },
                    default: { ease: "linear" },
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{
                      type: "tween",
                      duration: 0.2,
                    }}
                  >
                    <Card
                      variant="elevated"
                      rounded="md"
                      boxShadow="xl"
                      key={index}
                      as={Link}
                      to={value.name}
                    >
                      <CardBody pb={0}>
                        <Icon
                          textAlign="center"
                          w="full"
                          h="100px"
                          as={VscFilePdf}
                          color="red.500"
                        />
                      </CardBody>
                      <CardFooter pt={2} justifyContent="center">
                        <Text textAlign="center">{value.name}</Text>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              </RenderIfVisible>
            ))}
          </AnimatePresence>
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
