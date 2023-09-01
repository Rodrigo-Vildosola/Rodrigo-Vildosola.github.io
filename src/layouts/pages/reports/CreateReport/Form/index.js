import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";

import { getProjects } from "redux/actions/projects";

import { useParams } from "react-router-dom";
import { createReport, updateReport } from "redux/actions/reports";


function ReportForm(props) {

  const dispatch = useDispatch();

  const getProjectsResponse = useSelector((state) => state.projects.getProjects);

  const [name, setName] = useState(props.edit ? props.report.name : "");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!props.edit) {
      dispatch(getProjects({ no_pagination: "true" }));
    }
  }, []);

  useEffect(() => {
    if (getProjectsResponse.data && !props.edit) {
      setProjects(getProjectsResponse.data.results);
    }
  }, [getProjectsResponse]);
  
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    if (props.edit) {
      formData.append("uuid", props.report.uuid);
      dispatch(updateReport(formData));
    } else {
      formData.append("project_uuid", selectedProject.value);
      dispatch(createReport(formData));
    }
    props.onClose();
  };

  useEffect(() => {
    console.log(props);
  }, []);

  const handleProjectChange = (event) => {
    setSelectedProject(event);
  }


  return (
    <Card id='basic-info' sx={{ overflow: "visible" }}>
      <SoftBox p={3} pt={0}>
        <SoftTypography variant='h5'>
          {props.edit ? "Editar" : "Crear"} Reporte
        </SoftTypography>
      </SoftBox>
      <SoftBox px={3}>
        <SoftTypography variant='h6'>Nombre</SoftTypography>
        <SoftInput
          fullWidth
          placeholder='Nombre'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </SoftBox>
      {!props.edit && (
        <SoftBox px={3} py={1}>
          <SoftTypography variant='h6'>Seleccione un Proyecto</SoftTypography>
          <SoftSelect
            placeholder='Seleccione un Proyecto'
            options={projects.map((project) => ({
              value: project.uuid,
              label: project.name,
            }))}
            value={selectedProject}
            onChange={handleProjectChange}
          />
        </SoftBox>
      )}
      <SoftBox p={3} pt={0}>
        <SoftButton
          variant='contained'
          component='label'
          color={props.edit ? "warning" : "success"}
          fullWidth
          onClick={handleSubmit}
        >
          {props.edit ? "Editar" : "Crear"}
        </SoftButton>
      </SoftBox>
    </Card>
  );
}

export default ReportForm;
