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

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftBadge from "components/SoftBadge";
import { Icon, Tooltip } from "@mui/material";
import CreateClient from "layouts/pages/clients/CreateClient";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteClient } from "redux/actions/clients";
import { deleteFormat } from "redux/actions/clients";
import CreateFormat from "layouts/pages/formats/CreateFormat";

function ComplexTeamCard({ format, action }) {
  const dispatch = useDispatch();
  const template = (
    <Card style={{ overflow: "visible" }}>
      <SoftBox p={2} textAlign='center' lineHeight={1}>
        <SoftBox style={{ position: "relative" }}>
          <SoftBox position='absolute' top={-25} right={-10}>
            <CreateFormat format={format} edit={true} />

            <Tooltip title='Eliminar Formato' placement='top'>
              <SoftBadge
                color='error'
                onClick={() => {
                  Swal.fire({
                    title: "¿Estas seguro que quieres eliminar este formato?",
                    text: "No podras revertir esta acción",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Si, eliminar",
                    cancelButtonText: "No, cancelar",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deleteFormat({ uuid: format.uuid }));
                      Swal.fire(
                        "Eliminado",
                        "El formato ha sido eliminado.",
                        "success"
                      );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        "Cancelado",
                        "El formato no ha sido eliminado.",
                        "error"
                      );
                    }
                  });
                }}
                badgeContent={<Icon>delete</Icon>}
              />
            </Tooltip>
          </SoftBox>
        </SoftBox>
        <SoftBox
          component='img'
          height={100}
          src={format.logo}
          alt={format.name}
          borderRadius='md'
        />
      </SoftBox>
      <SoftBox py={2.5} px={4} mb={3} mx={3} textAlign='center'>
        <SoftTypography variant='h4' textTransform='capitalize'>
          {format.name}
        </SoftTypography>
      </SoftBox>
    </Card>
  );

  return template;
}

export default ComplexTeamCard;
