import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "components/DataTablePagination";
import { useDispatch, useSelector } from "react-redux";
import { getTemplates, deleteTemplate } from "redux/actions/templates"; // Adjusted actions
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { capitalize } from "utils";
import { 
  Card, 
  Grid, 
  Icon, 
  Tooltip, 
} from "@mui/material";
import SoftInput from "components/SoftInput";
import CreateTemplate from "layouts/views/templates/CreateTemplate"; // Adjusted component
import SoftBadge from "components/SoftBadge";
import SoftSelect from "components/SoftSelect";
import Swal from "sweetalert2";
import RatingList from "layouts/views/components/ratings";


function TemplatesPage() {
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState([]);
  const [themeFilter, setThemeFilter] = useState("");


  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [table, setTable] = useState({ columns: [], rows: [] });

  const templateThemes = [
    { value: "", label: "Todos" },
    { value: "tipos_de_ondas", label: "Tipos de ondas" },
    { value: "vibracion_de_una_cuerda", label: "Vibracion de una cuerda" },
    { value: "ondas_sonoras", label: "Ondas sonoras" },
    { value: "efecto_doppler", label: "Efecto Doppler" },
    { value: "caracteristicas_de_las_ondas", label: "Caracteristicas de las ondas" },
  ];

  const getTemplatesResponse = useSelector((state) => state.templates.getTemplates);
  const createTemplateResponse = useSelector((state) => state.templates.createTemplate);
  const updateTemplateResponse = useSelector((state) => state.templates.updateTemplate);
  const deleteTemplateResponse = useSelector((state) => state.templates.deleteTemplate);


  const doRequest = () => {
    let filters = {
      theme: themeFilter,
      page: page,
      page_size: pageSize,
    };
    dispatch(getTemplates(filters));
  }

  useEffect(() => {
    doRequest();
  }, [themeFilter, pageSize, page]);

  useEffect(() => {
    if (getTemplatesResponse.data) {
      setTemplates(getTemplatesResponse.data.results);
      setTable(parseTable(getTemplatesResponse.data.results));
      setCanNext(getTemplatesResponse.data.next);
      setTotalEntries(getTemplatesResponse.data.count);
      setCanPrev(getTemplatesResponse.data.previous);
    }
  }, [getTemplatesResponse]);

  useEffect(() => {
    if (createTemplateResponse.data) {
      if (new Date() - createTemplateResponse.time < 2000) {
        doRequest();
      }
    }
  }, [createTemplateResponse]);

  useEffect(() => {
    if (updateTemplateResponse.data) {
      if (new Date() - updateTemplateResponse.time < 2000) {
        doRequest();
      }
    }
  }, [updateTemplateResponse]);

  useEffect(() => {
    if (deleteTemplateResponse.data) {
      if (new Date() - deleteTemplateResponse.time < 2000) {
        doRequest();
      }
    }
  }, [deleteTemplateResponse]);

  const parseTable = (templates) => {
    const columns = [
      { Header: "Tema", accessor: "theme", width: "5%" },
      { Header: "Diagrama", accessor: "diagram", width: "15%"},
      { Header: "Contenido", accessor: "template_content", width: "40%" },
      { Header: "Formula", accessor: "formula", width: "10%"},
      { Header: "Parametros", accessor: "parameters", width: "10%"},
      { Header: "Rating", accessor: "rating", width: "30%"},
      { Header: "Acciones", accessor: "actions", width: "10%"},
    ];

    const rows = templates.map((template) => {
      return {
        theme: (
          <SoftBadge
            color={
              template.theme === "ondas_sonoras" 
              ? "cool" 
              : template.theme === "efecto_doppler"
              ? "warning" 
              : template.theme === "caracteristicas_de_las_ondas"
              ? "info"
              : template.theme === "tipos_de_ondas"
              ? "error"
              : template.theme === "vibracion_de_una_cuerda"
              ? "success"
              : "error"
            }
            style={{ fontSize: '1.2em', padding: '0px 0px 0px 0px' }}
            badgeContent={capitalize(template.theme.replace(/_/g, " "))}
          />
        ),
        diagram: (
          <SoftBox
            component='img'
            height={100}
            src={template.diagram}
            alt={template.formula}
            borderRadius='md'
          />
        ),
        template_content: template.template_content, // Assuming the template has a content field
        formula: template.formula,
        // parameters: template.parameters.join(', '), // Assuming parameters is an array
        rating: (
          <RatingList ratings={template.rating} /> // Assuming you have a similar component for templates
        ),
        actions: (
          <SoftBox display='flex' justifyContent='space-between'>
            <CreateTemplate edit={true} template={template} />
            <Tooltip title='Eliminar template'>
              <SoftBadge
                color='error'
                onClick={() => {
                  Swal.fire({
                    title: "¿Estás seguro que quieres eliminar este template?",
                    text: "No podrás revertir esta acción",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Si, eliminar",
                    cancelButtonText: "No, cancelar",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deleteTemplate({ uuid: template.uuid })); // Assuming you have a deleteTemplate action and templates have an id field
                      Swal.fire(
                        "Eliminado",
                        "El template ha sido eliminado.",
                        "success"
                      );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        "Cancelado",
                        "El template no ha sido eliminado.",
                        "error"
                      );
                    }
                  });
                }}
                badgeContent={<Icon>delete</Icon>}
              />
            </Tooltip>
          </SoftBox>
        ),
      };
    });
    

    return { columns, rows };
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Plantillas de Desarrollo
      </SoftTypography>
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateTemplate />
      </SoftBox>
      <Card sx={{ pt: 3, overflow: "visible", px: 1 }}>
        <SoftTypography variant='h5' textAlign='center' fontWeight='bold'>
          Filtros
        </SoftTypography>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Tema
              </SoftTypography>
              <SoftSelect
                option={themeFilter}
                onChange={(e) => {
                  setThemeFilter(e.value);
                }}
                options={templateThemes}
              />
            </SoftBox>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ px: 3, overflow: "visible" }}>
        <DataTable
          totalEntries={totalEntries}
          canSearch={false}
          table={table}
          changePage={setPage}
          canNext={canNext}
          canPrev={canPrev}
          page={page}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </Card>
      <Footer />
    </DashboardLayout>
  );
}


export default TemplatesPage;
