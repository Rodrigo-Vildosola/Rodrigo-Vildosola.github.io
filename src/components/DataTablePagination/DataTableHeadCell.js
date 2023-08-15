/**
=========================================================
* Soft UI Dashboard PRO React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

function DataTableHeadCell({
  width,
  children,
  sorted,
  align,
  render,
  position,
  ...rest
}) {
  const { light } = colors;
  const { borderWidth } = borders;

  return (
    <SoftBox
      component='th'
      width={width}
      borderBottom={`${borderWidth[1]} solid ${light.main}`}
      position={position}
      style={{ background: position === "sticky" ? "#3dc7fd" : "transparent" }}
      left={position == "sticky" ? 0 : "auto"}
      zIndex={position === "sticky" ? 99 : "auto"}
      py={1.5}
      px={3}
    >
      <SoftBox
        {...rest}
        position='relative'
        textAlign={align}
        color='white'
        opacity={0.7}
        sx={({ typography: { size, fontWeightBold } }) => ({
          fontSize: size.xxs,
          fontWeight: fontWeightBold,
          textTransform: "uppercase",
          cursor: sorted && "pointer",
          userSelect: sorted && "none",
        })}
      >
        {children}
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of DataTableHeadCell
DataTableHeadCell.defaultProps = {
  width: "auto",
  sorted: "none",
  align: "left",
};

// Typechecking props for the DataTableHeadCell
DataTableHeadCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  sorted: PropTypes.oneOf([false, "none", "asce", "desc"]),
  align: PropTypes.oneOf(["left", "right", "center"]),
};

export default DataTableHeadCell;
