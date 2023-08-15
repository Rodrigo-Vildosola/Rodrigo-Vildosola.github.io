

import { useState, useEffect } from "react";

// @mui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { useSelector, useDispatch } from "react-redux";
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
      <SoftBox p={3}>
        <SoftTypography variant='h5'>
          {props.edit ? "Edit" : "Create"} Record
        </SoftTypography>
      </SoftBox>
      
      <SoftBox px={3}>
        <SoftTypography variant='h6'>Name</SoftTypography>
        <SoftInput
          fullWidth
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </SoftBox>

      <SoftBox px={3}>
        <SoftTypography variant='h6'>Code</SoftTypography>
        <SoftInput
          fullWidth
          placeholder='Code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </SoftBox>

      <SoftBox p={3}>
        <SoftTypography variant='h6'>Document</SoftTypography>
        <SoftInput
          fullWidth
          type='file'
          onChange={handleChangeFile}
        />
      </SoftBox>

      <SoftBox p={3} pt={0}>
        <SoftButton
          variant='contained'
          component='label'
          color={props.edit ? "warning" : "success"}
          fullWidth
          onClick={handleSubmit}
        >
          {props.edit ? "Edit" : "Create"}
        </SoftButton>
      </SoftBox>
    </Card>
  );
}

export default RecordsForm;
