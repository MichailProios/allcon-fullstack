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
  Flex,
  Text,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  SlideFade,
  Checkbox,
  ButtonGroup,
  Divider,
  Card,
  Icon,
  useClipboard,
  useToast,
  Box,
  CardBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  AspectRatio,
  HStack,
} from "@chakra-ui/react";
import { useActionData } from "@remix-run/react";
import { useEffect } from "react";

import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import type { MetaFunction } from "@remix-run/node";
import { PhoneIcon } from "@chakra-ui/icons";
import { FaFax, FaLinkedin } from "react-icons/fa";

import * as mailer from "~/utils/email.server";
import { BiSend, BiMap, BiStreetView } from "react-icons/bi";

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
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/c71596c6-7bae-47c7-e4fa-868ba422a600/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/c71596c6-7bae-47c7-e4fa-868ba422a600/meta",
  "og:url": "https://allconcontracting.com/contacts",
});

export async function action({ request }: { request: Request }) {
  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const { fullName, emailAddress, phoneNumber, subject, message } = data.data;

  try {
    await mailer.sendEmail({
      fullName,
      emailAddress,
      phoneNumber,
      subject,
      message,
    });

    return "success";
  } catch (error) {
    console.error(error);
    return "error";
  }
}

function TextField(props: any) {
  const { error, getInputProps } = useField(props.name);
  const actionData = useActionData();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <Input
        {...props}
        {...getInputProps()}
        disabled={actionData === "success"}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function TextArea(props: any) {
  const { error, getInputProps } = useField(props.name);
  const actionData = useActionData();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <Textarea
        {...props}
        {...getInputProps()}
        disabled={actionData === "success"}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function SubmitButton(props: any) {
  const isSubmitting = useIsSubmitting();
  const actionData = useActionData();

  return (
    <Button
      {...props}
      isLoading={isSubmitting}
      loadingText="Sending"
      disabled={actionData === "success" || isSubmitting}
      w="200px"
      rightIcon={<Icon h={5} w={5} as={BiSend} />}
    >
      {props.label}
    </Button>
  );
}

export default function Contacts() {
  const actionData = useActionData();

  const { onCopy } = useClipboard("+1-516-333-3344");
  const toast = useToast();

  useEffect(() => {
    if (actionData === "success") {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you shortly.",
        status: "success",
      });
    } else if (actionData === "error") {
      toast({
        title: "Message Failed to Send.",
        description: "Please try again.",
        status: "error",
      });
    }
  }, [actionData, toast]);

  return (
    <SlideFade in={true} reverse delay={0.1}>
      <Container
        maxW={"1200px"}
        px={{ base: 6, md: 10 }}
        py={14}
        as={ValidatedForm}
        validator={validator}
        method="post"
        resetAfterSubmit={actionData !== "success"}
        id="contactForm"
      >
        <VStack spacing="26px">
          <Heading textAlign="center">Contact Us</Heading>
          <Stack spacing={10} w="full">
            <VStack
              spacing={8}
              w="100%"
              bg={useColorModeValue("white", "gray.700")}
              rounded="lg"
              boxShadow="lg"
              p={{ base: 5, sm: 10 }}
            >
              <VStack spacing={6} w="full">
                <Stack
                  w="100%"
                  spacing={3}
                  direction={{ base: "column", md: "row" }}
                >
                  <TextField
                    label="Name"
                    name="fullName"
                    placeholder="Enter your full name"
                    rounded="md"
                    type="text"
                  />
                  <TextField
                    label="Email"
                    type="email"
                    name="emailAddress"
                    placeholder="Enter your email address"
                    rounded="md"
                  />
                  <TextField
                    label="Phone Number"
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    rounded="md"
                  />
                </Stack>

                <TextField
                  label="Subject"
                  type="text"
                  name="subject"
                  placeholder="Enter the subject"
                  rounded="md"
                />

                <TextArea
                  label="Message"
                  type="text"
                  size="lg"
                  name="message"
                  placeholder="Enter your message"
                  rounded="md"
                />
                <VStack spacing={3} w="full">
                  <SubmitButton
                    type="submit"
                    colorScheme="primary"
                    label="Send Message"
                  />
                  <HStack w="full">
                    <Divider />
                    <Text userSelect="none">or</Text>
                    <Divider />
                  </HStack>
                  <Stack direction={{ base: "column", md: "row" }}>
                    <Button
                      rightIcon={<PhoneIcon />}
                      onClick={() => window.open("tel:+1-516-333-3339")}
                      w="200px"
                    >
                      +1-516-333-3339
                    </Button>
                    {/* <Button
                      onClick={() => {
                        onCopy();
                        toast({
                          title: "Fax number copied to clipboard.",
                          // description: "We've created your account for you.",
                          status: "success",
                          duration: 3000,
                        });
                      }}
                      rightIcon={<Icon as={FaFax} />}
                      w="200px"
                    >
                      Fax +1-516-333-3339
                    </Button> */}
                    {/* <Button
                      onClick={() =>
                        window.open(
                          "https://www.linkedin.com/company/allcon-contracting"
                        )
                      }
                      rightIcon={<Icon as={FaLinkedin} />}
                      w="200px"
                    >
                      Allcon LinkedIn
                    </Button> */}
                  </Stack>
                </VStack>
              </VStack>
            </VStack>
          </Stack>
        </VStack>
      </Container>
      <Divider />
      <Container maxW={"1200px"} px={{ base: 6, md: 10 }} py={14}>
        <VStack spacing="26px">
          <Heading textAlign="center">Office Locations</Heading>
          <Card rounded="md" boxShadow="xl" w={"full"}>
            <CardBody>
              <Tabs isFitted isLazy colorScheme="primary">
                <TabList>
                  <Tab>New York Office</Tab>
                  <Tab>New Jersey Office</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel p={0} pt={6}>
                    <Tabs
                      // isFitted
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
                          w={{ base: "100%", md: "8.6em" }}
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
                          w={{ base: "100%", md: "8.6em" }}
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
                          w={{ base: "100%", md: "8.6em" }}
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
                          w={{ base: "100%", md: "8.6em" }}
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
        </VStack>
      </Container>
    </SlideFade>
  );
}
