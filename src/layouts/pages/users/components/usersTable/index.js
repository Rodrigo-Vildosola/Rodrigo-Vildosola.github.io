import { useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Table({ rows }) {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const columns = [
    { name: "Name", align: "left" },
    { name: "Email", align: "left" },
  ];

  const renderColumns = columns.map(({ name, align, width }) => {
    return (
      <SoftBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? 3 : 3}
        pr={align === "right" ? 3 : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {name.toUpperCase()}
      </SoftBox>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;

    const nameCell = (
      <SoftBox
        key={uuidv4()}
        component="td"
        p={1}
        textAlign="left"
        borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
      >
        <SoftTypography
          variant="button"
          fontWeight="regular"
          color="secondary"
          sx={{ display: "inline-block", width: "max-content" }}
        >
          {row.first_name}
        </SoftTypography>
      </SoftBox>
    );

    const emailCell = (
      <SoftBox
        key={uuidv4()}
        component="td"
        p={1}
        textAlign="left"
        borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
      >
        <SoftTypography
          variant="button"
          fontWeight="regular"
          color="secondary"
          sx={{ display: "inline-block", width: "max-content" }}
        >
          {row.email}
        </SoftTypography>
      </SoftBox>
    );

    return <TableRow key={rowKey}>{[nameCell, emailCell]}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <SoftBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </SoftBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [rows]
  );
}

// Typechecking props for the Table
Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
