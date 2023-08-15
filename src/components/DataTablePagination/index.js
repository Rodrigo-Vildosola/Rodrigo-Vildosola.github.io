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

import { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";
import SoftPagination from "components/SoftPagination";

// Soft UI Dashboard PRO React example components
import DataTableHeadCell from "./DataTableHeadCell";
import DataTableBodyCell from "./DataTableBodyCell";
import { width } from "@mui/system";
import { Grid } from "@mui/material";
import SoftButton from "components/SoftButton";

function DataTable({
  canNext,
  canPrev,
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  changePage,
  pageSize,
  setPageSize,
  page,
  totalEntries,
}) {
  return (
    <TableContainer sx={{ boxShadow: "none" }} className={"custom-scroll"}>
      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={4} md={2}>
          <SoftTypography
            variant='button'
            color='secondary'
            fontWeight='regular'
          >
            Entradas por página
          </SoftTypography>
          <SoftSelect
            options={[5, 10, 15, 20, 25, 30, 35, 40].map((entry) => ({
              value: entry,
              label: entry,
            }))}
            option={pageSize}
            onChange={(e) => setPageSize(e.value)}
            size='small'
          />
        </Grid>
      </Grid>

      <Table>
        <SoftBox
          bgColor={"info"}
          variant={"gradient"}
          color='white'
          component='thead'
        >
          <TableRow>
            {table.columns.map((column, index) => {
              return (
                <DataTableHeadCell
                  key={index}
                  position={index == 0 ? "sticky" : ""}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  render={column.name}
                >
                  {column.Header}
                </DataTableHeadCell>
              );
            })}
          </TableRow>
        </SoftBox>
        <TableBody>
          {table.rows.map((row, key) => {
            return (
              <TableRow key={key}>
                {table.columns.map((column, index) => {
                  return (
                    <DataTableBodyCell
                      key={index}
                      width={column.width ? column.width : "auto"}
                      position={index == 0 ? "sticky" : ""}
                      align={column.align ? column.align : "left"}
                    >
                      {row[column.accessor]}
                    </DataTableBodyCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <SoftBox
        display='flex'
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent='space-between'
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        {showTotalEntries && (
          <SoftBox mb={{ xs: 3, sm: 0 }}>
            <SoftTypography
              variant='button'
              color='secondary'
              fontWeight='regular'
            ></SoftTypography>
          </SoftBox>
        )}
        <SoftPagination
          variant={pagination.variant ? pagination.variant : "gradient"}
          color={pagination.color ? pagination.color : "info"}
        >
          {canPrev && (
            <SoftPagination item onClick={() => changePage(page - 1)}>
              <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
            </SoftPagination>
          )}
          <SoftBox width='5rem' mx={1}>
            <SoftInput
              inputProps={{ type: "number", min: 1, max: 3 }}
              value={page}
              onChange={(e) => changePage(e.target.value)}
            />
          </SoftBox>
          {canNext && (
            <SoftPagination item onClick={() => changePage(parseInt(page) + 1)}>
              <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
            </SoftPagination>
          )}
        </SoftPagination>
      </SoftBox>
      <SoftTypography variant='button'>
        Mostrando {(page - 1) * pageSize + 1} a{" "}
        {page * pageSize > totalEntries ? totalEntries : page * pageSize} de{" "}
        {totalEntries} entradas de página
      </SoftTypography>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  entriesPerPage: {
    defaultValue: 25,
    entries: [5, 10, 15, 20, 25, 30, 40, 50],
  },
  canSearch: true,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: false,
  noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default DataTable;
