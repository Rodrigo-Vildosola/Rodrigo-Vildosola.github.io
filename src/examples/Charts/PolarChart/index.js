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

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { PolarArea } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// PolarChart configurations
import configs from "examples/Charts/PolarChart/configs";

function PolarChart({ title, description, chart }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  const renderChart = (
    <SoftBox p={0} >
      {useMemo(
        () => (
          <SoftBox 
            p={0} 
            variant="gradient"
            bgColor="cool"
            style={{
 
              borderRadius: "75px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <PolarArea data={data} options={options} />
          </SoftBox>
        ),
        [chart]
      )}
    </SoftBox>
  );

  return title || description ? renderChart : renderChart;
}

// Setting default values for the props of PolarChart
PolarChart.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the PolarChart
PolarChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default PolarChart;
