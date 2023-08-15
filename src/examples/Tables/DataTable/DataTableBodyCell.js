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
import { useDispatch } from "react-redux";
import { deleteProject } from "redux/actions/projects";
import { deleteRecord } from "redux/actions/records";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import SoftBadge from "components/SoftBadge";
import CreateProject from "layouts/pages/projects/CreateProject";
import CreateRecord from "layouts/pages/records/CreateRecord";
import Swal from "sweetalert2";
import { Tooltip } from "@mui/material";
import Icon from "@mui/material/Icon";

function DataTableBodyCell({ noBorder, align, children, url, badge, projectAction, recordAction }) {
  const { light } = colors;
  const { size } = typography;
  const { borderWidth } = borders;
  const dispatch = useDispatch();


  const renderCellContent = (content) => {


    if (projectAction) {
      return (
        <SoftBox display="flex" justifyContent="space-between">
          <CreateProject edit={true} project={content.props.cell.value} />
          <Tooltip title='Eliminar proyecto'>
            <SoftBadge
              color='error'
              onClick={() => {
                Swal.fire({
                  title: "¿Estás seguro que quieres eliminar este proyecto?",
                  text: "No podrás revertir esta acción",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Si, eliminar",
                  cancelButtonText: "No, cancelar",
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteProject({ uuid: content.props.cell.value.uuid}));
                    Swal.fire(
                      "Eliminado",
                      "El projecto ha sido eliminado.",
                      "success"
                    );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                      "Cancelado",
                      "El proyecto no ha sido eliminado.",
                      "error"
                    );
                  }
                });
              }}
              badgeContent={<Icon>delete</Icon>}
            />
          </Tooltip>
        </SoftBox>
      );
    }

    if (recordAction) {
      return (
        <SoftBox display="flex" justifyContent="space-between">
          <CreateRecord edit={true} record={content.props.cell.value} />
          <Tooltip title='Eliminar ficha'>
            <SoftBadge
              color='error'

              onClick={() => {
                Swal.fire({
                  title: "¿Estás seguro que quieres eliminar esta ficha?",
                  text: "No podrás revertir esta acción",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Si, eliminar",
                  cancelButtonText: "No, cancelar",
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteRecord({ uuid: content.props.cell.value.uuid}));
                    Swal.fire(
                      "Eliminado",
                      "La ficha ha sido eliminada.",
                      "success"
                    );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                      "Cancelado",
                      "La ficha no ha sido eliminada.",
                      "error"
                    );
                  }
                });
              }}
              badgeContent={<Icon>delete</Icon>}
            />
          </Tooltip>
        </SoftBox>
      );
    }

    if (url) {
      return (
        <a href={content.props.cell.value} target="_blank" rel="noopener noreferrer" download>          
          Documento
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
