import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Card, 
  CardContent, 
  CardMedia,
  FormControl, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  Typography 
} from '@mui/material';

function MultipleChoiceQuestion({ content, answer_choices, correct_choice, diagram, onAnswerSelected }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value[0] === correct_choice) {
      onAnswerSelected(true);
    } else {
      onAnswerSelected(false);
    }
  };

  return (
    <Card variant="outlined" style={{ maxWidth: '60vw', margin: '0 auto' }}>
      {diagram && (
        <CardMedia
          component="img"
          height="300" // Adjusted height
          image={diagram}
          alt="Diagram for the question"
          style={{ objectFit: 'contain' }} // Added to ensure image fits within the specified height
        />
      )}
      
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {content}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup 
            aria-label="multipleChoice"
            name="multipleChoice"
            value={selectedValue}
            onChange={handleChange}
          > 
            {Object.entries(answer_choices).map(([key, value]) => (
              <FormControlLabel key={key} value={key} control={<Radio />} label={value} />
            ))}
          </RadioGroup>
        </FormControl>
        {selectedValue && (
          <Typography variant="body1" color={selectedValue[0] === correct_choice ? 'green' : 'red'}>
            {selectedValue[0] === correct_choice ? 'Correct!' : 'Incorrect. Please try again.'}
          </Typography>
        )}
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
};

export default MultipleChoiceQuestion;
