import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "redux/actions/projects";
import { useParams } from "react-router-dom";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "components/DataTablePagination";

import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// MUI components
import { Card, Grid, Icon, Tooltip } from "@mui/material";

import CreateProject from "./CreateProject";
import SoftSelect from "components/SoftSelect";
import { getClients } from "redux/actions/clients";
import { getFormatsByClient } from "redux/actions/clients";
import Swal from "sweetalert2";
import { deleteProject } from "redux/actions/projects";
import SoftBadge from "components/SoftBadge";
import CreateItemizado from "./CreateItemizado";
import SoftInput from "components/SoftInput";

function ProjectsPage() {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientsFilter, setClientsFilter] = useState(null);
  const [formats, setFormats] = useState([]);
  const [formatsFilter, setFormatsFilter] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState(null);
  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [table, setTable] = useState({ columns: [], rows: [] });
  const getProjectsResponse = useSelector(
    (state) => state.projects.getProjects
  );
  const createProjectResponse = useSelector(
    (state) => state.projects.createProject
  );
  const updateProjectResponse = useSelector(
    (state) => state.projects.updateProject
  );
  const deleteProjectResponse = useSelector(
    (state) => state.projects.deleteProject
  );
  const getClientsResponse = useSelector((state) => state.clients.getClients);
  const getFormatsResponse = useSelector(
    (state) => state.clients.getFormatsByClient
  );

  const doRequest = () => {
    let filters = {
      state: stateFilter,
      client: clientsFilter,
      formats: formatsFilter,
      name: nameFilter,
      page: page,
      page_size: pageSize,
    };
    dispatch(getProjects(filters));
  };

  useEffect(() => {
    doRequest();
  }, [stateFilter, clientsFilter, formatsFilter, nameFilter, pageSize, page]);

  useEffect(() => {
    if (clientsFilter) getFormatsByClient(clientsFilter)(dispatch);
  }, [clientsFilter]);

  useEffect(() => {
    if (getFormatsResponse.data) {
      setFormats(getFormatsResponse.data.results);
    }
  }, [getFormatsResponse]);

  useEffect(() => {
    getClients()(dispatch);
    doRequest();
  }, []);

  useEffect(() => {
    if (getClientsResponse.data) {
      setClients(getClientsResponse.data.results);
    }
  }, [getClientsResponse]);

  useEffect(() => {
    if (getProjectsResponse.data && uuid) {
      const filteredProjects = getProjectsResponse.data.results.filter(
        (project) => project.format?.uuid === uuid
      );
      setProjects(filteredProjects);
      setTable(parseTable(filteredProjects));
      setTotalEntries(filteredProjects.length);
    } else if (getProjectsResponse.data) {
      setProjects(getProjectsResponse.data.results);
      setTable(parseTable(getProjectsResponse.data.results));
      setCanNext(getProjectsResponse.data.next);
      setTotalEntries(getProjectsResponse.data.count);
      setCanPrev(getProjectsResponse.data.previous);
      console.log(getProjectsResponse.data);
    }
  }, [getProjectsResponse, uuid]);

  useEffect(() => {
    if (createProjectResponse.data) {
      if (new Date() - createProjectResponse.time < 2000) {
        dispatch(getProjects());
      }
    }
  }, [createProjectResponse]);

  useEffect(() => {
    if (updateProjectResponse.data) {
      if (new Date() - updateProjectResponse.time < 2000) {
        dispatch(getProjects());
      }
    }
  }, [updateProjectResponse]);

  useEffect(() => {
    if (deleteProjectResponse.data) {
      if (new Date() - deleteProjectResponse.time < 2000) {
        dispatch(getProjects());
      }
    }
  }, [deleteProjectResponse]);

  const parseTable = (projects) => {
    let columns = [
      { Header: "Nombre", accessor: "name" },
      { Header: "Estado", accessor: "state", badge: true },
      { Header: "Cliente", accessor: "clientName" },
      { Header: "Formato", accessor: "formatName" },
      { Header: "Itemizado", accessor: "itemizado", url: true },
      { Header: "Acciones", accessor: "actions", width: "10%" },
    ];
    let rows = projects.map((projectData) => ({
      name: projectData.name,
      itemizado: projectData.itemizado,
      state: (
        <SoftBadge
          color={
            projectData.state === "Adjudicado"
              ? "success"
              : projectData.state === "Pendiente"
              ? "warning"
              : "error"
          }
          badgeContent={projectData.state}
        />
      ),
      project: projectData,
      formatName: projectData.format.name,
      clientName: projectData.format.client.name,
      actions: (
        <SoftBox display='flex' justifyContent='space-between'>
          <CreateProject edit={true} project={projectData} />
          <CreateItemizado project={projectData} />
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
                    dispatch(deleteProject({ uuid: projectData.uuid }));
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
      ),
    }));
    return { columns, rows };
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {uuid && (
        <SoftBox>
          <SoftButton
            onClick={() => {
              window.history.back();
            }}
            variant='text'
            color='dark'
          >
            <Icon>arrow_back</Icon> Volver
          </SoftButton>
        </SoftBox>
      )}
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Proyectos
      </SoftTypography>
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateProject />
      </SoftBox>

      <Card sx={{ p: 3, overflow: "visible" }}>
        <SoftTypography variant='h5' textAlign='center' fontWeight='bold'>
          Filtros
        </SoftTypography>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Estado
              </SoftTypography>
              <SoftSelect
                option={stateFilter}
                onChange={(e) => {
                  setStateFilter(e.value);
                }}
                options={[
                  { label: "Todos", value: null },
                  { label: "Adjudicado", value: "Adjudicado" },
                  { label: "Pendiente", value: "Pendiente" },
                  { label: "Rechazado", value: "Rechazado" },
                ]}
              />
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Nombre
              </SoftTypography>
              <SoftInput
                value={nameFilter}
                onChange={(e) => {
                  setNameFilter(e.target.value);
                }}
              />
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Cliente
              </SoftTypography>
              <SoftSelect
                option={clientsFilter}
                onChange={(e) => {
                  setClientsFilter(e.value);
                }}
                options={[
                  { label: "Todos", value: null },
                  ...clients.map((client) => ({
                    label: client.name,
                    value: client.uuid,
                  })),
                ]}
              />
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Formato
              </SoftTypography>
              <SoftSelect
                option={formatsFilter}
                onChange={(e) => {
                  setFormatsFilter(e.value);
                }}
                options={[
                  { label: "Todos", value: null },
                  ...formats.map((format) => ({
                    label: format.name,
                    value: format.uuid,
                  })),
                ]}
              />
            </SoftBox>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ paddingX: 5 }}>
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

export default ProjectsPage;
