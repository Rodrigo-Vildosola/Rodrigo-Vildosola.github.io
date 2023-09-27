import { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import { Divider, Grid, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";
import { createQuestion, updateQuestion } from "redux/actions/questions";

function QuestionForm(props) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(props.edit ? props.question.content : "");
  const [correctAnswer, setCorrectAnswer] = useState(props.edit ? props.question.correct_answer : "");
  const [answerChoices, setAnswerChoices] = useState(props.edit ? props.question.answer_choices : {});
  const [rating, setRating] = useState(props.edit ? props.question.rating : {});
  const [theme, setTheme] = useState(props.edit ? props.question.theme : "");
  const [validationErrors, setValidationErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const themes = [
    { label: "Ondas Sonoras", value: "ondas_sonoras" },
    { label: "Efecto Doppler", value: "efecto_doppler" },
    { label: "Características de las Ondas", value: "caracteristicas_de_las_ondas" },
    { label: "Tipos de Ondas", value: "tipos_de_ondas" },
    { label: "Vibración de una Cuerda", value: "vibracion_de_una_cuerda"}
  ];

  const handleSubmit = () => {
    const questionData = {
      content: content,
      correct_answer: correctAnswer,
      answer_choices: answerChoices,
      rating: rating,
      theme: theme,
      uuid: props.edit ? props.question.uuid : null,
    };
    console.log("Question Data:", questionData);
    if (props.edit) {
      dispatch(updateQuestion(questionData));
    } else {
      dispatch(createQuestion(questionData));
    }

  };

  return (
    <Card id='question-form' sx={{ overflow: "visible" }}>
      <SoftBox py={2}>
        <SoftBox px={3} pb={1} pt={0} justifyContent="center" display="flex">
          <SoftTypography variant='h4' fontWeight='bold' color="dark">
            {props.edit ? 'Editar Pregunta' : 'Crear Pregunta'}
          </SoftTypography>
        </SoftBox>
        <Divider />
        {currentPage === 1 && (
          <>
            <SoftBox px={3}>
              <SoftTypography variant='h6'>Contenido de la Pregunta</SoftTypography>
              <SoftInput
                fullWidth
                placeholder='Contenido'
                size="large"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </SoftBox>
            <SoftBox px={3}>
              <SoftTypography variant='h6'>Respuesta Correcta</SoftTypography>
              <SoftInput
                fullWidth
                placeholder='Respuesta Correcta'
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />
            </SoftBox>
          </>
        )}

        {currentPage === 2 && (
          <>
            <SoftBox px={3}>
              <SoftTypography variant='h6'>Opciones de Respuesta</SoftTypography>
              <Grid container spacing={2}>
                {['a', 'b', 'c', 'd'].map((choice) => (
                  <Grid item xs={12} key={choice}>
                    <SoftInput
                      fullWidth
                      placeholder={`Opción ${choice}`}
                      value={answerChoices[choice] || ''}
                      onChange={(e) => setAnswerChoices({ ...answerChoices, [choice]: `${choice}) ${e.target.value}` })}
                    />
                  </Grid>
                ))}
              </Grid>
            </SoftBox>
          </>
        )}

        {currentPage === 3 && (
          <>
            <SoftBox px={3}>
              <SoftTypography variant='h6'>Tema</SoftTypography>
              <SoftSelect
                options={themes}
                option={theme}
                onChange={(e) => {
                  setTheme(e.value)}
                }
              />
            </SoftBox>
            <SoftBox px={3}>
              <SoftTypography variant='h5'>Ratings</SoftTypography>
              <Grid container spacing={2}>
                {/* Dynamically render rating inputs based on the themes */}
                {themes.map((themeItem) => (
                  <Grid container item key={themeItem.value} alignItems="center" spacing={2}>
                    <Grid item xs={9}>
                      <SoftTypography variant='h6'>{themeItem.label}</SoftTypography>
                    </Grid>
                    <Grid item xs={3}>
                      <SoftInput
                        fullWidth
                        size="small"
                        value={rating[themeItem.value] || ''}
                        onChange={(e) => setRating({ ...rating, [themeItem.value]: e.target.value })}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </SoftBox>
          </>
        )}

      </SoftBox>

      <SoftBox p={3} pt={0} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SoftButton
          variant='gradient'
          color='secondary'
          disabled={currentPage === 1} // Disable if on the first page
          onClick={prevPage}
        >
          Previous
        </SoftButton>

        <SoftButton
          variant='gradient'
          color='info'
          disabled={currentPage === 3}
          onClick={() => {
            nextPage();
          }}
        >
          Next
        </SoftButton>

      </SoftBox>

      {currentPage === 3 && (
        <SoftButton
          variant='gradient'
          color={props.edit ? 'warning' : 'success'}
          onClick={handleSubmit}
        >
          {props.edit ? 'Guardar Cambios' : 'Crear Pregunta'}
        </SoftButton>
      )}

    </Card>
  );
}

export default QuestionForm;
