import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import theme from "../../theme";

const AppWrapper = styled(Grid)(() => ({
  padding: "0 9px",
  [theme.breakpoints.up("md")]: {
    padding: "0 120px",
  },
}));

const LoaderContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  flex: 1,
}));

export { AppWrapper, LoaderContainer };
