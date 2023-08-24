import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "components/DataTablePagination";
import { useDispatch, useSelector } from "react-redux";
import { getClients, deleteClient } from "redux/actions/clients";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Card, Grid, Icon, Tooltip } from "@mui/material";
import SoftInput from "components/SoftInput";
import CreateClient from "./CreateClient";
import SoftBadge from "components/SoftBadge";
import Swal from "sweetalert2";

function ClientsPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [clients, setClients] = useState([]);
  const [nameFilter, setNameFilter] = useState("");

  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [table, setTable] = useState({ columns: [], rows: [] });

  const getClientsResponse = useSelector((state) => state.clients.getClients);
  const createClientResponse = useSelector((state) => state.clients.createClient);
  const deleteClientResponse = useSelector((state) => state.clients.deleteClient);

  const doRequest = () => {
    let filters = {
      name: nameFilter,
      page: page,
      page_size: pageSize,
    };
    dispatch(getClients(filters));
  };

  useEffect(() => {
    doRequest();
  }, [nameFilter, pageSize, page]);

  useEffect(() => {
    if (getClientsResponse.data) {
      setClients(getClientsResponse.data.results);
      setTable(parseTable(getClientsResponse.data.results));
      setCanNext(getClientsResponse.data.next);
      setTotalEntries(getClientsResponse.data.count);
      setCanPrev(getClientsResponse.data.previous);
    }
    console.log(getClientsResponse.data);
  }, [getClientsResponse]);

  useEffect(() => {
    if (createClientResponse.data) {
      if (new Date() - createClientResponse.time < 2000) {
        dispatch(getClients());
      }
    }
  }, [createClientResponse]);

  useEffect(() => {
    if (deleteClientResponse.data) {
      if (new Date() - deleteClientResponse.time < 2000) {
        dispatch(getClients());
      }
    }
  }, [deleteClientResponse]);

  const parseTable = (clients) => {
    const columns = [
      { Header: "Logo", accessor: "logo", width: "20%" },
      { Header: "Nombre", accessor: "name"},
      { Header: "Formatos", accessor: "formats", width: "5%"},
      { Header: "Actions", accessor: "actions", width: "10%" },
    ];

    const rows = clients.map((client) => ({
      logo: (
        <SoftBox
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/clients/${client.uuid}/formats`);
          }}
        >
          {" "}
          <SoftBox
            component='img'
            height={100}
            src={client.logo}
            alt={client.name}
            borderRadius='md'
          />
        </SoftBox>
      ),
      name: client.name,
      formats: (
        <SoftBox
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/clients/${client.uuid}/formats`);
          }}
        >
          <SoftBadge
            color='secondary'
            badgeContent={<Icon>visibility_icon</Icon>}
          />
        </SoftBox>
      ),
      actions: (
        <SoftBox display='flex' justifyContent='space-between'>
          <CreateClient edit={true} client={client} />
          <Tooltip title='Eliminar cliente'>
            <SoftBadge
              color='error'
              onClick={() => {
                Swal.fire({
                  title: "¿Estás seguro que quieres eliminar este cliente?",
                  text: "No podrás revertir esta acción",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Si, eliminar",
                  cancelButtonText: "No, cancelar",
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteClient({ id: client.id }));
                    Swal.fire(
                      "Eliminado",
                      "El cliente ha sido eliminado.",
                      "success"
                    );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                      "Cancelado",
                      "El cliente no ha sido eliminado.",
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
    }));

    return { columns, rows };
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Clientes
      </SoftTypography>
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateClient />
      </SoftBox>
      <Card sx={{ pt: 3, overflow: "visible", px: 1 }}>
        <SoftTypography variant='h5' textAlign='center' fontWeight='bold'>
          Filtros
        </SoftTypography>
        <Grid container>
          <Grid item xs={12} sm={6}>
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

export default ClientsPage;
