import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

import SoftDropzone from "components/SoftDropzone";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";

import { getClients, getFormatsByClient } from "redux/actions/clients";

import { useParams } from "react-router-dom";
import { createProject, updateProject } from "redux/actions/projects";
import { createElements } from "redux/actions/projects";

function ItemizadoForm(props) {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const getClientsResponse = useSelector((state) => state.clients.getClients);
  const getFormatsByClientResponse = useSelector(
    (state) => state.clients.getFormatsByClient
  );
  const [itemizado, setItemizado] = useState(null);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("project_uuid", props.project.uuid);
    formData.append("file", itemizado);
    dispatch(createElements(formData));
    props.onClose();
  };

  return (
    <Card id='project-form' sx={{ overflow: "visible" }}>
      <SoftBox p={3}>
        <SoftTypography variant='h5'>Subir Itemizado</SoftTypography>
      </SoftBox>
      <SoftBox px={3}>
        <SoftTypography variant='h6'>Itemizado (Documento)</SoftTypography>
        <SoftInput
          fullWidth
          type='file'
          onChange={(e) => setItemizado(e.target.files[0])}
        />
      </SoftBox>

      <SoftBox p={3} pt={0}>
        <SoftButton
          variant='contained'
          color={props.edit ? "warning" : "success"}
          fullWidth
          onClick={handleSubmit}
        >
          {props.edit ? "Subir" : "Crear"}
        </SoftButton>
      </SoftBox>
    </Card>
  );
}

export default ItemizadoForm;
