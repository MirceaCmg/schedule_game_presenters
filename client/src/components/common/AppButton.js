import React from "react";
import { StyledButton } from "./AppButton.style";

/**
 * Application button component.
 * @param {object}
 */
function AppButton({ onClick, title }) {
  return (
    <>
      <StyledButton onClick={onClick}>{title}</StyledButton>
    </>
  );
}

export default AppButton;
