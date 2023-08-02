import { useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProject, updateProject } from "redux/actions/projects";

function ProjectForm(props) {
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const [name, setName] = useState(props.edit ? props.project.name : "");
  const [itemizado, setItemizado] = useState(null); // State for the document

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("itemizado", itemizado); // Append the document to the form data
    formData.append("format_uuid", uuid); // Append the format UUID to the form data
    console.log("formData", Object.fromEntries(formData.entries()));
    if (props.edit) {
      formData.append("uuid", props.project.uuid);
      dispatch(updateProject(formData));
    } else {
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
          type="file" // Use type="file" to handle document uploads
          onChange={(e) => setItemizado(e.target.files[0])} // Update itemizado state with the selected file
        />
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
