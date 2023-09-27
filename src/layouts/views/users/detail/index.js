import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useDispatch, useSelector } from "react-redux";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Card, Grid, Icon } from "@mui/material";
import { getUser } from "redux/actions/users"; 
import Social from "layouts/applications/analytics/components/Social";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import SoftBadgeDot from "components/SoftBadgeDot";
import SoftAvatar from "components/SoftAvatar";


function UserDetail() {
  const dispatch = useDispatch();
  const { email } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [ratingsProgress, setRatingsProgress] = useState({});
  const getUserResponse = useSelector((state) => state.users.getUser);

  useEffect(() => {
    dispatch(getUser({email: email}));
  }, []);

  useEffect(() => {
    if (getUserResponse.data) {
      setUser(getUserResponse.data.user);
      setRatingsProgress(getUserResponse.data.rating_progress);
    }
  }, [getUserResponse]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox>
        <SoftButton
          onClick={() => {
            window.history.back();
          }}
          variant='text'
          color='dark'
        >
          <Icon>arrow_back</Icon> Volver
        </SoftButton>
      </SoftBox>
      <SoftBox>
        <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
          Dashboard de Usuario
        </SoftTypography>
      </SoftBox>
      <Card sx={{ p: 3, mt: 2, boxShadow: 3, borderRadius: 10 }}>
        <SoftBox p={3}>
          <SoftAvatar
              src={user.avatar}
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
          <SoftTypography variant='h4' fontWeight='medium'>
            User Information
          </SoftTypography>
          <SoftTypography variant='h6'>
            Name: {user.first_name} {user.last_name}
          </SoftTypography>
          <SoftTypography variant='h6'>Email: {user.email}</SoftTypography>
          <SoftTypography variant='h6'>
            Date Joined: {new Date(user.date_joined).toLocaleDateString()}
          </SoftTypography>
          {/* Add more user details as needed */}
        </SoftBox>
      </Card>
      {console.log(user)}
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <SoftBox shadow="xl" style={{ borderRadius: '25px', overflow: 'hidden' }}>
                {user.ratings && (
                  <Social 
                    ratings={user.ratings} 
                  />
                )}
              </SoftBox>
            </Grid>
            
          </Grid>
        </SoftBox>
        { ratingsProgress && (
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <SoftBox shadow="xl" style={{ borderRadius: '35px', overflow: 'hidden' }}>
                  <GradientLineChart 
                    title="Tu rating a traves del tiempo"
                    chart={ratingsProgress}
                    description={
                      <SoftBox display="flex" ml={-1}>
                        <SoftBadgeDot color="info" size="sm" badgeContent= "Caracteristicas de las ondas" />
                        <SoftBadgeDot color="warning" size="sm" badgeContent="Efecto doppler" />
                        <SoftBadgeDot color="primary" size="sm" badgeContent="Ondas sonoras" />
                        <SoftBadgeDot color="error" size="sm" badgeContent="Tipos de onda" />
                        <SoftBadgeDot color="success" size="sm" badgeContent="Vibracion de una cuerda" />
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

      <Footer />
    </DashboardLayout>
  );
}

export default UserDetail;
