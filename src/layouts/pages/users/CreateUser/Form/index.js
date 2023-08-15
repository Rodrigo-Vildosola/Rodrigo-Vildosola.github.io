import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { createUser, updateUser } from "redux/actions/users";
import { validadorEmail } from "utils";
import form from "../../new-user/schemas/form";
import SoftSelect from "components/SoftSelect";

function Form(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState(props.edit ? props.user.first_name : "");
  const [email, setEmail] = useState(props.edit ? props.user.email : "");
  const [group, setGroup] = useState(props.edit ? props.user.groups[0] : null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const roles = [
    { label: "Administrador", value: "administrador" },
    { label: "Tipo 1", value: "tipo1" },
    { label: "Tipo 2", value: "tipo2" },
    { label: "Tipo 3", value: "tipo3" },
  ];

  const handleSubmit = () => {
    /*
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    } else if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (!validadorEmail(email)) {
      setEmailError("Invalid email address");
      return;
    } */

    const formData = new FormData();
    formData.append("first_name", name);
    formData.append("email", email);
    formData.append("groups", [group]);
    console.log("Form Data:", Object.fromEntries(formData.entries()));

    if (props.edit) {
      dispatch(updateUser(formData));
    } else {
      formData.append("password", "acceso2023");
      dispatch(createUser(formData));
    }
  };

  useEffect(() => {}, []);

  return (
    <Card id='user-form' sx={{ overflow: "visible" }}>
      <SoftBox py={2}>
        <SoftBox px={3} pb={1} pt={0}>
          <SoftTypography variant='h5'>
            {props.edit ? "Editar" : "Crear"} Usuario
          </SoftTypography>
        </SoftBox>
        <SoftBox px={3}>
          <SoftTypography variant='h6'>Nombre</SoftTypography>
          <SoftInput
            fullWidth
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </SoftBox>
        <SoftBox px={3}>
          <SoftTypography variant='h6'>Email</SoftTypography>
          <SoftInput
            fullWidth
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <SoftTypography variant='body2' color='error'>
              {emailError}
            </SoftTypography>
          )}
        </SoftBox>
        <SoftBox px={3}>
          <SoftTypography variant='h6'>Rol</SoftTypography>
          <SoftSelect
            options={roles}
            option={group}
            onChange={(e) => {
              setGroup(e.value);
            }}
          />
        </SoftBox>
      </SoftBox>
      {/* 
      <SoftBox px={3}>
        <SoftTypography variant='h6'>Contraseña</SoftTypography>
        <SoftInput
          fullWidth
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </SoftBox>
      <SoftBox px={3}>
        <SoftTypography variant='h6'>Confirmar contraseña</SoftTypography>
        <SoftInput
          fullWidth
          placeholder='Confirm Password'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordError && (
          <SoftTypography variant='body2' color='error'>
            {passwordError}
          </SoftTypography>
        )}
      </SoftBox>
     */}
      <SoftBox p={3} pt={0}>
        <SoftButton
          variant='contained'
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
