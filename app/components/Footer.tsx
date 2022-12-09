import {
  Box,
  chakra,
  Container,
  Divider,
  Fade,
  Img,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VisuallyHidden,
  Button,
  SimpleGrid,
  Flex,
  SlideFade,
} from "@chakra-ui/react";
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import type { ReactNode } from "react";
// import {  } from "react-scroll";
import { Link } from "@remix-run/react";
import { BiMessage } from "react-icons/bi";

const logo_small =
  "https://imagedelivery.net/pOMYaxY9FUVJceQstM4HuQ/fa4b2f8e-d107-45eb-e36d-adbb14f13a00/meta";

const SocialButton = ({
  children,
  label,
  href,
  internal,
}: {
  children: ReactNode;
  label: string;
  href: string;
  internal?: boolean;
}) => {
  if (internal) {
    return (
      <chakra.button
        bg={"blackAlpha.100"}
        _dark={{ bg: "whiteAlpha.100" }}
        rounded={"full"}
        w={8}
        h={8}
        cursor={"pointer"}
        display={"inline-flex"}
        alignItems={"center"}
        justifyContent={"center"}
        transition={"background 0.3s ease"}
        _hover={{
          bg: "blackAlpha.200",
          _dark: { bg: "whiteAlpha.200" },
        }}
        as={Link}
        to={href}
        // prefetch="render"
        // rel="prefetch"
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  } else
    return (
      <chakra.button
        bg={"blackAlpha.100"}
        _dark={{ bg: "whiteAlpha.100" }}
        rounded={"full"}
        w={8}
        h={8}
        cursor={"pointer"}
        display={"inline-flex"}
        alignItems={"center"}
        justifyContent={"center"}
        transition={"background 0.3s ease"}
        _hover={{
          bg: "blackAlpha.200",
          _dark: { bg: "whiteAlpha.200" },
        }}
        onClick={() => window.open(href)}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
};

export default function SmallCentered() {
  return (
    <SlideFade in={true} delay={0.1}>
      <Divider />
      <Box color={useColorModeValue("gray.700", "gray.200")}>
        <Container
          as={Stack}
          maxW={"1200px"}
          py={4}
          spacing={4}
          direction={{ base: "column", md: "row" }}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Img h={10} src={logo_small} loading="lazy" draggable={false} />
          <Text textAlign="center" w="100%">
            <>
              © {new Date().getFullYear()} Allcon Contracting. All rights
              reserved
            </>
          </Text>

          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Message"} href={"/contacts"} internal>
              <BiMessage />
            </SocialButton>

            <SocialButton
              label={"LinkedIn"}
              href={"https://www.linkedin.com/company/allcon-contracting"}
            >
              <FaLinkedin />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </SlideFade>
  );
}
