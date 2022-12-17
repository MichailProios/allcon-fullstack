import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    "50": "#f1f9f9",
    "100": "#c8e6e6",
    "200": "#97d0d0",
    "300": "#5ab4b4",
    "400": "#35a3a3",
    "500": "#018b8b",
    "600": "#007676",
    "700": "#005f5f",
    "800": "#005050",
    "900": "#003a3a",
  },
};

const breakpoints = {
  xs: "20em",
  sm: "30em",
  smd: "38em",
  md: "48em",
  xmd: "52em",
  lg: "62em",
  xlg: "68em",
  xl: "80em",
  "2xl": "96em",
};

const config = {
  initialColorMode: "white",
};

const styles = {
  global: (props) => ({
    "html, body": {
      backgroundColor: props.colorMode === "dark" ? "gray.800" : "white",
    },
  }),
};

const theme = extendTheme({ config, colors, styles, breakpoints });

export default theme;
