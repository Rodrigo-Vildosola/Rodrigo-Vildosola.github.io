import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "redux/actions/projects"; // Assuming you have an action for getting projects
import { useParams } from "react-router-dom";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// MUI components
import { Grid, Icon, Table, TableRow } from "@mui/material";

// import ProjectCard from "examples/Cards/ProjectCard";
import CreateProject from "./CreateProject";


function ProjectsPage() {
  const {formatUuid } = useParams();
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
    dispatch(getProjects()); // Assuming you have an action to get projects
  }, []);

  useEffect(() => {
    if (getProjectsResponse.data) {
      // Filter projects by the formatUuid since the request returns all instances of projects
      const filteredProjects = getProjectsResponse.data.filter(
        (project) => project.format === formatUuid
      );
      setProjects(filteredProjects);
    }
  }, [getProjectsResponse, formatUuid]);

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
          color='black'
        >
          <Icon>arrow_back</Icon> Volver
        </SoftButton>
      </SoftBox>
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateProject formatUuid={formatUuid} />
      </SoftBox>
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Proyectos
      </SoftTypography>
      <Grid container spacing={3}>
        {projects.map((project, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            {console.log(project)}
            {/* <ProjectCard project={project} action={{}} /> */}
          </Grid>
        ))}
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}

export default ProjectsPage;
