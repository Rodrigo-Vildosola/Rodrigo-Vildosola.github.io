
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { getUsers, deleteUser } from "redux/actions/users";

// @mui material components
import { Grid } from "@mui/material";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Clients from "examples/Cards/Clients";
import Table from "./components/usersTable";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Users page components
import CreateUser from "./CreateUser";

const columns = [
  { name: "Nombre", align: "left"},
  { name: "Email", align: "left"},
]

function UsersPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsersResponse = useSelector((state) => state.users.getUsers);
  const createUserResponse = useSelector((state) => state.users.createUser);
  const updateUserResponse = useSelector((state) => state.users.updateUser);
  const deleteUserResponse = useSelector((state) => state.users.deleteUser);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (getUsersResponse.data) {
      setUsers(getUsersResponse.data);
    }
  }, [getUsersResponse]);

  useEffect(() => {
    if (createUserResponse.data) {
      if (new Date() - createUserResponse.time < 2000) {
        dispatch(getUsers());
      }
    }
  }, [createUserResponse]);

  useEffect(() => {
    if (updateUserResponse.data) {
      if (new Date() - updateUserResponse.time < 2000) {
        dispatch(getUsers());
      }
    }
  }, [updateUserResponse]);

  useEffect(() => {
    if (deleteUserResponse.data) {
      if (new Date() - deleteUserResponse.time < 2000) {
        dispatch(getUsers());
      }
    }
  }, [deleteUserResponse]);

  const handleDeleteUser = (email) => {
    dispatch(deleteUser({email: email}));
  };



  return (
    <DashboardLayout>
      <DashboardNavbar />
        <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
            Usuarios{" "}
        </SoftTypography>
        <SoftBox display='flex' justifyContent='flex-end' pb={3}>
          <CreateUser />
        </SoftBox>
        {users.map((user, index) => (
          <SoftTypography key = {index} variant='h3' textAlign='center' fontWeight='bold'>
            {console.log(user)}
          </SoftTypography>
        ))}


        <Table columns={columns} rows={users} handleDeleteUser={handleDeleteUser} />

        

      <Footer/>
    </DashboardLayout>
  );
}


export default UsersPage;
