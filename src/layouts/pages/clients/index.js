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
import Clients from "examples/Cards/Clients";
import CreateClient from "./CreateClient";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "redux/actions/clients";
import { Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function ClientsPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  const getClientsResponse = useSelector((state) => state.clients.getClients);
  const createClientResponse = useSelector(
    (state) => state.clients.createClient
  );
  const updateClientResponse = useSelector(
    (state) => state.clients.updateClient
  );
  const deleteClientResponse = useSelector(
    (state) => state.clients.deleteClient
  );

  useEffect(() => {
    let profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      if (profile.groups[0].name === "tipo2") {
        let clientsAssigned = profile.assigned_clients;
        setClients(clientsAssigned);
      } else {
        dispatch(getClients());
      }
    }
  }, []);

  useEffect(() => {
    if (getClientsResponse.data) {
      let profile = JSON.parse(localStorage.getItem("profile"));
      if (profile) {
        if (profile.groups[0].name !== "tipo2") {
          setClients(getClientsResponse.data);
        }
      }
    }
  }, [getClientsResponse]);

  useEffect(() => {
    if (createClientResponse.data) {
      if (new Date() - createClientResponse.time < 2000) {
        dispatch(getClients());
      }
    }
  }, [createClientResponse]);

  useEffect(() => {
    if (updateClientResponse.data) {
      if (new Date() - updateClientResponse.time < 2000) {
        dispatch(getClients());
      }
    }
  }, [updateClientResponse]);

  useEffect(() => {
    if (deleteClientResponse.data) {
      if (new Date() - deleteClientResponse.time < 2000) {
        dispatch(getClients());
      }
    }
  }, [deleteClientResponse]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Clientes{" "}
      </SoftTypography>
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateClient />
      </SoftBox>
      <Grid container spacing={3}>
        {clients.map((client, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            {console.log(client)}
            <Clients client={client} action={{}} />
          </Grid>
        ))}
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default ClientsPage;
