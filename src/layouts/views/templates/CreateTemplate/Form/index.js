import { useState } from "react";
import Card from "@mui/material/Card";
import { Divider, Grid, Icon } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";

function TemplateForm() {
  const [theme, setTheme] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [formula, setFormula] = useState("");
  const [parameters, setParameters] = useState({});
  const [ratings, setRatings] = useState({});

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

  const validateInputs = () => {
    let errors = {};
  
    if (!theme) {
      errors.theme = "Theme is required.";
    }
  
    if (!templateContent) {
      errors.templateContent = "Template content is required.";
    }
  
    if (!formula) {
      errors.formula = "Formula is required.";
    }
  
    Object.entries(parameters).forEach(([key, value]) => {
      if (!key) {
        errors.key = "Key is required.";
      }
      if (value[0] === "" || value[1] === "") {
        errors[key] = "Both start and end values are required.";
      }
    });
  
    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };
  

  const themes = [
    { label: "Ondas Sonoras", value: "ondas_sonoras" },
    { label: "Efecto Doppler", value: "efecto_doppler" },
    { label: "Características de las Ondas", value: "caracteristicas_de_las_ondas" },
    { label: "Tipos de Ondas", value: "tipos_de_ondas" },
    { label: "Vibración de una Cuerda", value: "vibracion_de_una_cuerda"}
  ];

  const handleSubmit = () => {
    const templateData = {
      theme: theme,
      template_content: templateContent,
      formula: formula,
      parameters: parameters,
      rating: ratings
    };
    console.log("Template Data:", templateData);
    // Dispatch action or API call to create the template
  };

  return (
    <Card id='template-form' sx={{ overflow: "visible" }}>
      <SoftBox py={2}>
        <SoftBox px={3} pb={1} pt={0} justifyContent="center" display="flex">
          <SoftTypography variant='h4' fontWeight='bold' color="dark">
            Crear Plantilla
          </SoftTypography>
        </SoftBox>
        <Divider />
        {currentPage === 1 && (
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
              <SoftTypography variant='h6'>Contenido de la Plantilla</SoftTypography>
              <SoftInput
                fullWidth
                placeholder='Contenido'
                size="large"
                value={templateContent}
                onChange={(e) => setTemplateContent(e.target.value)}
              />
            </SoftBox>
            <SoftBox px={3}>
              <SoftTypography variant='h6'>Fórmula</SoftTypography>
              <SoftInput
                fullWidth
                placeholder='Fórmula'
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
              />
            </SoftBox>
          </>
        )}


        {currentPage === 2 && (
          <>
            <SoftBox px={3}>
              <SoftTypography variant='h6'>Parámetros</SoftTypography>
              <Grid container spacing={2}>
                {/* Dynamically render parameter inputs based on the keys in the parameters object */}
                {Object.entries(parameters).map(([key, value]) => (
                  <Grid container item key={key} alignItems="center" spacing={2}>
                    <Grid item xs={4}>
                      <SoftInput
                        fullWidth
                        placeholder='Key'
                        value={key}
                        onChange={(e) => {
                          const newKey = e.target.value;
                          const newValue = parameters[key];
                          setParameters((prev) => {
                            const newParameters = { ...prev };
                            delete newParameters[key];
                            newParameters[newKey] = newValue;
                            return newParameters;
                          });
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <SoftInput
                        fullWidth
                        placeholder='Start'
                        value={value[0]}
                        onChange={(e) => {
                          const newValue = [e.target.value, value[1]];
                          setParameters((prev) => ({ ...prev, [key]: newValue }));
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <SoftInput
                        fullWidth
                        placeholder='End'
                        value={value[1]}
                        onChange={(e) => {
                          const newValue = [value[0], e.target.value];
                          setParameters((prev) => ({ ...prev, [key]: newValue }));
                        }}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <SoftButton
                variant='contained'
                color='light'
                style={{ marginTop: '10px' }}
                onClick={() => setParameters((prev) => ({ ...prev, '': ["", ""] }))}
              >
                <Icon>add</Icon>
              </SoftButton>
            </SoftBox>
          </>
        )}


        {currentPage === 3 && (
          <>
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
                        value={ratings[themeItem.value] || ''}
                        onChange={(e) => setRatings({ ...ratings, [themeItem.value]: e.target.value })}
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
            if (validateInputs()) {
              nextPage();
            }
          }}
        >
          Next
        </SoftButton>

      </SoftBox>

      {currentPage === 3 && (
        <SoftButton
          variant='gradient'
          color='success'
          onClick={handleSubmit}
        >
          Crear Plantilla
        </SoftButton>
      )}

    </Card>
  );
}

export default TemplateForm;
