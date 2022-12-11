import { useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  Checkbox,
  FormErrorMessage,
  Textarea,
  Divider,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SlideFade,
  HStack,
  Box,
  useBreakpointValue,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { SiLinkedin, SiMessenger, SiMicrosoft } from "react-icons/si";

import type { LoaderFunction } from "@remix-run/node";
import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import { redirect } from "@remix-run/node";
import { useWindowDimensions } from "~/utils/hooks";

// import * as auth from "app/utils/auth.server";
// import * as cookie from "app/utils/cookie.server";

import { Link, useActionData } from "@remix-run/react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const passwordRegex = new RegExp(
  "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=]).*$"
);

export const validator = withZod(
  z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),

    emailAddress: z
      .string()
      .min(1, { message: "Email Address is required" })
      .email("Must be a valid email")
      .trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message:
          "Password must contain at least one uppercase, one lowercase, one number, and one special character",
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must be at least 8 characters" })
      .regex(passwordRegex, {
        message:
          "Password must contain at least one uppercase, one lowercase, one number, and one special character",
      })
      .trim(),

    agreed: z.any(),
  })
);

export async function action({ request }: { request: Request }) {
  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const {
    firstName,
    lastName,
    emailAddress,
    password,
    confirmPassword,
    agreed,
  } = data.data;
}

export const loader: LoaderFunction = async ({ request }: any) => {
  return "";
};
function TextField(props: any) {
  const { error, getInputProps } = useField(props.name);
  const isSubmitting = useIsSubmitting();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <Input {...props} {...getInputProps()} isReadOnly={isSubmitting} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function PasswordTextField(props: any) {
  const { error, getInputProps } = useField(props.name);
  const isSubmitting = useIsSubmitting();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup size="md">
        <Input
          {...props}
          {...getInputProps()}
          isReadOnly={isSubmitting}
          type={"password"}
        />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function CheckBox(props: any) {
  const { getInputProps } = useField(props.name);
  const isSubmitting = useIsSubmitting();

  return (
    <Checkbox
      {...props}
      {...getInputProps()}
      value={"yes"}
      isReadOnly={isSubmitting}
    >
      {props.label}
    </Checkbox>
  );
}

function SubmitButton(props: any) {
  const isSubmitting = useIsSubmitting();
  const actionData = useActionData();

  return (
    <Button {...props} isLoading={isSubmitting} loadingText="Creating Account">
      {props.label}
    </Button>
  );
}
export default function Register() {
  const { height } = useWindowDimensions();

  const breakpointHeight = useBreakpointValue(
    { base: `calc(${height}px - 64px)`, md: "calc(100vh - 64px)" },
    { fallback: "md", ssr: true }
  );

  return (
    <Container maxW="7xl" p={{ base: 1, md: 6 }}>
      <Center
        as={ValidatedForm}
        validator={validator}
        method="post"
        id="registerForm"
        replace
      >
        <Stack spacing={4}>
          <VStack
            boxSize={{ base: "auto", xs: "xs", sm: "sm", md: "md" }}
            h="max-content !important"
            bg={useColorModeValue("white", "gray.700")}
            rounded="xl"
            boxShadow={"2xl"}
            p={{ base: 5, sm: 10 }}
            spacing={8}
          >
            <Stack align="center">
              <Heading fontSize="2xl">Create Account</Heading>
            </Stack>

            <ButtonGroup orientation="vertical" w="full">
              <Button w={"full"} variant={"solid"} leftIcon={<FcGoogle />}>
                Sign up with Gmail
              </Button>
              <Button w={"full"} variant={"solid"} leftIcon={<SiMicrosoft />}>
                Sign up with Microsoft
              </Button>
              <Button w={"full"} variant={"solid"} leftIcon={<FaFacebook />}>
                Sign up with Facebook
              </Button>
            </ButtonGroup>

            <Flex w="full" justifyContent="stretch" alignItems="center" gap={2}>
              <Divider w="full" />
              <Text>or</Text>
              <Divider w="full" />
            </Flex>
            <VStack spacing={4} w="100%">
              <Stack direction={{ base: "column", md: "row" }} w="100%">
                <TextField
                  label="First Name"
                  name="firstName"
                  placeholder="Enter your first name"
                  rounded="md"
                  type="text"
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter your last name"
                  rounded="md"
                  type="text"
                />
              </Stack>
              <TextField
                label="Email Address"
                name="emailAddress"
                placeholder="Enter your email"
                rounded="md"
                type="email"
              />

              <PasswordTextField
                label="Password"
                name="password"
                placeholder="Enter your password"
                rounded="md"
              />
            </VStack>
            <VStack w="100%" spacing={4}>
              <CheckBox
                type="checkbox"
                name="agreed"
                label=" Agree with Terms & Conditions"
              />

              <SubmitButton
                w="100%"
                colorScheme="primary"
                label="Create Account"
                type="submit"
              />
              <Text>
                Already have an account?&nbsp;
                <Text
                  as={Link}
                  to="/login"
                  fontSize={{ base: "md", sm: "md" }}
                  fontWeight="bold"
                  _hover={{ textDecoration: "underline" }}
                >
                  Sign In
                </Text>
              </Text>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
  );
}
