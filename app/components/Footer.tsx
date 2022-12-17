import {
  Box,
  chakra,
  Container,
  Divider,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Skeleton,
  Image,
} from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";
import type { ReactNode } from "react";
import { Link } from "@remix-run/react";

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
    <>
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
          <Link to="/" draggable={false}>
            <Image
              h={10}
              src={logo_small}
              loading="eager"
              draggable={false}
              alt="Footer Logo"
              fallback={<Skeleton w="full" h="full" />}
            />{" "}
          </Link>
          <Text textAlign="center" w="100%">
            <>
              © {new Date().getFullYear()} Allcon Contracting Corp. All rights
              reserved
            </>
          </Text>

          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"LinkedIn"}
              href={"https://www.linkedin.com/company/allcon-contracting"}
            >
              <FaLinkedin />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
