import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { createUser, updateUser } from "redux/actions/users";
import { validadorEmail } from "utils";

function Form(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState(props.edit ? props.user.name : "");
  const [email, setEmail] = useState(props.edit ? props.user.email : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = () => {
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
    }

    const formData = new FormData();
    formData.append("first_name", name);
    formData.append("email", email);
    formData.append("password", password);
    console.log("Form Data:", Object.fromEntries(formData.entries()));

    if (props.edit) {
      dispatch(updateUser(formData));
    } else {
      dispatch(createUser(formData));
    }
  };

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <Card id="user-form" sx={{ overflow: "visible" }}>
      <SoftBox p={3}>
        <SoftTypography variant="h5">
          {props.edit ? "Edit" : "Create"} User
        </SoftTypography>
      </SoftBox>
      <SoftBox px={3}>
        <SoftTypography variant="h6">Name</SoftTypography>
        <SoftInput
          fullWidth
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </SoftBox>
      <SoftBox px={3}>
        <SoftTypography variant="h6">Email</SoftTypography>
        <SoftInput
          fullWidth
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && (
          <SoftTypography variant="body2" color="error">
            {emailError}
          </SoftTypography>
        )}
      </SoftBox>
      <SoftBox px={3}>
        <SoftTypography variant="h6">Password</SoftTypography>
        <SoftInput
          fullWidth
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </SoftBox>
      <SoftBox px={3}>
        <SoftTypography variant="h6">Confirm Password</SoftTypography>
        <SoftInput
          fullWidth
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordError && (
          <SoftTypography variant="body2" color="error">
            {passwordError}
          </SoftTypography>
        )}
      </SoftBox>
      <SoftBox p={3} pt={0}>
        <SoftButton
          variant="contained"
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

export default Form;
