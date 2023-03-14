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
  CardFooter,
  Text,
} from "@chakra-ui/react";
import { Link, useActionData } from "@remix-run/react";
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
import { ArrowForwardIcon } from "@chakra-ui/icons";

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
  title: `Allcon Contracting - Connect`,
  description: `Allcon Contracting contact and office information.`,

  "og:title": "Allcon Contracting - Connect",
  "og:type": "business",
  "og:site_name": "Allcon Contracting",
  "og:description": `Allcon Contracting contact and office information.`,
  "og:image":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
  "twitter:card":
    "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/meta",
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

export default function Index() {
  const actionData = useActionData();
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
    <>
      <Container
        maxW={"1100px"}
        px={{ base: 3, md: 6 }}
        py={14}
        as={ValidatedForm}
        validator={validator}
        method="post"
        resetAfterSubmit={actionData !== "success"}
        id="contactForm"
      >
        <VStack spacing="26px">
          <Heading textAlign="center">Connect with Us</Heading>

          <Stack spacing={10} w="full">
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
              {" "}
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
                  <SubmitButton
                    type="submit"
                    colorScheme="primary"
                    label="Send Message"
                  />
                </VStack>
              </VStack>
            </motion.div>
          </Stack>
        </VStack>
      </Container>
      <Divider />
      <Container maxW={"1100px"} px={{ base: 3, md: 6 }} py={14}>
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
          <Stack
            direction={{ base: "column", xmd: "row" }}
            spacing={4}
            w="full"
          >
            <motion.div
              // whileHover={{ y: -5 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
              style={{ width: "100%" }}
            >
              <Card
                variant="elevated"
                rounded="md"
                boxShadow="xl"
                w="full"
                // as={Link}
                // to={"/contacts/opportunities"}
                draggable={false}
                _dark={{ color: "gray.400" }}
                color="gray.300"
              >
                <CardFooter
                  w="full"
                  p={4}
                  m={0}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing="1">
                    <Heading size="md">Career Opportunities</Heading>
                    <Text>Join our team</Text>
                  </Stack>
                  <ArrowForwardIcon />
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
              style={{ width: "100%" }}
            >
              <Card
                variant="elevated"
                rounded="md"
                boxShadow="xl"
                w="full"
                as={Link}
                to={"/contacts/locations"}
                draggable={false}
              >
                <CardFooter
                  w="full"
                  p={4}
                  m={0}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing="1">
                    <Heading size="md">Our Locations</Heading>
                    <Text>View our locations</Text>
                  </Stack>
                  <ArrowForwardIcon />
                </CardFooter>
              </Card>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>
    </>
  );
}
