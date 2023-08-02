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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import SoftBadge from "components/SoftBadge";

function DataTableBodyCell({ noBorder, align, children, url, badge }) {
  const { light } = colors;
  const { size } = typography;
  const { borderWidth } = borders;

  const renderCellContent = (content) => {
    if (url) {
      return (
        <a href={content} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }

    if (badge) {
      return (
        <SoftBadge 
          color={badge.color} 
          badgeContent={content}
        >
        </SoftBadge>
      );
    }
    return content;
  };

  return (
    <SoftBox
      component="td"
      textAlign={align}
      fontSize={size.sm}
      borderBottom={noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`}
      py={1.5}
      px={3}
    >
      <SoftBox
        display="inline-block"
        width="max-content"
        color="text"
        sx={{ verticalAlign: "middle" }}
      >
        {renderCellContent(children)}
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of DataTableBodyCell
DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: "left",
};

// Typechecking props for the DataTableBodyCell
DataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(["left", "right", "center"]),
};

export default DataTableBodyCell;
