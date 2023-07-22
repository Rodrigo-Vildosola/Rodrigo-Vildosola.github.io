import { useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Table as MuiTable } from "@mui/material";
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
    { name: "Name", align: "left" },
    { name: "Email", align: "left" },
    { name: "", align: "left" }, 
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

  const renderDeleteButton = (userId) => {
    return (
      <SoftBadge
        color="error"
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
              Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire("Cancelado", "El usuario no ha sido eliminado.", "error");
            }
          });
        }}
        badgeContent={<Icon>delete</Icon>}
      />
    );
  };
  

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

    const deleteButtonCell = (
      <SoftBox
        key={uuidv4()}
        component="td"
        p={1}
        textAlign="left"
        borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
      >
        {renderDeleteButton(row.email)}
      </SoftBox>
    );

    const editButtonCell = (
      <SoftBox
        key={uuidv4()}
        component="td"
        p={1}
        textAlign="left"
        borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
      >
        <CreateUser user={row} edit={true} />
      </SoftBox>
    );
  
    return (
      <TableRow key={rowKey}>
        {[nameCell, emailCell, deleteButtonCell, editButtonCell]} 
      </TableRow>
    );
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
  handleDeleteUser: PropTypes.func.isRequired,
};

export default Table;
