/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import colors from "assets/theme/base/colors";


export default styled(LinearProgress)(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { color, value, variant } = ownerState;
  const { socialMediaColors } = colors;


  const { text, gradients } = palette;
  const { linearGradient } = functions;

  // background value
  let backgroundValue;

  if (variant === "gradient") {
    backgroundValue = socialMediaColors[color]
      ? linearGradient(socialMediaColors[color].main, socialMediaColors[color].dark)
      : linearGradient(socialMediaColors.info.main, socialMediaColors.info.dark);
  } else {
    backgroundValue = palette[color] ? palette[color].main : palette.info.main;
  }

  return {
    "& .MuiLinearProgress-bar": {
      background: backgroundValue,
      width: `${value}%`,
      color: text.main,
    },
  };
});
