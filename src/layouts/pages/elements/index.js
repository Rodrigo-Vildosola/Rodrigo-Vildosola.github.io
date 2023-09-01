/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "redux/actions/projects"; // Assuming you have an action for getting projects
import { useParams } from "react-router-dom";
import { API_URL } from "redux/actions/types";
import "./style.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "components/DataTablePagination";
import ViewElements from "./ViewElements";

import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// MUI components
import { Card, Grid, Icon } from "@mui/material";

import CreateElements from "./CreateElements";
import { getElements } from "redux/actions/projects";
import SoftInput from "components/SoftInput";
import SoftBadge from "components/SoftBadge";
import SoftSelect from "components/SoftSelect";
import { getFormatsByClient } from "redux/actions/clients";
import { getClients } from "redux/actions/clients";
import { getPermission } from "utils";
function ElementsPage() {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const [elements, setElements] = useState([]);
  const [name, setName] = useState("");
  const [showName, setShowName] = useState(true);
  const [showUnitPrice, setShowUnitPrice] = useState(true);
  const [showProjectName, setShowProjectName] = useState(true);
  const [showProjectState, setShowProjectState] = useState(true);
  const [showDifferentiator, setShowDifferentiator] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showFicha, setShowFicha] = useState(true);
  const [showGroup, setShowGroup] = useState(true);
  const [showObservation, setShowObservation] = useState(true);
  const [showUnit, setShowUnit] = useState(true);
  const [showQuantity, setShowQuantity] = useState(true);
  const [showArea, setShowArea] = useState(true);

  // Filters and table

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientsFilter, setClientsFilter] = useState(null);
  const [formats, setFormats] = useState([]);
  const [formatsFilter, setFormatsFilter] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState(null);
  const [projectFilter, setProjectFilter] = useState(null);
  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [table, setTable] = useState({ columns: [], rows: [] });

  const getProjectsResponse = useSelector(
    (state) => state.projects.getProjects
  );
  const getClientsResponse = useSelector((state) => state.clients.getClients);
  const getFormatsResponse = useSelector(
    (state) => state.clients.getFormatsByClient
  );

  const getElementsResponse = useSelector(
    (state) => state.projects.getElements
  );
  const manageColumns = () => {
    let cols = [];

    if (showName)
      cols.push({ Header: "Nombre", accessor: "name", width: "10%" });
    if (showUnitPrice)
      cols.push({
        Header: "Precio unitario",
        accessor: "unitPrice",
        width: "10%",
      });
    if (showProjectName)
      cols.push({ Header: "Proyecto", accessor: "projectName", width: "10%" });
    if (showProjectState)
      cols.push({ Header: "Estado", accessor: "projectState", width: "10%" });
    if (showDifferentiator)
      cols.push({
        Header: "Diferenciador",
        accessor: "differentiatior",
        width: "10%",
      });
    if (showDimensions)
      cols.push({
        Header: "Dimensiones",
        accessor: "dimensions",
        width: "10%",
      });
    if (showFicha)
      cols.push({ Header: "Ficha", accessor: "ficha", width: "10%" });
    if (showGroup)
      cols.push({ Header: "Grupo", accessor: "group", width: "10%" });
    if (showObservation)
      cols.push({
        Header: "Observación",
        accessor: "observation",
        width: "20%",
      });
    if (showUnit)
      cols.push({ Header: "Unidad", accessor: "unit", width: "10%" });
    if (showQuantity)
      cols.push({ Header: "Cantidad", accessor: "quantity", width: "10%" });
    if (showArea) cols.push({ Header: "Area", accessor: "area", width: "10%" });

    return cols;
  };

  const columns = useMemo(
    () => manageColumns(),
    [
      showName,
      showUnitPrice,
      showProjectName,
      showProjectState,
      showDifferentiator,
      showDimensions,
      showFicha,
      showGroup,
      showObservation,
      showUnit,
      showQuantity,
      showArea,
    ]
  );

  const doRequest = () => {
    let form = {
      page: page,
      page_size: pageSize,
      name: nameFilter,
      client: clientsFilter,
      formats: formatsFilter,
      project: projectFilter,
      state: stateFilter,
    };
    dispatch(getElements(form));
  };

  useEffect(() => {
    doRequest();
    if (getPermission(["administrador", "tipo1", "tipo2"]))
      dispatch(getClients({ no_pagination: "true" }));
    else {
      let profile = JSON.parse(localStorage.getItem("profile"));
      dispatch(getFormatsByClient({ client_uuid: profile.assigned_formats[0].uuid }));
    }
  }, []);

  useEffect(() => {
    if (getFormatsResponse.data) {
      setFormats(getFormatsResponse.data.results);
    }
  }, [getFormatsResponse]);

  useEffect(() => {
    if (getClientsResponse.data) {
      setClients(getClientsResponse.data.results);
    }
  }, [getClientsResponse]);

  useEffect(() => {
    if (clientsFilter) getFormatsByClient({ client_uuid: clientsFilter })(dispatch);
  }, [clientsFilter]);

  useEffect(() => {
    if (getElementsResponse.data) {

      setTotalEntries(getElementsResponse.data.count);
      setCanNext(getElementsResponse.data.next ? true : false);
      setCanPrev(getElementsResponse.data.previous ? true : false);
      setTable(parseTable(getElementsResponse.data.results));
      setElements(getElementsResponse.data.results);
    }
  }, [getElementsResponse]);

  useEffect(() => {
    doRequest();
  }, [
    nameFilter,
    clientsFilter,
    formatsFilter,
    projectFilter,
    page,
    pageSize,
    stateFilter,
  ]);

  const parseTable = (elements) => {
    const columns = [
      { Header: "Nombre", accessor: "name", width: "15%" },
      {
        Header: "Proyecto",
        accessor: "projectName",
        width: "10%",
      },
      {
        Header: "Estado",
        accessor: "projectState",
        width: "5%",
      },
      {
        Header: "Precio unitario",
        accessor: "unitPrice",
        width: "15%",
      },
      { Header: "Cantidad", accessor: "quantity", width: "10%" },
      { Header: "Ficha", accessor: "ficha", width: "10%" },
      { Header: "Unidad", accessor: "unit", width: "10%" },
      { Header: "Acciones", accessor: "actions", width: "5%" },
    ];
    const rows = elements.map((element) => ({
      name: element.name,
      differentiator:
        element.differentiator == "nan" ? "" : element.differentiator,
      projectName: element.project.name,
      projectState: (
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
      ),
      dimensions: element.dimensions,
      ficha: (
        <a
          href={`${API_URL}/api/records/get-file/?code=${element.ficha}`}
          target='_blank'
        >
          {element.ficha}
        </a>
      ),
      group: element.group,
      observation: element.observation,
      unit: element.unit,
      unitPrice:
        "$" +
        parseFloat(element.unit_price).toLocaleString("es-CL", {
          currency: "CLP",
        }),
      quantity: element.quantity,
      area: element.area,
      actions: <ViewElements element={element} />,
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
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold' mb={3}>
        Elementos
      </SoftTypography>

      <Card sx={{ p: 3, overflow: "visible", px: 2 }}>
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
                value={nameFilter}
                onChange={(e) => {
                  setNameFilter(e.target.value);
                }}
              />
            </SoftBox>
          </Grid>
          {getPermission(["administrador", "tipo1", "tipo2"]) && (
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
          )}
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
          <Grid item xs={12} sm={3}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Estado del proyecto
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
        </Grid>
      </Card>
      <Card sx={{ padding: 3 }}>
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

export default ElementsPage;
