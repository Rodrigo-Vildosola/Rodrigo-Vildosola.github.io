/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "redux/actions/auth";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved9.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cover() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInResponse = useSelector((state) => state.auth.signIn);

  useEffect(() => {
    if (signInResponse != null) {
      if (signInResponse.token) {
        let profile = signInResponse.profile;
        storeLogin();
        navigate("/home");
      } else {
        setLoading(false);
      }
    }
  }, [signInResponse]);

  const storeLogin = () => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("rememberMe", rememberMe);
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    let form = {
      email: e.target.elements[0].value,
      password: e.target.elements[1].value,
    };
    dispatch(signIn(form));
  };

  return (
    <CoverLayout
      title='Bienvenido'
      description='Ingresa tu email y contraseña'
      image={curved9}
    >
      <form onSubmit={handleLogin}>
        <SoftBox mb={2} lineHeight={1.25}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography
              component='label'
              variant='caption'
              fontWeight='bold'
            >
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2} lineHeight={1.25}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography
              component='label'
              variant='caption'
              fontWeight='bold'
            >
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </SoftBox>
        <SoftBox display='flex' alignItems='center'>
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant='button'
            fontWeight='regular'
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Recuerdame
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant='gradient' color='info' type='submit' fullWidth>
            Entrar
          </SoftButton>
        </SoftBox>
      </form>
    </CoverLayout>
  );
}

export default Cover;
