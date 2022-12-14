import { useState, useEffect } from "react";
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
  useToast,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { SiMicrosoftazure } from "react-icons/si";
import { redirect, json } from "@remix-run/node";

import { createServerClient } from "~/utils/supabase.server";
import type { SupabaseClient } from "@supabase/auth-helpers-remix";
import type { Database } from "~/utils/db_types";
import type { LoaderFunction } from "@remix-run/node";
import {
  ValidatedForm,
  validationError,
  useIsSubmitting,
  useField,
} from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

// import * as auth from "app/utils/auth.server";
// import * as cookie from "app/utils/cookie.server";

import { Link, useActionData, useOutletContext } from "@remix-run/react";
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

    agreed: z.any(),
  })
);

export async function action({ request }: { request: Request }) {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const { firstName, lastName, emailAddress, password, agreed } = data.data;

  const { error } = await supabase.auth.signUp({
    email: emailAddress,
    password: password,
    options: {
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    },
  });

  if (error) {
    return json(
      { error: error.message },
      {
        headers: response.headers,
      }
    );
  }

  return json({ success: "registered" }, { headers: response.headers });
}

export const loader: LoaderFunction = async ({ request }: any) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/resources", {
      headers: response.headers,
    });
  } else {
    return json(
      { session },
      {
        headers: response.headers,
      }
    );
  }
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
  const actionData = useActionData();
  const toast = useToast();
  const { supabase } = useOutletContext<{
    supabase: SupabaseClient<Database>;
  }>();

  async function handleGoogleAuth() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          process.env.NODE_ENV === "development"
            ? "http://192.168.1.62:3000/resources"
            : "https://allconcontracting.com/resources",
      },
    });

    if (error) {
      console.log(error);
    }
  }

  async function handleMicrosoftAuth() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo:
          process.env.NODE_ENV === "development"
            ? "http://192.168.1.62:3000/resources"
            : "https://allconcontracting.com/resources",

        scopes: "email",
      },
    });

    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (actionData?.error) {
      toast({
        title: actionData?.error,
        variant: "solid",
        status: "error",
        duration: 3000,
        isClosable: true,
        // position: "top-right",
        // containerStyle: {
        // mt: "80px",
        // mr: "10px",
        // },
      });
    } else if (actionData?.success) {
      toast({
        title: "Registered & Signed In Successfully",
        // description: "Check your email to confirm your identity",
        variant: "solid",
        status: "success",
        duration: 3000,
        isClosable: true,
        // position: "top-right",
        // containerStyle: {
        // mt: "80px",
        // mr: "10px",
        // },
      });
    }
  }, [actionData, toast]);

  return (
    <SlideFade in={true} unmountOnExit reverse delay={0.1}>
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
              spacing={4}
            >
              <Stack align="center">
                <Heading fontSize="2xl">Create Account</Heading>
              </Stack>

              <ButtonGroup orientation="vertical" w="full">
                <Button
                  w={"full"}
                  variant={"solid"}
                  leftIcon={<FcGoogle />}
                  onClick={handleGoogleAuth}
                >
                  Sign Up with Gmail
                </Button>
                <Button
                  w={"full"}
                  variant={"solid"}
                  leftIcon={<SiMicrosoftazure color="#0078D4" />}
                  onClick={handleMicrosoftAuth}
                >
                  Sign Up with Microsoft
                </Button>
              </ButtonGroup>

              <Flex
                w="full"
                justifyContent="stretch"
                alignItems="center"
                gap={2}
              >
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
    </SlideFade>
  );
}
