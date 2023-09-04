import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { createUser, updateUser } from "redux/actions/users";
import { validadorEmail } from "utils";
import SoftSelect from "components/SoftSelect";

function Form(props) {
  const dispatch = useDispatch();

  const [first_name, setFirstName] = useState(props.edit ? props.user.first_name : "");
  const [last_name, setLastName] = useState(props.edit ? props.user.last_name : "");
  const [email, setEmail] = useState(props.edit ? props.user.email : "");
  const [group, setGroup] = useState(
    props.edit 
    ? props.user.groups[0].name
    : null
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const roles = [
    { label: "Admin", value: "admin" },
    { label: "Profesor", value: "profesor" },
    { label: "Alumno", value: "alumno" },
  ];

  const handleSubmit = () => {

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("groups", [group]);
    if (group === "admin") {
      formData.append("is_staff", true);
    };
    console.log("Form Data:", Object.fromEntries(formData.entries()));

    if (props.edit) {
      dispatch(updateUser(formData));
    } else {
      formData.append("password", "123456");
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
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </SoftBox>
        <SoftBox px={3}>
          <SoftTypography variant='h6'>Apellido</SoftTypography>
          <SoftInput
            fullWidth
            placeholder='Apellido'
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
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
