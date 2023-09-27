import React from 'react';
import PropTypes from 'prop-types';
import { 
  Card, 
  CardContent, 
  Divider, 
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';

function ResultsComponent({ onReset, results, onRetake }) {
  return (
    <Card style={{ borderRadius: '15px', padding: '20px', margin: '20px' }}>
      <CardContent>
        <SoftTypography variant="h3" align="center">
          Resultados de la Tarea
        </SoftTypography>
        <Divider style={{ margin: '20px 0' }} />
        <List>
          {results.map((result, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={
                  <>
                    <SoftTypography variant="h4" align="center" fontWeight="bold">
                      Pregunta {index + 1}: {result.isCorrect ? " Correcta" : " Incorrecta"}
                    </SoftTypography>
                    <SoftTypography variant="h5" align="center" fontWeight="medium">
                      {onRetake ? 
                        `Tu respuesta: ${result.answer}` :
                        `Tu respuesta: ${result.answer} Respuesta correcta: ${result.correct_answer}`
                      }
                    </SoftTypography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        <Divider style={{ margin: '20px 0' }} />
        <SoftTypography variant="body1" align="center" style={{ marginBottom: '20px' }}>
          Gracias por participar en esta tarea!
        </SoftTypography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {onRetake && ( 
            <SoftButton 
              variant="contained" 
              color="primary" 
              onClick={onRetake}
              style={{
                fontSize: '20px', 
                padding: '15px 30px', 
                borderRadius: '15px', 
                background: 'linear-gradient(45deg, #007BFF 10%, #FF8E53 80%)', 
                color: 'white', 
                transition: '0.5s',
                marginRight: '20px', 
                '&:hover': {
                  background: 'linear-gradient(-45deg, #007BFF 10%, #FF8E53 80%)', // Change gradient direction on hover
                }
              }}
            >
              Reintentar Tarea
            </SoftButton>
          )}
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
      </CardContent>
    </Card>
  );
}

export default ResultsComponent;
