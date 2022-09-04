import { createTheme } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A12515",
      white: "#fff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
