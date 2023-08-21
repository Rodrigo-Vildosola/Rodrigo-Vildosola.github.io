import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "components/DataTablePagination";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "redux/actions/users";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Card, Grid, Icon, Tooltip } from "@mui/material";
import SoftInput from "components/SoftInput";
import CreateUser from "./CreateUser";
import SoftBadge from "components/SoftBadge";
import SoftSelect from "components/SoftSelect";
import Swal from "sweetalert2";


function UsersPage() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [emailFilter, setEmailFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");


  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [table, setTable] = useState({ columns: [], rows: [] });

  const userTypes = [
    { value: "", label: "Todos" },
    { value: "administrador", label: "Administrador" },
    { value: "tipo1", label: "Tipo 1" },
    { value: "tipo2", label: "Tipo 2" },
    { value: "tipo3", label: "Tipo 3"}
  ];

  const getUsersResponse = useSelector((state) => state.users.getUsers);
  const createUserResponse = useSelector((state) => state.users.createUser);
  const updateUserResponse = useSelector((state) => state.users.updateUser);
  const deleteUserResponse = useSelector((state) => state.users.deleteUser);

  const doRequest = () => {
    let filters = {
      email: emailFilter,
      first_name: nameFilter,
      page: page,
      page_size: pageSize,
      type: typeFilter
    };
    console.log(filters);
    dispatch(getUsers(filters));
  };

  useEffect(() => {
    doRequest();
  }, [emailFilter, nameFilter, typeFilter, pageSize, page]);

  useEffect(() => {
    if (getUsersResponse.data) {
      setUsers(getUsersResponse.data.results);
      setTable(parseTable(getUsersResponse.data.results));
      setCanNext(getUsersResponse.data.next);
      setTotalEntries(getUsersResponse.data.count);
      setCanPrev(getUsersResponse.data.previous);
      console.log(getUsersResponse.data);
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

  const parseTable = (users) => {
    const columns = [
      { Header: "Nombre", accessor: "first_name", width: "40%" },
      { Header: "Email", accessor: "email", width: "40%" },
      { Header: "Tipo", accessor: "type", width: "20%"},
      { Header: "Acciones", accessor: "actions", width: "20%"}
    ];
    const rows = users.map((user) => {
      return {
        first_name: user.first_name,
        email: user.email,
        type: (
          <Grid container>
            {
              user.groups.map((group) => (
                <SoftBadge
                  color={
                    group.name === "administrador" 
                    ? "primary" 
                    : group.name === "tipo1"
                    ? "secondary" 
                    : group.name === "tipo2"
                    ? "success" 
                    : group.name === "tipo3"
                    ? "warning" 
                    : "error"
                  }
                  badgeContent={group.name}
                  />
              ))
            }
          </Grid>
        ),
        actions: (
          <SoftBox display='flex' justifyContent='space-between'>
            <CreateUser edit={true} user={user} />
            <Tooltip title='Eliminar usuario'>
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
                      dispatch(deleteUser({ email: user.email })); // Assuming you have a deleteUser action
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
            </Tooltip>
          </SoftBox>

        ),
      };
    });
    return { columns, rows };
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Usuarios
      </SoftTypography>
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateUser />
      </SoftBox>
      <Card sx={{ pt: 3, overflow: "visible", px: 1 }}>
        <SoftTypography variant='h5' textAlign='center' fontWeight='bold'>
          Filtros
        </SoftTypography>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Nombre
              </SoftTypography>
              <SoftInput
                size='small'
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Email
              </SoftTypography>
              <SoftInput
                size='small'
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
              />
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Estado
              </SoftTypography>
              <SoftSelect
                option={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.value);
                }}
                options={userTypes}
              />
            </SoftBox>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ px: 3, overflow: "visible" }}>
        <DataTable
          totalEntries={totalEntries}
          canSearch={false}
          table={table}
          changePage={setPage}
          canNext={canNext}
          canPrev={canPrev}
          page={page}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default UsersPage;
