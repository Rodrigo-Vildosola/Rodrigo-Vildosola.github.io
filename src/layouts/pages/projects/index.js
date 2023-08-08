/* eslint-disable react-hooks/exhaustive-deps */
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
import { Icon } from "@mui/material";

import CreateProject from "./CreateProject";


function ProjectsPage() {
  const { uuid } = useParams();
  const dispatch = useDispatch();
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
    if (getProjectsResponse.data && uuid) {
      const filteredProjects = getProjectsResponse.data.filter(
        (project) => project.format.uuid === uuid
      );
      setProjects(filteredProjects);
    }
    else if (getProjectsResponse.data) {
      setProjects(getProjectsResponse.data);
    }
    console.log(projects);
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



  const extractedDataArray = projects.map((projectData) => ({
    name: projectData.name,
    itemizado: projectData.itemizado,
    state: projectData.state,
    project: projectData,
    formatName: projectData.format.name,
    clientName: projectData.format.client.name,
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
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Proyectos
      </SoftTypography>
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateProject/>
      </SoftBox>

      <DataTable table={{
          columns: [
            { Header: "Nombre", accessor: "name" },
            { Header: "Estado", accessor: "state", badge: true },
            { Header: "Cliente", accessor: "clientName" },
            { Header: "Formato", accessor: "formatName" },
            { Header: "Itemizado", accessor: "itemizado", url: true },
            { Header: "", accessor: "project", width: "10%", edit: true},
          ],
          rows: extractedDataArray
          }}/>

      <Footer />
    </DashboardLayout>
  );
}

export default ProjectsPage;
