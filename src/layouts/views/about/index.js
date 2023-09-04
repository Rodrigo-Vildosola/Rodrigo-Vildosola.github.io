import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';

function AboutUs() {
  return (
    <DashboardLayout>
        <Container>
        <Box mt={5}>
            <Typography variant="h2" align="center" gutterBottom>
            About Us
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary">
            Learn more about our company and our journey.
            </Typography>
        </Box>

        <Box mt={5}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                <Box p={3}>
                    <Typography variant="h5" gutterBottom>
                    Our Story
                    </Typography>
                    <Typography>
                    We started our journey in 2020 with a mission to provide the best services in the industry. Our team is passionate about what we do, and we strive to make a difference in the lives of our customers.
                    </Typography>
                </Box>
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                <Box p={3}>
                    <Typography variant="h5" gutterBottom>
                    Our Vision
                    </Typography>
                    <Typography>
                    Our vision is to be the leading provider in our domain, recognized for our commitment to quality, innovation, and customer satisfaction.
                    </Typography>
                </Box>
                </Paper>
            </Grid>
            </Grid>
        </Box>

        <Box mt={5} display="flex" justifyContent="center">
            <img
            src="https://via.placeholder.com/600x400"
            alt="About Us"
            style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
        </Box>

        <Box mt={5}>
            <Typography variant="h5" gutterBottom>
            Meet Our Team
            </Typography>
            <Typography>
            Our team consists of dedicated professionals from diverse backgrounds, all working together to achieve excellence in what we do. We believe in collaboration, continuous learning, and pushing the boundaries.
            </Typography>
        </Box>
        </Container>
    </DashboardLayout>
  );
}

export default AboutUs;
