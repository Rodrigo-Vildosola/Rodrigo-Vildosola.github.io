import React from "react";
import Card from "@mui/material/Card";
import { API_URL } from "redux/actions/types";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Grid } from "@mui/material";
import SoftBadge from "components/SoftBadge";

const ElementCard = ({ element }) => {
  return (
    <Card sx={{ padding: 5, paddingTop: 0 }}>
      <Grid container>
        <Grid item xs={12}>
          <SoftBox px={3} py={1}>
            <SoftTypography variant='h6' fontWeight='bold' textAlign='center'>
              {element.name}
            </SoftTypography>
          </SoftBox>
        </Grid>
        <Grid item xs={4}>
          <SoftTypography variant='caption' fontWeight='bold'>
            Diferenciador:{" "}
          </SoftTypography>
        </Grid>
        <Grid item xs={8}>
          <SoftTypography variant='caption'>
            {element.differentiator != "nan"
              ? element.differentiator
              : "Ninguno"}
          </SoftTypography>
        </Grid>
        <Grid item xs={4}>
          <SoftTypography variant='caption' fontWeight='bold'>
            Proyecto:
          </SoftTypography>
        </Grid>
        <Grid item xs={8}>
          <SoftTypography variant='caption'>
            {element.project.name}
            <SoftBadge
              badgeContent={element.project.state}
              color={
                element.project.state == "Adjudicado"
                  ? "success"
                  : element.project.state == "Pendiente"
                  ? "warning"
                  : "error"
              }
            />
          </SoftTypography>
        </Grid>

        <Grid item xs={4}>
          <SoftTypography variant='caption' fontWeight='bold'>
            Dimensiones:{" "}
          </SoftTypography>
        </Grid>
        <Grid item xs={8}>
          <SoftTypography variant='caption'>
            {element.dimensions != "nan" ? element.dimensions : "Ninguna"}
          </SoftTypography>
        </Grid>

        <Grid item xs={4}>
          <SoftTypography variant='caption' fontWeight='bold'>
            Ficha:{" "}
          </SoftTypography>
        </Grid>
        <Grid item xs={8}>
          <SoftTypography variant='caption'>
            <a
              href={`${API_URL}/api/records/get-file/?code=${element.ficha}`}
              target='_blank'
            >
              {element.ficha}
            </a>
          </SoftTypography>
        </Grid>
        <Grid item xs={4}>
          <SoftTypography variant='caption' fontWeight='bold'>
            Grupo:
          </SoftTypography>
        </Grid>
        <Grid item xs={8}>
          <SoftTypography variant='caption'>
            {element.group != "nan" ? element.group : "Ninguno"}
          </SoftTypography>
        </Grid>

        <Grid item xs={4}>
          <SoftTypography variant='caption' fontWeight='bold'>
            Unidades:
          </SoftTypography>
        </Grid>
        <Grid item xs={8}>
          <SoftTypography variant='caption'>{element.unit}</SoftTypography>
        </Grid>
        <Grid item xs={4}>
          <SoftTypography variant='caption' fontWeight='bold'>
            Precio unitario:
          </SoftTypography>
        </Grid>
        <Grid item xs={8}>
          <SoftTypography variant='caption'>
            {"$" +
              parseFloat(element.unit_price).toLocaleString("es-CL", {
                currency: "CLP",
              })}
          </SoftTypography>
        </Grid>
        <Grid item xs={4}>
          <SoftTypography variant='caption' fontWeight='bold'>
            Cantidad:
          </SoftTypography>
        </Grid>
        <Grid item xs={8}>
          <SoftTypography variant='caption'>
            {element.quantity != "nan" ? element.quantity : "Ninguna"}
          </SoftTypography>
        </Grid>

        <Grid item xs={4}>
          <SoftTypography variant='caption' fontWeight='bold'>
            Área:
          </SoftTypography>
        </Grid>
        <Grid item xs={8}>
          <SoftTypography variant='caption'>
            {element.area != "nan" ? element.area : "Ninguna"}
          </SoftTypography>
        </Grid>
        <Grid item xs={4}>
          <SoftTypography variant='caption' fontWeight='bold'>
            Observación:{" "}
          </SoftTypography>
        </Grid>
        <Grid item xs={8}>
          <SoftTypography variant='caption'>
            {element.observation != "nan" ? element.observation : "Ninguna"}
          </SoftTypography>
        </Grid>
      </Grid>
    </Card>
  );
};
export default ElementCard;
