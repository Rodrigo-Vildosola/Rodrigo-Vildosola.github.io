

import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CreateUser from "./CreateUser";
import Clients from "examples/Cards/Clients";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "redux/actions/users";
import { Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";


function UsersPage() {

  return (
    <DashboardLayout>
      <DashboardNavbar />

        <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
            Usuarios{" "}
        </SoftTypography>

      <Footer />
    </DashboardLayout>
  );
}


export default UsersPage;
