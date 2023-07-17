/**
=========================================================
* Soft UI Dashboard PRO React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftEditor from "components/SoftEditor";
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import SoftTagInput from "components/SoftTagInput";
import Checkbox from "@mui/material/Checkbox";
// Settings page components
import SoftInput from "components/SoftInput";
// Data
import SoftButton from "components/SoftButton";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPermission } from "utils";
import { updateFormat } from "redux/actions/clients";
import { createFormat } from "redux/actions/clients";

function Form(props) {
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const [logo, setLogo] = useState(null);
  const [name, setName] = useState(props.edit ? props.format.name : "");

  const handleChangeFile = (e) => {
    console.log(e.target.files[0]);
    setLogo(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("client_uuid", uuid);
    formData.append("name", name);
    formData.append("logo", logo);
    if (props.edit) {
      formData.append("uuid", props.format.uuid);
      dispatch(updateFormat(formData));
    } else {
      formData.append("client_uuid", uuid);
      dispatch(createFormat(formData));
    }
  };

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <Card id='basic-info' sx={{ overflow: "visible" }}>
      <SoftBox p={3}>
        <SoftTypography variant='h5'>
          {props.edit ? "Editar" : "Crear"} Formato
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

      <SoftBox p={3}>
        <SoftTypography variant='h6'>Logo</SoftTypography>
        <SoftInput
          fullWidth
          type='file'
          onChange={(e) => handleChangeFile(e)}
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
          {props.edit ? "Editar" : "Crear"}
        </SoftButton>
      </SoftBox>
    </Card>
  );
}

export default Form;
