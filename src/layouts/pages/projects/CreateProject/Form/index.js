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

function ProjectForm(props) {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const getClientsResponse = useSelector((state) => state.clients.getClients);
  const getFormatsByClientResponse = useSelector(
    (state) => state.clients.getFormatsByClient
  );

  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const [clients, setClients] = useState([]);
  const [formats, setFormats] = useState([]);
  const [name, setName] = useState(props.edit ? props.project.name : "");
  const [itemizado, setItemizado] = useState(null);
  const [state, setState] = useState(
    props.edit
      ? { label: props.project.state, value: props.project.state }
      : "Pendiente"
  );

  useEffect(() => {
    if (!uuid) {
      dispatch(getClients());
    }
  }, []);

  useEffect(() => {
    if (getClientsResponse.data && !uuid) {
      setClients(getClientsResponse.data);
    }
  }, [getClientsResponse]);

  useEffect(() => {
    if (getFormatsByClientResponse.data) {
      setFormats(getFormatsByClientResponse.data);
    }
  }, [getFormatsByClientResponse]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("state", state.value);
    formData.append("itemizado", itemizado);

    if (props.edit) {
      formData.append("uuid", props.project.uuid);
      dispatch(updateProject(formData));
    } else {
      formData.append("format_uuid", uuid ? uuid : selectedFormat.value);
      dispatch(createProject(formData));
    }
    props.onClose();
  };

  const handleClientChange = (event) => {
    setSelectedClient(event);
    dispatch(getFormatsByClient(event.value));
  };

  const handleFormatChange = (event) => {
    setSelectedFormat(event);
  };

  return (
    <Card id='project-form' sx={{ overflow: "visible" }}>
      <SoftBox px={3} pt={0} pb={1}>
        <SoftTypography variant='h5'>
          {props.edit ? "Editar" : "Crear"} Proyecto
        </SoftTypography>
      </SoftBox>
      <SoftBox px={3} py={1}>
        <SoftTypography variant='h6'>Nombre del Proyecto</SoftTypography>
        <SoftInput
          fullWidth
          placeholder='Nombre'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </SoftBox>
      <SoftBox px={3} py={1}>
        <SoftTypography variant='h6'>Itemizado (Documento)</SoftTypography>
        <SoftInput
          fullWidth
          type='file'
          onChange={(e) => setItemizado(e.target.files[0])}
        />
      </SoftBox>
      <SoftBox px={3} py={1}>
        <SoftTypography variant='h6'>Estado del Proyecto</SoftTypography>
        <SoftSelect
          placeholder='Seleccione el Estado del Proyecto'
          options={[
            { value: "Pendiente", label: "Pendiente" },
            { value: "Adjudicado", label: "Adjudicado" },
            { value: "Rechazado", label: "Rechazado" },
          ]}
          value={state}
          onChange={(selectedOption) => setState(selectedOption)}
        />
        {console.log(state)}
      </SoftBox>

      {!uuid && !props.edit && (
        <SoftBox px={3} py={1}>
          <SoftTypography variant='h6'>Seleccione un Cliente</SoftTypography>
          <SoftSelect
            placeholder='Seleccione un Cliente'
            options={clients.map((client) => ({
              value: client.uuid,
              label: client.name,
            }))}
            value={selectedClient}
            onChange={handleClientChange}
          />
        </SoftBox>
      )}
      {formats.length > 0 && selectedClient && !props.edit && (
        <SoftBox px={3} py={1}>
          <SoftTypography variant='h6'>Seleccione un Formato</SoftTypography>
          <SoftSelect
            placeholder='Seleccione un Formato'
            options={formats.map((format) => ({
              value: format.uuid,
              label: format.name,
            }))}
            value={selectedFormat}
            onChange={handleFormatChange}
          />
        </SoftBox>
      )}

      <SoftBox p={3} pt={0}>
        <SoftButton
          variant='gradient'
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
