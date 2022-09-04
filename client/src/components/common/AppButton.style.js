import { styled } from "@mui/system";
import { Button } from "@mui/material";
import theme from "../../theme";

const StyledButton = styled(Button)(() => ({
  textTransform: "inherit",
  padding: "5px 10px",
  background: theme.palette.primary.main,
  color: theme.palette.primary.white,
  fontWeight: "bold",
  fontSize: 16,
  border: `1px solid ${theme.palette.primary.main}`,
  "&:hover": {
    background: theme.palette.primary.white,
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.up("md")]: {
    padding: "5px 10px",
  },
}));

export { StyledButton };
