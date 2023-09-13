import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "redux/actions/jobs";
import { capitalize } from "utils";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import { updateUserRating } from "redux/actions/jobs";

import { CircularProgress } from '@mui/material';

import BasicLayout from "layouts/authentication/components/BasicLayout";

import MultipleChoiceQuestion from "layouts/views/work/components/multiChoice";
import FreeResponseQuestion from "layouts/views/work/components/freeResponse";
import ResultsComponent from "layouts/views/work/components/resultsPage";



import SoftTypography from "components/SoftTypography";
// Images
import curved8 from "assets/images/curved-images/curved8.jpg";



function WorkPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getJobResponse = useSelector((state) => state.jobs.getJob);

  const [currentIndex, setCurrentIndex] = useState(0); 

  const [results, setResults] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false); 

  const handleAnswerSelection = (isCorrect) => {
    setIsAnsweredCorrectly(isCorrect);
    setResults(prevResults => [...prevResults, {
      question: jobs.questions[currentIndex].content || jobs.questions[currentIndex].question,
      isCorrect: isCorrect
    }]);
  };
  

  const handleResetStorage = () => {
    console.log("resetting storage");
    localStorage.removeItem('fetchedQuestions');
    localStorage.removeItem('currentIndex');
    navigate("/home");
  }

  const handleForm = async () => {
    setCurrentIndex(currentIndex + 1);
    const formData = {
      "email": currentUser.email,
      "ratings": jobs.questions[currentIndex].rating,
      "result": isAnsweredCorrectly,
    }
  
    await dispatch(updateUserRating(formData));
  }
  
  const handleNext = async () => {
    await handleForm();

    localStorage.setItem('currentIndex', currentIndex + 1);

    setCurrentIndex(currentIndex + 1);
    setIsAnsweredCorrectly(false); 
    setEnabled(false);
    

  };

  useEffect(() => {
    const storedQuestions = localStorage.getItem('fetchedQuestions');
    const storedIndex = localStorage.getItem('currentIndex');
    console.log(localStorage.getItem('fetchedQuestions'))
    console.log(localStorage.getItem('currentIndex'))

    if (storedQuestions && storedIndex) {

      setJobs(JSON.parse(storedQuestions));
      setCurrentIndex(parseInt(storedIndex));
      setCurrentUser(JSON.parse(localStorage.getItem('profile')));
      setIsLoading(false);
    } else {
      dispatch(getJob());
    }
  }, [dispatch]);
  
  useEffect(() => {
    if (getJobResponse.data) {

      localStorage.setItem('fetchedQuestions', JSON.stringify(getJobResponse.data));

      setJobs(getJobResponse.data);
      setCurrentUser(JSON.parse(localStorage.getItem('profile')));
      setIsLoading(false);
    }
  }, [getJobResponse]);
  


  const multiChoice = (jobs) => {
    return (
      <MultipleChoiceQuestion
        key={jobs.questions[currentIndex].uuid}
        content={jobs.questions[currentIndex].content}
        answer_choices={jobs.questions[currentIndex].answer_choices}
        correct_choice={jobs.questions[currentIndex].correct_answer}
        diagram={jobs.questions[currentIndex].diagram}
        onAnswerSelected={handleAnswerSelection}
        enable={setEnabled}
      />
    );
  }

  const freeResponse = (jobs) => {
    return (
      <FreeResponseQuestion
        key={jobs.questions[currentIndex].uuid}
        question={jobs.questions[currentIndex].question}
        solution={jobs.questions[currentIndex].solution}
        formula={jobs.questions[currentIndex].formula}
        diagram={jobs.questions[currentIndex].diagram}
        onAnswerSubmitted={handleAnswerSelection}
        enable={setEnabled}
      />
    );
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }


  return (
    <BasicLayout image={curved8} title={capitalize(jobs.theme).replace(/_/g, " ")}>      
      {!enabled && currentIndex < 2 ? (
        multiChoice(jobs)
      ) : !enabled && currentIndex === 2 ? (
        freeResponse(jobs)
      ) : currentIndex > 2 && (
        <ResultsComponent onReset={handleResetStorage} results={results}/>
      )}



      { enabled && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <SoftButton 
            variant="contained" 
            color="primary" 
            onClick={handleNext} 
            disabled={!enabled}
            style={{
              fontSize: '20px', 
              padding: '15px 30px', 
              borderRadius: '15px', 
              background: 'linear-gradient(45deg, #007BFF 10%, #FF8E53 80%)', 
              color: 'white', 
              transition: '0.5s', 
              '&:hover': {
                background: 'linear-gradient(-45deg, #007BFF 10%, #FF8E53 80%)', // Change gradient direction on hover
              }
            }}
          >
            {currentIndex === 2 ? "Terminar Tarea" : "Siguiente Pregunta"}
          </SoftButton>
        </div>
      )}
    </BasicLayout>
  );
}

export default WorkPage;
