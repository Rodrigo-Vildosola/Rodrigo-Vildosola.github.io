import { useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Table as MuiTable, TableCell } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import Swal from "sweetalert2";

import CreateUser from "layouts/pages/users/CreateUser";
import Icon from "@mui/material/Icon";

function Table({ rows, handleDeleteUser }) {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const columns = [
    { name: "Nombre", align: "left" },
    { name: "Correo", align: "left" },
    { name: "Rol", align: "left" },
    { name: "Acciones", align: "left" },
  ];

  const renderColumns = columns.map(({ name, align, width }) => {
    return (
      <SoftBox
        key={name}
        component='th'
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? 3 : 3}
        pr={align === "right" ? 3 : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color='secondary'
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {name.toUpperCase()}
      </SoftBox>
    );
  });

  const renderDeleteButton = (userId) => {
    return (
      <SoftBadge
        color='error'
        onClick={() => {
          Swal.fire({
            title: "¿Estás seguro que quieres eliminar este usuario?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "No, cancelar",
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              handleDeleteUser(userId);
              Swal.fire(
                "Eliminado",
                "El usuario ha sido eliminado.",
                "success"
              );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                "Cancelado",
                "El usuario no ha sido eliminado.",
                "error"
              );
            }
          });
        }}
        badgeContent={<Icon>delete</Icon>}
      />
    );
  };

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;
    console.log(row);

    const nameCell = (
      <TableCell>
        <SoftBox
          key={uuidv4()}
          component='td'
          p={1}
          textAlign='left'
          borderBottom={
            row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null
          }
        >
          <SoftTypography
            variant='button'
            fontWeight='regular'
            color='secondary'
            sx={{ display: "inline-block", width: "max-content" }}
          >
            {row.first_name}
          </SoftTypography>
        </SoftBox>
      </TableCell>
    );

    const emailCell = (
      <TableCell>
        {" "}
        <SoftBox
          key={uuidv4()}
          component='td'
          p={1}
          textAlign='left'
          borderBottom={
            row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null
          }
        >
          <SoftTypography
            variant='button'
            fontWeight='regular'
            color='secondary'
            sx={{ display: "inline-block", width: "max-content" }}
          >
            {row.email}
          </SoftTypography>
        </SoftBox>
      </TableCell>
    );

    const actionButtons = (
      <TableCell textAlign='center'>
        <CreateUser user={row} edit={true} />
        {renderDeleteButton(row.email)}
      </TableCell>
    );

    const roleCell = (
      <TableCell textAlign='left'>
        <SoftTypography
          variant='button'
          fontWeight='regular'
          color='secondary'
          sx={{ display: "inline-block", width: "max-content" }}
        >
          {row.groups[0] && row.groups[0].name}
        </SoftTypography>
      </TableCell>
    );

    return (
      <TableRow key={rowKey}>
        {nameCell} {emailCell} {roleCell}
        {actionButtons}
      </TableRow>
    );
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <SoftBox component='thead'>
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
  handleDeleteUser: PropTypes.func.isRequired,
};

export default Table;
