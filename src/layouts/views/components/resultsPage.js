import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Card, 
  CardContent, 
  CardMedia,
  Divider,
  TextField, 
  Typography 
} from '@mui/material';
import SoftInput from 'components/SoftInput';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import Swal from "sweetalert2";

function ResultsComponent({ onReset }) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Quiz Results</h2>
        {/* You can display more detailed results
         here if needed */}
        <p>Thank you for completing the quiz!</p>
        <SoftButton 
          variant="contained" 
          color="primary" 
          onClick={onReset}
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
          Volver al Menu
        </SoftButton>
      </div>
    );
  }
  

export default ResultsComponent;
