import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "redux/actions/jobs";
import { capitalize } from "utils";
import SoftButton from "components/SoftButton";
import { Button } from '@mui/material';
import { updateUserRating } from "redux/actions/jobs";

import { CircularProgress } from '@mui/material';


import MultipleChoiceQuestion from "../components/multichoice";
import SoftTypography from "components/SoftTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";




function WorkPage() {

  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getJobResponse = useSelector((state) => state.jobs.getJob);

  const [currentIndex, setCurrentIndex] = useState(0); 

  const [attempts, setAttempts] = useState(0); 
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false); 

  const handleAnswerSelection = (isCorrect) => {
    if (isCorrect) {
      setIsAnsweredCorrectly(true);
    } else {
      setAttempts(prevAttempts => {
        if (prevAttempts + 1 >= 2) {
          handleNext(); 
          return 0;
        }
        return prevAttempts + 1;
      });
    }
  };

  const handleForm = async () => {
    const formData = {
      "email": currentUser.email,
      "ratings": jobs.questions[0][currentIndex].rating,
      "result": isAnsweredCorrectly,
    }
    console.log(formData);
  
    await dispatch(updateUserRating(formData));
  }
  
  const handleNext = async () => {
    if (currentIndex < jobs.questions[0].length - 1) {
      await handleForm();
  
      setCurrentIndex(currentIndex + 1);
      setIsAnsweredCorrectly(false); 
      setAttempts(0);
    }
  };

  useEffect(() => {
    dispatch(getJob());
  }, [dispatch]);
  
  useEffect(() => {
    if (getJobResponse.data) {
      setJobs(getJobResponse.data);
      setCurrentUser(JSON.parse(localStorage.getItem('profile')));
      setIsLoading(false);
    }
  }, [getJobResponse]);
  

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }


  return (
    <DashboardLayout>
      {console.log(currentUser)}
      <DashboardNavbar/>
      <SoftTypography variant="h3" fontWeight="medium" mb={3} textAlign='center'>
        {capitalize(jobs.theme).replace(/_/g, " ")}
      </SoftTypography>

      <MultipleChoiceQuestion
        key={jobs.questions[0][currentIndex].uuid}
        content={jobs.questions[0][currentIndex].content}
        answer_choices={jobs.questions[0][currentIndex].answer_choices}
        correct_choice={jobs.questions[0][currentIndex].correct_answer}
        diagram={jobs.questions[0][currentIndex].diagram}
        onAnswerSelected={handleAnswerSelection}
      />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <SoftButton variant="contained" color="primary" onClick={handleNext} style={{ marginLeft: '10px' }} disabled={!isAnsweredCorrectly || attempts >= 2}>
          Next
        </SoftButton>
      </div>
    </DashboardLayout>
  );
}

export default WorkPage;
