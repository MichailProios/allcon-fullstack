import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  FormErrorMessage,
  Divider,
  Card,
  Icon,
  useToast,
  CardBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  AspectRatio,
} from "@chakra-ui/react";
import { useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { json } from "@remix-run/node";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import * as mailer from "~/utils/email.server";
import { BiSend, BiMap, BiStreetView } from "react-icons/bi";
import { createServerClient } from "~/utils/supabase.server";

const phoneRegExp = new RegExp(
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/
);

export const validator = withZod(
  z.object({
    fullName: z
      .string()
      .min(1, { message: "Full Name is required" })
      .max(20, { message: "Full Name cannot be more than 20 characters" }),

    phoneNumber: z
      .string()
      .min(1, { message: "Phone Number is required" })
      .min(9, { message: "Phone Number cannot be less than 9 characters" })
      .max(15, { message: "Phone Number cannot be more than 15 characters" })
      .regex(phoneRegExp, {
        message: "Phone number is not valid (format +1-123-456-789)",
      }),
    emailAddress: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email")
      .max(50, { message: "Email cannot be more than 50 characters" }),

    subject: z
      .string()
      .min(1, { message: "Subject is required" })
      .max(50, { message: "Subject cannot be more than 50 characters" }),

    message: z
      .string()
      .min(1, { message: "Message is required" })
      .max(500, { message: "Message cannot be more than 500 characters" }),
  })
);

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Contacts`,
  description: `Allcon Contracting contact and office information.`,

  "og:title": "Allcon Contracting - Contacts",
  "og:type": "business",
  "og:site_name": "Allcon Contracting",
  "og:description": `Allcon Contracting contact and office information.`,
  "og:image":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "og:url": "https://allconcontracting.com/contacts",
});

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

export default function Locations() {
  return (
    <>
      <Container maxW={"1200px"} px={{ base: 3, md: 6 }} py={14}>
        <VStack spacing="26px">
          <Heading textAlign="center">Our Locations</Heading>
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
                <Tabs isFitted isLazy colorScheme="primary">
                  <TabList>
                    <Tab>New York Office</Tab>
                    <Tab>New Jersey Office</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel p={0} pt={6}>
                      <Tabs isLazy size="sm" variant="unstyled">
                        <TabList
                          gap={2}
                          justifyContent="center"
                          flexDirection={{ base: "column", xs: "row" }}
                        >
                          <Tab
                            w={{ base: "100%", sm: "8.6em" }}
                            fontWeight="semibold"
                            _selected={{ color: "white", bg: "primary.500" }}
                            rounded="md"
                            as={Button}
                            variant="solid"
                            rightIcon={<Icon h={5} w={5} as={BiMap} />}
                          >
                            Map View
                          </Tab>
                          <Tab
                            w={{ base: "100%", sm: "8.6em" }}
                            fontWeight="semibold"
                            _selected={{ color: "white", bg: "primary.500" }}
                            rounded="md"
                            as={Button}
                            variant="solid"
                            rightIcon={<Icon h={5} w={5} as={BiStreetView} />}
                          >
                            Street View
                          </Tab>
                        </TabList>

                        <TabPanels>
                          <TabPanel p={0} pt={2}>
                            <AspectRatio
                              ratio={{ base: 1, md: 16 / 9 }}
                              maxW="100%"
                            >
                              <iframe
                                title="Westbury Office Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.8116696361553!2d-73.56175772352869!3d40.75668893487772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c280cb33822bf3:0x68442c7cd931282c!2s66%20Brooklyn%20Ave,%20Westbury,%20NY%2011590!5e1!3m2!1sen!2sus!4v1669765457161!5m2!1sen!2sus"
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
                          </TabPanel>
                          <TabPanel p={0} pt={2}>
                            <AspectRatio
                              ratio={{ base: 1, md: 16 / 9 }}
                              maxW="100%"
                            >
                              <iframe
                                title="Westbury Office Street"
                                src="https://www.google.com/maps/embed?pb=!4v1669765886676!6m8!1m7!1sTcnxcY2Y2Lig8CJSThJlcQ!2m2!1d40.75661651754456!2d-73.55950228715!3f67.12134601477624!4f-4.0828521741744055!5f0.7820865974627469"
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
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </TabPanel>
                    <TabPanel p={0} pt={6}>
                      <Tabs
                        isLazy
                        size="sm"
                        // orientation="vertical"
                        variant="unstyled"
                      >
                        <TabList
                          gap={2}
                          justifyContent="center"
                          flexDirection={{ base: "column", xs: "row" }}
                        >
                          <Tab
                            w={{ base: "100%", sm: "8.6em" }}
                            fontWeight="semibold"
                            _selected={{ color: "white", bg: "primary.500" }}
                            rounded="md"
                            as={Button}
                            variant="solid"
                            rightIcon={<Icon h={5} w={5} as={BiMap} />}
                          >
                            Map View
                          </Tab>
                          <Tab
                            w={{ base: "100%", sm: "8.6em" }}
                            fontWeight="semibold"
                            _selected={{ color: "white", bg: "primary.500" }}
                            rounded="md"
                            as={Button}
                            variant="solid"
                            rightIcon={<Icon h={5} w={5} as={BiStreetView} />}
                          >
                            Street View
                          </Tab>
                        </TabList>

                        <TabPanels>
                          <TabPanel p={0} pt={2}>
                            <AspectRatio
                              ratio={{ base: 1, md: 16 / 9 }}
                              maxW="100%"
                            >
                              <iframe
                                title="Woodbridge Office Map"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3666.0322650324183!2d-74.29245454625772!3d40.570480486509716!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b43787c7a943%3A0x787f23130498f061!2s300%20Kimball%20St%2C%20Woodbridge%2C%20NJ%2007095!5e1!3m2!1sen!2sus!4v1669765966678!5m2!1sen!2sus"
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
                          </TabPanel>
                          <TabPanel p={0} pt={2}>
                            <AspectRatio
                              ratio={{ base: 1, md: 16 / 9 }}
                              maxW="100%"
                            >
                              <iframe
                                title="Woodbridge Office Street"
                                src="https://www.google.com/maps/embed?pb=!4v1669765851819!6m8!1m7!1sKD8qO05CQpv_gw7JaJeuJg!2m2!1d40.57073619981268!2d-74.29078223233066!3f159.0701538714232!4f-3.7724398134783144!5f0.7820865974627469"
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
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>
          </motion.div>
        </VStack>
      </Container>
    </>
  );
}
