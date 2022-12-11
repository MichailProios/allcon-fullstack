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

export const validator = withZod(
  z.object({
    emailAddress: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),

    remember: z.any(),
  })
);

export async function action({ request }: { request: Request }) {
  const data = await validator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const { emailAddress, password, remember } = data.data;
}

export const loader: LoaderFunction = async ({ request }: any) => {
  return "";
};

function EmailTextField(props: any) {
  const { error, getInputProps } = useField(props.name);
  const isSubmitting = useIsSubmitting();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <Input {...props} {...getInputProps()} readOnly={isSubmitting} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

function PasswordTextField(props: any) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { error, getInputProps } = useField(props.name);
  const isSubmitting = useIsSubmitting();

  return (
    <FormControl id={props.name} isInvalid={error ? true : false}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup size="md">
        <Input
          {...props}
          {...getInputProps()}
          readOnly={isSubmitting}
          type={show ? "text" : "password"}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            rounded="md"
            bg={useColorModeValue("gray.300", "gray.700")}
            _hover={{
              bg: useColorModeValue("gray.400", "gray.800"),
            }}
            disabled={isSubmitting}
            onClick={handleClick}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
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
      readOnly={isSubmitting}
    >
      {props.label}
    </Checkbox>
  );
}

export default function Register() {
  const { height } = useWindowDimensions();

  const breakpointHeight = useBreakpointValue(
    { base: `calc(${height}px - 64px)`, md: "calc(100vh - 64px)" },
    { fallback: "md", ssr: true }
  );

  function SubmitButton(props: any) {
    const isSubmitting = useIsSubmitting();

    return (
      <Button {...props} isLoading={isSubmitting} loadingText="Signing In">
        {props.label}
      </Button>
    );
  }
  return (
    // <Box
    //   bgImage="https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/60f073c3-a567-471e-9bc6-9096dcc65500/hq"
    //   bgRepeat="no-repeat"
    //   bgPos="center"
    //   bgSize="cover"
    //   h={breakpointHeight}
    // >
    <Container maxW="7xl" p={{ base: 1, md: 10 }}>
      <Center
        as={ValidatedForm}
        validator={validator}
        method="post"
        id="loginForm"
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
              <Heading fontSize="2xl">Sign In</Heading>
            </Stack>

            <ButtonGroup orientation="vertical" w="full">
              <Button w={"full"} variant={"solid"} leftIcon={<FcGoogle />}>
                Continue with Gmail
              </Button>
              <Button w={"full"} variant={"solid"} leftIcon={<SiMicrosoft />}>
                Continue with Microsoft
              </Button>
              <Button w={"full"} variant={"solid"} leftIcon={<FaFacebook />}>
                Continue with Facebook
              </Button>
            </ButtonGroup>

            <Flex w="full" justifyContent="stretch" alignItems="center" gap={2}>
              <Divider w="full" />
              <Text>or</Text>
              <Divider w="full" />
            </Flex>

            <VStack spacing={4} w="100%">
              <EmailTextField
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

              {/* {actionData?.res && (
                  <Alert status="error" rounded="md">
                    <AlertIcon />
                    <AlertTitle>{actionData?.res?.message}</AlertTitle>
                  </Alert>
                )}

                {verificationStatus && (
                  <Alert status="success" rounded="md">
                    <AlertIcon />
                    <AlertTitle>
                      Account verification successful! Please login with your
                      credentials.
                    </AlertTitle>
                  </Alert>
                )} */}
            </VStack>
            <VStack w="100%" spacing={4}>
              <Stack direction="row" justify="space-between" w="100%">
                <CheckBox type="checkbox" name="remember" label="Remember me" />
                <Text
                  as={Link}
                  to="/forgot"
                  fontSize={{ base: "md", sm: "md" }}
                  _hover={{ textDecoration: "underline" }}
                >
                  Forgot Password?
                </Text>
              </Stack>

              <SubmitButton
                w="100%"
                colorScheme="primary"
                label="Sign In"
                type="submit"
              />

              <Text>
                Don't have an account?&nbsp;
                <Text
                  as={Link}
                  to="/register"
                  fontSize={{ base: "md", sm: "md" }}
                  fontWeight="bold"
                  _hover={{ textDecoration: "underline" }}
                >
                  Register
                </Text>
              </Text>
            </VStack>
          </VStack>
        </Stack>
      </Center>
    </Container>
    // </Box>
  );
}
