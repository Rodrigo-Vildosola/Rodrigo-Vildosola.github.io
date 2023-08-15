import { useState, useEffect } from "react";

// @mui core components
import Card from "@mui/material/Card";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { useDispatch } from "react-redux";
import { createRecord, updateRecord } from "redux/actions/records";

function RecordsForm(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState(props.edit ? props.record.name : "");
  const [code, setCode] = useState(props.edit ? props.record.code : "");
  const [document, setDocument] = useState(null);

  const handleChangeFile = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("code", code);
    formData.append("documento", document);
    console.log("Form Data:", Object.fromEntries(formData.entries()));

    if (props.edit) {
      formData.append("uuid", props.record.uuid);
      dispatch(updateRecord(formData));
    } else {
      dispatch(createRecord(formData));
    }
  };

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <Card id='record-info' sx={{ overflow: "visible" }}>
      <SoftBox px={3} pt={0} pb={1}>
        <SoftTypography variant='h5'>
          {props.edit ? "Editar" : "Crear"} Ficha
        </SoftTypography>
      </SoftBox>

      <SoftBox px={3} py={1}>
        <SoftTypography variant='h6'>Nombre</SoftTypography>
        <SoftInput
          fullWidth
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </SoftBox>

      <SoftBox px={3} py={1}>
        <SoftTypography variant='h6'>Código</SoftTypography>
        <SoftInput
          fullWidth
          placeholder='Code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </SoftBox>

      <SoftBox px={3} py={1}>
        <SoftTypography variant='h6'>Documento</SoftTypography>
        <SoftInput fullWidth type='file' onChange={handleChangeFile} />
      </SoftBox>

      <SoftBox p={3} py={2}>
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

export default RecordsForm;
