import React, { useState } from 'react';
import { TextField, Grid, Paper } from '@mui/material';
import SoftButton from 'components/SoftButton';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === '√') {
      try {
        setResult(Math.sqrt(parseFloat(input)).toString());
      } catch (error) {
        setResult('Error');
      }
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '300px', margin: '20px auto' }}>
      <TextField
        fullWidth
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        helperText={result}
      />
      <Grid container spacing={1} style={{ marginTop: '20px' }}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '-', '*', '/', '√', '^'].map((item) => (
          <Grid item xs={4} key={item}>
            <SoftButton 
                variant="contained" 
                style={{
                    background: 'linear-gradient(45deg, #673AB7 30%, #8E24AA 90%)',
                    color: 'white'
                }} 
                onClick={() => handleButtonClick(item)}
            >
              {item}
            </SoftButton>
          </Grid>
        ))}
        <Grid item xs={6}>
          <SoftButton variant="contained" style={{background: 'linear-gradient(45deg, #3F51B5 30%, #303F9F 90%)', color: 'white'}} onClick={handleCalculate}>
            =
          </SoftButton>
        </Grid>
        <Grid item xs={6}>
          <SoftButton variant="contained" style={{background: 'linear-gradient(45deg, #E53935 30%, #D32F2F 90%)', color: 'white'}} onClick={handleClear}>
            Clear
          </SoftButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Calculator;
