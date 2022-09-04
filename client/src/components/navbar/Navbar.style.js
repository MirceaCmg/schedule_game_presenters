import { Divider, Grid, Menu, styled } from "@mui/material";
import { Link } from "react-router-dom";
import theme from "../../theme";

export const ItemsContainer = styled(Grid)({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: 60,
  width: "60%",
});

export const NavbarWrapper = styled(Grid)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 60,
  background: theme.palette.primary.main,
  boxShadow: "0 4px 2px -2px rgba(3, 22, 52, 0.1)",
  marginBottom: 40,
  padding: 0,
  "> div > .MuiButtonBase-root": {
    color: theme.palette.primary.white,
    fontWeight: "bold",
  },
  [theme.breakpoints.up("md")]: {
    padding: "0 50px",
  },
});

export const MenuItem = styled(Link)({
  color: theme.palette.primary.white,
  textDecoration: "none",
});

export const DividerItem = styled(Divider)({
  color: theme.palette.primary.main,
  margin: "5px 0",
});

export const MenuItems = styled(Menu)({
  "& .MuiPaper-root > ul": {
    display: "flex",
    flexDirection: "column",
    width: 100,
    padding: 15,
    "> a": {
      color: theme.palette.primary.main,
    },
  },
});
