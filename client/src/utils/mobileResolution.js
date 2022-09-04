import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "../theme";

/**
 * Simple hook that returns true if we are on a mobile resolution
 * @return {boolean}
 */
const useMobileResolution = () => {
  // const breakPoint = theme.breakpoints.down("sm");
  return useMediaQuery(theme.breakpoints.down("sm"));
};

export default useMobileResolution;
