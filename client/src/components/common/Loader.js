import React from "react";
import { LoaderContainer } from "./shared.style";
import { CircularProgress } from "@mui/material";

/**
 * LoadingSpinner
 * @return {JSX.Element}
 * @constructor
 */
const LoadingSpinner = () => {
  return (
    <LoaderContainer>
      <CircularProgress color="primary" />
    </LoaderContainer>
  );
};

export default LoadingSpinner;
