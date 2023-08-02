import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "redux/actions/projects"; // Assuming you have an action for getting projects
import { useParams } from "react-router-dom";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// MUI components
import { Grid, Icon, Table, TableRow } from "@mui/material";

import CreateProject from "./CreateProject";


function ProjectsPage() {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const getProjectsResponse = useSelector((state) => state.projects.getProjects);
  const createProjectResponse = useSelector(
    (state) => state.projects.createProject
  );
  const updateProjectResponse = useSelector(
    (state) => state.projects.updateProject
  );
  const deleteProjectResponse = useSelector(
    (state) => state.projects.deleteProject
  );

  useEffect(() => {
    dispatch(getProjects()); 
  }, []);

  useEffect(() => {
    if (getProjectsResponse.data) {
      console.log("getProjectsResponse", getProjectsResponse.data);
      // Filter projects by the formatUuid since the request returns all instances of projects
      const filteredProjects = getProjectsResponse.data.filter(
        (project) => project.format.uuid === uuid
      );
      setProjects(filteredProjects);
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



  return (
    <DashboardLayout>
      <DashboardNavbar />
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
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateProject formatUuid={uuid} />
      </SoftBox>
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Proyectos
      </SoftTypography>
      <DataTable table={{
          columns: [
            { Header: "Nombre", accessor: "name" },
            { Header: "Estado", accessor: "state", width: "10%", badge: true },
            { Header: "Itemizado", accessor: "itemizado", url: true },
          ],
          rows: projects
          }}/>

      <Footer />
    </DashboardLayout>
  );
}

export default ProjectsPage;
