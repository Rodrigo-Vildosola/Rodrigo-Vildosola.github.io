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

import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ClientFormat from "examples/Cards/ClientFormat";
import CreateFormat from "./CreateFormat";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "redux/actions/clients";
import { Grid, Icon, Table, TableRow } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { getFormatsByClient } from "redux/actions/clients";
import { useParams } from "react-router-dom";
import SoftButton from "components/SoftButton";

function FormatsPage() {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formats, setFormats] = useState([]);

  const getFormatsByClientResponse = useSelector(
    (state) => state.clients.getFormatsByClient
  );
  const createFormatResponse = useSelector(
    (state) => state.clients.createFormat
  );
  const updateFormatResponse = useSelector(
    (state) => state.clients.updateFormat
  );
  const deleteFormatResponse = useSelector(
    (state) => state.clients.deleteFormat
  );

  useEffect(() => {
    let profile = JSON.parse(localStorage.getItem("profile"));
    if (profile.groups[0].name === "tipo3")
      dispatch(getFormatsByClient(profile.assigned_formats[0].uuid));
    else {
      dispatch(getFormatsByClient(uuid));
    }
  }, []);

  useEffect(() => {
    if (getFormatsByClientResponse.data) {
      setFormats(getFormatsByClientResponse.data);
    }
  }, [getFormatsByClientResponse]);

  useEffect(() => {
    if (createFormatResponse.data) {
      if (new Date() - createFormatResponse.time < 2000) {
        dispatch(getFormatsByClient(uuid));
      }
    }
  }, [createFormatResponse]);

  useEffect(() => {
    if (updateFormatResponse.data) {
      if (new Date() - updateFormatResponse.time < 2000) {
        dispatch(getFormatsByClient(uuid));
      }
    }
  }, [updateFormatResponse]);

  useEffect(() => {
    if (deleteFormatResponse.data) {
      if (new Date() - deleteFormatResponse.time < 2000) {
        dispatch(getFormatsByClient(uuid));
      }
    }
  }, [deleteFormatResponse]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox>
        <SoftButton
          onClick={() => {
            window.history.back();
          }}
          variant='text'
          color='black'
        >
          <Icon>arrow_back</Icon> Volver
        </SoftButton>
      </SoftBox>
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Formatos{" "}
      </SoftTypography>
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateFormat />
      </SoftBox>
      <Grid container spacing={3}>
        {formats.map((format, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            {console.log(format)}
            <ClientFormat format={format} action={{}} />
          </Grid>
        ))}
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default FormatsPage;
