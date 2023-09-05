import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "redux/actions/jobs";
import { transformData } from "utils";
import { useNavigate } from "react-router-dom";


import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftBadge from "components/SoftBadge";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

import MultipleChoiceQuestion from "../components/multichoice";


// @mui material components
import { Card, Grid, Icon, Tooltip, Box, Divider } from "@mui/material";

// soft ui dashboard pro react components
import Social from "layouts/applications/analytics/components/Social";
import DoughnutChart from "examples/Charts/DoughnutCharts/ComplexReportsDoughnutChart";

import curved from "assets/images/curved-images/curved6.jpg";


function HomePage() {
  const navigate = useNavigate();
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
  }, [getJobResponse]);
  
  const handleClick = () => {
    dispatch(getJob());
    console.log(jobs?.questions?.[0]);
    console.log(currentUser);
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
          <Divider my={3} />
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
          <SoftAvatar
            src={currentUser.avatar}
            alt="user avatar"
            variant="rounded"
            size="lg"  // You can adjust this to "xl" or "xxl" if available, or use width and height below
            sx={{
              width: '150px',  // Adjust this to make the avatar bigger
              height: '150px',  // Adjust this to make the avatar bigger
              mt: 3,
              mb: 3,  // Add bottom margin if needed
              mx: "auto",
              display: "block",
              borderRadius: '50%'  // Ensure it's circular
            }}
          />
          <Divider my={3} />
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
            onClick={() => navigate('/work')}
          >
            Empezar tarea
          </SoftButton>
        </SoftBox>
        
        <Divider my={3} />

      </SoftBox>
      <Footer />
    </DashboardLayout>
  );

};

export default HomePage;
