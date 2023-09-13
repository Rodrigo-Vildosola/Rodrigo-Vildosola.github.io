import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Card, 
  CardContent, 
  CardMedia,
  Divider,
} from '@mui/material';
import SoftInput from 'components/SoftInput';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import Swal from "sweetalert2";

function FreeResponseQuestion({ question, solution, formula, diagram, onAnswerSubmitted, enable }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);

  const [showHint, setShowHint] = useState(false); // New state for showing hint

  const handleShowHint = () => {
    setShowHint(true);
  };

  console.log("solution: ", solution)

  const handleSubmit = () => {
    setAttempts(attempts + 1); // Increment attempts on each submission

    if (userAnswer === solution) {
      Swal.fire({
        title: "You answered correctly!!",
        timer: 2000,
        timerProgressBar: true,
        icon: "success",
      });
      onAnswerSubmitted(true);
      enable(true);
    } else {
      Swal.fire({
        title: "Incorrect, please try again.",
        timer: 2000,
        timerProgressBar: true,
        icon: "error",
      });
      if (attempts === 1) {
        onAnswerSubmitted(false);
        enable(true);
      }
    }
  };

  return (
    <Card variant="outlined" style={{ maxWidth: '60vw', margin: '0 auto', shadow: "xl", borderRadius: "25px" }}>
      {diagram && !diagram.includes("not_available.jpeg") && (
        <CardMedia
          component="img"
          height="300"
          image={diagram}
          alt="Diagram for the question"
          style={{ objectFit: 'contain', shadow: "xl", borderRadius: "25px" }}
        />
      )}
      <Divider />
      
      <CardContent>
        <SoftTypography variant="h5" gutterBottom>
          {question}
        </SoftTypography>
        <SoftInput 
          placeholder="Tu respuesta"
          variant="outlined"
          fullWidth
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {attempts < 2 && ( // Render button only for the first two attempts
            <SoftButton 
              variant="contained" 
              onClick={handleSubmit} 
              disabled={!userAnswer}
              style={{
                fontSize: '15px', 
                padding: '10px 10px', 
                borderRadius: '15px', 
                background: 'linear-gradient(45deg, #007BFF 10%, #FF8E53 80%)', 
                color: 'white', 
                transition: '0.5s', 
                '&:hover': {
                  background: 'linear-gradient(-45deg, #007BFF 10%, #FF8E53 80%)',
                }
              }}
            >
              Submit Answer
            </SoftButton>
          )}


          {attempts === 1 && !showHint && (
            <SoftButton 
              variant="contained" 
              onClick={handleShowHint} 
              style={{
                marginLeft: '10px',
                fontSize: '15px', 
                padding: '10px 10px', 
                borderRadius: '15px', 
                background: 'linear-gradient(45deg, #FFC107 10%, #FF8E53 80%)', 
                color: 'white', 
                transition: '0.5s', 
                '&:hover': {
                  background: 'linear-gradient(-45deg, #FFC107 10%, #FF8E53 80%)',
                }
              }}
            >
              Hint
            </SoftButton>
          )}
        </div>

        {showHint && (
          <SoftTypography variant="body1" style={{ marginTop: '20px', fontStyle: 'italic' }}>
            Hint: {formula}
          </SoftTypography>
        )}
      </CardContent>
    </Card>
  );
}

FreeResponseQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  solution: PropTypes.string.isRequired,
  formula: PropTypes.string,
  diagram: PropTypes.string,
  onAnswerSubmitted: PropTypes.func.isRequired,
  enable: PropTypes.func.isRequired,
};

export default FreeResponseQuestion;
