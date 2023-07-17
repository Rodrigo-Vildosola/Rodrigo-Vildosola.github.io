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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import SoftTypography from "components/SoftTypography";
import SoftSnackbar from "components/SoftSnackbar";
import { useSelector } from "react-redux";
// Soft UI Dashboard PRO React example components

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const notification = useSelector((state) => state.notifications.notification);
  const [type, settype] = useState();
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <SoftTypography variant='body2' color='white'>
      A simple {name} alert with{" "}
      <SoftTypography
        component='a'
        href='#'
        variant='body2'
        fontWeight='medium'
        color='white'
      >
        an example link
      </SoftTypography>
      . Give it a click if you like.
    </SoftTypography>
  );

  const renderSuccessSB = () => (
    <SoftSnackbar
      color='success'
      icon='check'
      title={notification ? notification.title : ""}
      content={notification ? notification.message : ""}
      dateTime={""}
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = () => (
    <SoftSnackbar
      icon='notifications'
      title={notification ? notification.title : ""}
      content={notification ? notification.message : ""}
      dateTime={""}
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = () => (
    <SoftSnackbar
      color='warning'
      icon='star'
      title={notification ? notification.title : ""}
      content={notification ? notification.message : ""}
      dateTime={""}
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = () => (
    <SoftSnackbar
      color='error'
      icon='warning'
      title={notification ? notification.title : ""}
      content={notification ? notification.message : ""}
      dateTime={""}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  useEffect(() => {
    if (notification == undefined) {
      return;
    } else if (notification.status === "success") {
      setSuccessSB(true);
    } else if (notification.status === "info") {
      setInfoSB(true);
    } else if (notification.status === "warning") {
      setWarningSB(true);
    } else if (notification.status === "error") {
      setErrorSB(true);
    }
  }, [notification]);
  return (
    <div>
      {renderSuccessSB()}
      {renderInfoSB()}
      {renderWarningSB()}
      {renderErrorSB()}
    </div>
  );
}

export default Notifications;
