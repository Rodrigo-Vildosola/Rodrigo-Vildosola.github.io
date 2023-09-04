import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "components/DataTablePagination";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "redux/actions/jobs";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Card, Grid, Icon, Tooltip } from "@mui/material";
import SoftInput from "components/SoftInput";
import SoftBadge from "components/SoftBadge";
import SoftSelect from "components/SoftSelect";
import Swal from "sweetalert2";
import SoftButton from "components/SoftButton";


function HomePage() {

  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const getJobResponse = useSelector((state) => state.jobs.getJob);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('profile')));
  }, []);
  
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
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Bienvenido a Wavelearn
      </SoftTypography>

      <SoftBox>
        <SoftButton 
          onClick={() => handleClick()}
        >
          Get Job
        </SoftButton>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );

};

export default HomePage;
