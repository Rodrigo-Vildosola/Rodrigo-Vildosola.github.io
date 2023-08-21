/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "redux/actions/projects"; // Assuming you have an action for getting projects
import { useParams } from "react-router-dom";
import "./style.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// MUI components
import { Card, Grid, Icon } from "@mui/material";

import CreateElements from "./CreateElements";
import { getElements } from "redux/actions/projects";
import SoftInput from "components/SoftInput";
import SoftBadge from "components/SoftBadge";

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

  const getElementsResponse = useSelector(
    (state) => state.projects.getElements
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

  useEffect(() => {
    dispatch(getElements());
  }, []);

  useEffect(() => {
    if (getElementsResponse.data) {
      console.log(getElementsResponse.data)
      setElements(getElementsResponse.data.results);
    }
  }, [getElementsResponse]);

  useEffect(() => {
    if (name.length > 2) {
      dispatch(getElements({ name }));
    }
  }, [name]);

  const extractedDataArray = elements.map((element) => ({
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
    ficha: element.ficha,
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
  }));

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

      <Card sx={{ padding: 3 }}>
        <SoftTypography variant='h5' textAlign='center' fontWeight='bold'>
          Filtros
        </SoftTypography>
        <Grid container>
          <Grid item sm={4} xs={12}>
            <SoftTypography variant='body2' fontWeight='bold'>
              Nombre
            </SoftTypography>
            <SoftInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              size='small'
            />
          </Grid>
        </Grid>
      </Card>
      <Card>
        <DataTable
          table={{
            columns: [
              { Header: "Nombre", accessor: "name", width: "10%" },
              {
                Header: "Precio unitario",
                accessor: "unitPrice",
                width: "5%",
              },
              {
                Header: "Proyecto",
                accessor: "projectName",
                width: "10%",
              },
              {
                Header: "Estado",
                accessor: "projectState",
                width: "10%",
              },
              {
                Header: "Diferenciador",
                accessor: "differentiator",
                width: "10%",
              },
              { Header: "Dimensiones", accessor: "dimensions", width: "10%" },
              { Header: "Ficha", accessor: "ficha", width: "10%" },
              { Header: "Grupo", accessor: "group", width: "10%" },
              {
                Header: "Observación",
                accessor: "observation",
                width: "30%",
                Cell: (row) => (
                  <div
                    style={{
                      maxWidth: "200px",
                      wordBreak: "break-all",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {row.value}
                  </div>
                ),
              },
              { Header: "Unidad", accessor: "unit", width: "10%" },
              { Header: "Cantidad", accessor: "quantity", width: "10%" },
              { Header: "Area", accessor: "area", width: "10%" },
            ],
            rows: extractedDataArray,
          }}
        />
      </Card>

      <Footer />
    </DashboardLayout>
  );
}

export default ElementsPage;
