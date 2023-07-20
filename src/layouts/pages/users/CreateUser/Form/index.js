import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { createUser, updateUser } from "redux/actions/users";

function Form(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState(props.edit ? props.user.name : "");
  const [email, setEmail] = useState(props.edit ? props.user.email : "");

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("first_name", name);
    formData.append("email", email);
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
