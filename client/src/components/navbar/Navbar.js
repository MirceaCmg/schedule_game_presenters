import * as React from "react";
import {
  DividerItem,
  ItemsContainer,
  MenuItem,
  MenuItems,
  NavbarWrapper,
} from "./Navbar.style";
import AppButton from "../common/AppButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/user";
import useMobileResolution from "../../utils/mobileResolution";
import { Button } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const isMobileResolution = useMobileResolution();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <NavbarWrapper>
      {isMobileResolution ? (
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Menu
          </Button>
          <MenuItems
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onCick={handleClose} to="/">
              Schedule
            </MenuItem>
            <DividerItem />
            <MenuItem onCick={handleClose} to="/tables">
              Tables
            </MenuItem>
            <DividerItem />
            <MenuItem onCick={handleClose} to="/presenters">
              Presenters
            </MenuItem>
          </MenuItems>
        </div>
      ) : (
        <ItemsContainer>
          <MenuItem to="/">Schedule</MenuItem>
          <MenuItem to="/tables">Tables</MenuItem>
          <MenuItem to="/presenters">Presenters</MenuItem>
        </ItemsContainer>
      )}

      {user ? (
        <AppButton onClick={handleLogout} title="Logout" />
      ) : (
        <AppButton onClick={() => navigate("/login")} title="Login" />
      )}
    </NavbarWrapper>
  );
};

export default Navbar;
