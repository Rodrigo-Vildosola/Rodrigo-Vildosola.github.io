import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "redux/actions/jobs";
import { transformData } from "utils";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "components/DataTablePagination";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftBadge from "components/SoftBadge";
import SoftSelect from "components/SoftSelect";
import SoftButton from "components/SoftButton";


// @mui material components
import { Card, Grid, Icon, Tooltip, Box, Divider } from "@mui/material";

// soft ui dashboard pro react components
import Social from "layouts/applications/analytics/components/Social";
import DoughnutChart from "examples/Charts/DoughnutCharts/ComplexReportsDoughnutChart";

import curved from "assets/images/curved-images/curved6.jpg";


function HomePage() {

  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const getJobResponse = useSelector((state) => state.jobs.getJob);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('profile')));
  }, [getJobResponse]);
  
  useEffect(() => {
    if (getJobResponse.data) {
      setJobs(getJobResponse.data);
    }
    console.log(jobs);
    console.log(currentUser);
  }, [getJobResponse]);
  
  const handleClick = () => {
    dispatch(getJob());
  }



  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <SoftBox py={3}>
        <SoftBox sx={{
          backgroundImage:({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${curved})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: 'auto', 
          width: '100%',
          borderRadius: '15px'
        }}>
          <SoftTypography 
            variant='h3' 
            textAlign='center' 
            fontWeight='bold'
            style={{ color: '#E0E0E0' }} // Change the color here
          >
            Bienvenido a Wavelearn
          </SoftTypography>
          <SoftTypography 
            variant='h5' 
            textAlign='center' 
            fontWeight='bold'
            style={{ color: '#E0E0E0' }} // Change the color here
          >
            {currentUser.first_name + ' ' + currentUser.last_name}
          </SoftTypography>
        </SoftBox>


        <Divider my={3} />
        {currentUser.ratings && (
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <Social ratings={currentUser.ratings} />
              </Grid>
              <Grid item xs={12} lg={5}>
                <DoughnutChart
                  title="Equilibrio"
                  chart={transformData(currentUser.ratings)}
                  tooltip="Que tan equilibrado es tu conocimiento"
                  action={{
                    type: "internal",
                    route: "/",
                    color: "secondary",
                    label: "see all referrals",
                  }}
                />
              </Grid>
            </Grid>
          </SoftBox>
        )}

        <SoftBox mb={3}>
          <SoftButton 
            onClick={() => handleClick()}
          >
            Empezar tarea
          </SoftButton>
        </SoftBox>


      </SoftBox>
      <Footer />
    </DashboardLayout>
  );

};

export default HomePage;
