import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRatingsProgress } from "redux/actions/users";
import { transformData } from "utils";
import { useNavigate } from "react-router-dom";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { CircularProgress } from "@mui/material";
import SoftBadgeDot from "components/SoftBadgeDot";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

import Globe from "examples/Globe";

import PolarChart from "examples/Charts/PolarChart";



// @mui material components
import { Card, Grid, Icon, Tooltip, Box, Divider } from "@mui/material";

// soft ui dashboard pro react components
import Social from "layouts/applications/analytics/components/Social";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";

import curved from "assets/images/curved-images/curved6.jpg";
import { capitalize } from "utils";


function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [ratingsProgress, setRatingsProgress] = useState(null);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [isLoading, setIsLoading] = useState(true);


  const getRatingsProgressResponse = useSelector((state) => state.users.getRatingsProgress);
  const getUpdateUserRatingResponse = useSelector((state) => state.users.updateUserRating);

  
  useEffect(() => {
    console.log(getUpdateUserRatingResponse);
    if (currentUser && currentUser.email) {
      dispatch(getRatingsProgress({ user_email: currentUser.email }));
    }
  }, [currentUser, getUpdateUserRatingResponse, dispatch]);
  


  useEffect(() => {
    if (getRatingsProgressResponse) {
      setRatingsProgress(getRatingsProgressResponse.data);
      setIsLoading(false);
    }
  }, [getRatingsProgressResponse, isLoading]);
  

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }


  return (
    <DashboardLayout>
      <DashboardNavbar/>
      { getRatingsProgressResponse && (
        <SoftBox py={3}>


          <SoftBox shadow="xl" sx={{
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

            <SoftBox 
              position="absolute" 
              top="14%" 
              right="5%" 
              width="150px" 
              height="150px" 
              style={{ 
                borderRadius: '75px', 
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <PolarChart 
                title="Radar chart" 
                chart={{
                  labels: Object.keys(currentUser.ratings).map((rating) => capitalize(rating.replace(/_/g, " "))),
                  datasets: {
                      label: currentUser.first_name + ' ' + currentUser.last_name,
                      backgroundColors: ["info", "warning", "cool", "error", "success"],
                      data: Object.values(currentUser.ratings).map((rating) => (rating - 1000) / 10),
                    },
                }} 
              />
            </SoftBox>

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
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Globe 
                display={{ xs: "none", md: "block" }}
                position="absolute"
                top="18%"
                right={-70}
                mt={{ xs: -1, lg: 1 }}
                mr={{ xs: 0, lg: 10 }}
                canvasStyle={{ 
                    marginTop: "10rem",
                    width: "80%", 
                    height: "80%" 
                }}
              />
            </Grid>
          </Grid>


          <SoftBox 
            mb={3} 
            style={{ 
              display: 'flex', // Use flexbox
              justifyContent: 'center', // Center horizontally
              alignItems: 'center', // Center vertically
              borderRadius: '25px', 
              overflow: 'hidden' 
            }}
          >
            <SoftButton 
              shadow="xl"
              onClick={() => navigate('/work')}
              style={{
                fontSize: '20px', 
                padding: '15px 30px', 
                borderRadius: '15px', 
                background: 'linear-gradient(45deg, #007BFF 10%, #FF8E53 80%)', 
                color: 'white', 
                transition: '0.5s', 
                marginRight: '10px', 
                '&:hover': {
                  background: 'linear-gradient(-45deg, #007BFF 10%, #FF8E53 80%)', // Change gradient direction on hover
                }
              }}
            >
              {localStorage.getItem('fetchedQuestions') ? 'Continuar Tarea' : 'Empezar Tarea'}
            </SoftButton>
            {localStorage.getItem('fetchedQuestions') && (
              <SoftButton 
                shadow="xl"
                onClick={() => {
                  localStorage.removeItem('fetchedQuestions');
                  localStorage.removeItem('currentIndex');
                  window.location.reload();
                }}
                style={{
                  fontSize: '20px',
                  padding: '15px 30px', 
                  borderRadius: '15px', 
                  background: 'linear-gradient(45deg, #007BFF 10%, #FF8E53 80%)', 
                  color: 'white', 
                  marginLeft: '10px',
                  transition: '0.5s', 
                  '&:hover': {
                    background: 'linear-gradient(-45deg, #007BFF 10%, #FF8E53 80%)', // Change gradient direction on hover
                  }
                }}
              >
                Reiniciar<Icon style={{ fontSize: '30px' }} > rotate_left </Icon>
              </SoftButton>
            )}


          </SoftBox>


          <SoftBox py={3}>
            <SoftBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <SoftBox shadow="xl" style={{ borderRadius: '25px', overflow: 'hidden' }}>
                    <Social 
                      ratings={currentUser.ratings} 
                    />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} lg={6}>
                  {console.log(currentUser.ratings)}
                  <SoftBox  style={{ borderRadius: '25px', overflow: 'hidden' }}>
                    {/* <PolarChart 
                      title="Radar chart" 
                      chart={{
                        labels: Object.keys(currentUser.ratings).map((rating) => capitalize(rating.replace(/_/g, " "))),
                        datasets: {
                            label: currentUser.first_name + ' ' + currentUser.last_name,
                            backgroundColors: ["info", "warning", "cool", "error", "success"],
                            data: Object.values(currentUser.ratings).map((rating) => (rating - 1000) / 10),
                          },
                      }} 
                    /> */}
                  </SoftBox>

                </Grid>
              </Grid>
            </SoftBox>
            { ratingsProgress && (
              <SoftBox mb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={12}>
                    <SoftBox shadow="xl" style={{ borderRadius: '35px', overflow: 'hidden' }}>
                      <DefaultLineChart 
                        title="Tu rating a traves del tiempo"
                        chart={ratingsProgress}
                        description={
                          <SoftBox display="flex" ml={-1}>
                            <SoftBadgeDot color="info" size="sm" badgeContent= "Caracteristicas de las ondas" />
                            <SoftBadgeDot color="dark" size="sm" badgeContent="Efecto doppler" />
                            <SoftBadgeDot color="primary" size="sm" badgeContent="Ondas sonoras" />
                            <SoftBadgeDot color="success" size="sm" badgeContent="Tipos de onda" />
                            <SoftBadgeDot color="warning" size="sm" badgeContent="Vibracion de una cuerda" />
                          </SoftBox>
                        }
                        style={{ borderRadius: '15px' }}
                      />
                    </SoftBox>
                  </Grid>
                </Grid>
              </SoftBox>
            )}
          </SoftBox>

          <Divider my={3} />

        </SoftBox>
      )}
      <Footer />
    </DashboardLayout>
  );
};

export default HomePage;
