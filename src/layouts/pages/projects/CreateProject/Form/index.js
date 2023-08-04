import { useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SoftButton from "components/SoftButton";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProject, updateProject } from "redux/actions/projects";

function ProjectForm(props) {
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const [name, setName] = useState(props.edit ? props.project.name : "");
  const [itemizado, setItemizado] = useState(null);
  const [state, setState] = useState(props.edit ? props.project.state : "Pendiente"); 

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("state", state); 
    formData.append("itemizado", itemizado);
    
    if (props.edit) {
      formData.append("uuid", props.project.uuid);
      dispatch(updateProject(formData));
    } else {
      formData.append("format_uuid", uuid);
      dispatch(createProject(formData));
    }
    props.onClose();
  };

  return (
    <Card id="project-form" sx={{ overflow: "visible" }}>
      <SoftBox p={3}>
        <SoftTypography variant="h5">
          {props.edit ? "Editar" : "Crear"} Proyecto
        </SoftTypography>
      </SoftBox>
      <SoftBox px={3}>
        <SoftTypography variant="h6">Nombre del Proyecto</SoftTypography>
        <SoftInput
          fullWidth
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </SoftBox>
      <SoftBox px={3}>
        <SoftTypography variant="h6">Itemizado (Documento)</SoftTypography>
        <SoftInput
          fullWidth
          type="file"
          onChange={(e) => setItemizado(e.target.files[0])}
        />
      </SoftBox>
      <SoftBox px={3}>
        <SoftTypography variant="h6">Estado del Proyecto</SoftTypography>
        {/* Use MenuItem components for selectable values */}
        <Select
          fullWidth
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="Adjudicado">Adjudicado</MenuItem>
          <MenuItem value="Rechazado">Rechazado</MenuItem>
        </Select>
      </SoftBox>
      <SoftBox p={3} pt={0}>
        <SoftButton
          variant="contained"
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

export default ProjectForm;
