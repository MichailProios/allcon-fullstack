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

import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { MetaFunction } from "@remix-run/node";
import { PhoneIcon } from "@chakra-ui/icons";
import { FaFax, FaLinkedin } from "react-icons/fa";

import { BiSend, BiMap, BiStreetView } from "react-icons/bi";
// import { ses } from "app/utils/email.server";
// import { EmailSubscribers } from "~/utils/db.server";
// import { db } from "app/utils/db.server";

export const validator = withZod(
  z.object({
    fullName: z
      .string()
      .min(1, { message: "Full Name is required" })
      .max(20, { message: "Full Name cannot be more than 20 characters" }),

    emailAddress: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email")
      .max(50, { message: "Email cannot be more than 50 characters" }),

    subject: z
      .string()
      .min(1, { message: "Subject is required" })
      .max(50, { message: "Subject cannot be more than 50 characters" }),

    body: z
      .string()
      .min(1, { message: "Body is required" })
      .max(500, { message: "Subject cannot be more than 500 characters" }),
  })
);

export const meta: MetaFunction = ({ params }: any) => ({
  title: `Allcon Contracting - Contacts`,
  description: `Allcon Contracting contact information and `,
});

export async function action({ request }: { request: Request }) {
  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const { fullName, emailAddress, subject, body } = data.data;

  try {
    // if (subscribe) {
    //   const exists = await EmailSubscribers.query("EmailAddress")
    //     .eq(emailAddress)
    //     .exec();

    //   if (!exists[0]) {
    //     await EmailSubscribers.create({ EmailAddress: emailAddress });
    //   }
    // }

    // await ses.sendEmail({
    //   Destination: {
    //     ToAddresses: ["mproios@eucrona.com"],
    //   },
    //   Message: {
    //     Body: {
    //       Text: { Data: body },
    //     },

    //     Subject: { Data: `New inquiry ${fullName} - ${subject}` },
    //   },
    //   Source: "inquiries@eucrona.com",
    // });

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

function CheckBox(props: any) {
  const { getInputProps } = useField(props.name);
  const actionData = useActionData();

  return (
    <Checkbox
      {...props}
      {...getInputProps()}
      defaultChecked
      value={"yes"}
      disabled={actionData === "success"}
    >
      {props.label}
    </Checkbox>
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
      leftIcon={<Icon h={5} w={5} as={BiSend} />}
    >
      {props.label}
    </Button>
  );
}

export default function Contacts() {
  const actionData = useActionData();

  const { onCopy } = useClipboard("+1-516-333-3344");
  const toast = useToast();

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
                  name="body"
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
                      leftIcon={<PhoneIcon />}
                      onClick={() => window.open("tel:+1-516-333-3339")}
                    >
                      Call +1-516-333-3339
                    </Button>
                    <Button
                      onClick={() => {
                        onCopy();
                        toast({
                          title: "Fax number copied to clipboard.",
                          // description: "We've created your account for you.",
                          status: "success",
                          duration: 3000,
                        });
                      }}
                      leftIcon={<Icon as={FaFax} />}
                    >
                      Fax +1-516-333-3339
                    </Button>
                    <Button
                      onClick={() =>
                        window.open(
                          "https://www.linkedin.com/company/allcon-contracting"
                        )
                      }
                      leftIcon={<Icon as={FaLinkedin} />}
                    >
                      View Allcon LinkedIn
                    </Button>
                  </Stack>
                </VStack>
              </VStack>
            </VStack>
          </Stack>
        </VStack>
      </Container>
      <Divider />
      <Container maxW={"1400px"} px={{ base: 6, md: 10 }} py={14}>
        <VStack spacing="26px">
          <Heading textAlign="center">Office Locations</Heading>
          <Card rounded="md" boxShadow="xl" w={"full"}>
            <CardBody>
              <Tabs isFitted isLazy colorScheme="primary">
                <TabList>
                  <Tab>66 Brooklyn Ave, Westbury, New York 11590</Tab>
                  <Tab>300 Kimball St #204b, Woodbridge, New Jersey 07095</Tab>
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
                      <TabList gap={2} justifyContent="center">
                        <Tab
                          w={{ base: "100%", sm: "8em" }}
                          fontWeight="semibold"
                          _selected={{ bg: "primary.300" }}
                          rounded="md"
                          as={Button}
                          variant="solid"
                          leftIcon={<Icon h={5} w={5} as={BiMap} />}
                        >
                          Map View
                        </Tab>
                        <Tab
                          w={{ base: "100%", sm: "8em" }}
                          fontWeight="semibold"
                          _selected={{ bg: "primary.300" }}
                          rounded="md"
                          as={Button}
                          variant="solid"
                          leftIcon={<Icon h={5} w={5} as={BiStreetView} />}
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
                      <TabList gap={2} justifyContent="center">
                        <Tab
                          w={{ base: "100%", sm: "8em" }}
                          fontWeight="semibold"
                          _selected={{ bg: "primary.300" }}
                          rounded="md"
                          as={Button}
                          variant="solid"
                          leftIcon={<Icon h={5} w={5} as={BiMap} />}
                        >
                          Map View
                        </Tab>
                        <Tab
                          w={{ base: "100%", sm: "8em" }}
                          fontWeight="semibold"
                          _selected={{ bg: "primary.300" }}
                          rounded="md"
                          as={Button}
                          variant="solid"
                          leftIcon={<Icon h={5} w={5} as={BiStreetView} />}
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
