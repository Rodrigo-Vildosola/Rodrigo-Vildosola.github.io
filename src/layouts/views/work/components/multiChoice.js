import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Card, 
  CardContent, 
  CardMedia,
  Divider,
  FormControl, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  Typography,
  Grid 
} from '@mui/material';
import SoftButton from 'components/SoftButton';
import Swal from "sweetalert2";

function MultipleChoiceQuestion({ 
  content, 
  answer_choices, 
  correct_choice, 
  diagram, 
  onAnswerSelected, 
  enable 
}) {
  const [selectedValue, setSelectedValue] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleChange = (event) => {
    setSelectedValue(event.target.value[0]);
  };

  const handleSubmit = () => {
    if (selectedValue === correct_choice) {
      onAnswerSelected(true, selectedValue, answer_choices[correct_choice]);
      enable(true);
    } else {
      onAnswerSelected(false, selectedValue, answer_choices[correct_choice]);
      enable(true);
    }
    setDisabled(true); // Disable further submissions after one attempt
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
        <Typography variant="h5" gutterBottom>
          {content}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup 
            aria-label="multipleChoice"
            name="multipleChoice"
            value={selectedValue}
            onChange={handleChange}
            disabled={!selectedValue}
          > 
            {Object.entries(answer_choices).map(([key, value]) => (
              <FormControlLabel key={key} value={key} control={<Radio />} label={value} />
            ))}
          </RadioGroup>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {!disabled && ( // Render button only for the first two attempts
              <SoftButton 
                variant="contained" 
                onClick={handleSubmit} 
                disabled={!selectedValue || disabled}
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
          </div>
        </FormControl>
      </CardContent>
    </Card>
  );
}

MultipleChoiceQuestion.propTypes = {
  content: PropTypes.string.isRequired,
  answer_choices: PropTypes.object.isRequired,
  correct_choice: PropTypes.string.isRequired,
  diagram: PropTypes.string,
  onAnswerSelected: PropTypes.func.isRequired,
  enable: PropTypes.func.isRequired,
};

export default MultipleChoiceQuestion;
