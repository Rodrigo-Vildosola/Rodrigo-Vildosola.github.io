import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "components/DataTablePagination";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, deleteQuestion } from "redux/actions/questions"; // Adjusted actions
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
import CreateQuestion from "layouts/views/questions/CreateQuestion"; // Adjusted component
import SoftBadge from "components/SoftBadge";
import SoftSelect from "components/SoftSelect";
import Swal from "sweetalert2";
import ChoicesList from "layouts/views/components/choices";
import RatingList from "layouts/views/components/ratings";

function QuestionsPage() {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [themeFilter, setThemeFilter] = useState("");


  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [table, setTable] = useState({ columns: [], rows: [] });

  const questionThemes = [
    { value: "", label: "Todos" },
    { value: "tipos_de_ondas", label: "Tipos de ondas" },
    { value: "vibracion_de_una_cuerda", label: "Vibracion de una cuerda" },
    { value: "ondas_sonoras", label: "Ondas sonoras" },
    { value: "efecto_doppler", label: "Efecto Doppler" },
    { value: "caracteristicas_de_las_ondas", label: "Caracteristicas de las ondas" },
  ];

  const getQuestionsResponse = useSelector((state) => state.questions.getQuestions);
  const createQuestionResponse = useSelector((state) => state.questions.createQuestion);
  const updateQuestionResponse = useSelector((state) => state.questions.updateQuestion);
  const deleteQuestionResponse = useSelector((state) => state.questions.deleteQuestion);

  const doRequest = () => {
    let filters = {
      theme: themeFilter,
      page: page,
      page_size: pageSize,
    };
    dispatch(getQuestions(filters));
  }


  useEffect(() => {
    doRequest();
  }, [themeFilter, pageSize, page]);


  useEffect(() => {
    if (getQuestionsResponse.data) {
      setQuestions(getQuestionsResponse.data.results);
      setTotalEntries(getQuestionsResponse.data.count);
      setCanNext(getQuestionsResponse.data.next !== null);
      setCanPrev(getQuestionsResponse.data.previous !== null);
      setTable(parseTable(getQuestionsResponse.data.results));
    }
  }, [getQuestionsResponse]);

  useEffect(() => {
    if (createQuestionResponse.data) {
      if (new Date() - createQuestionResponse.time < 2000) {
        doRequest();
      }
    }
  }, [createQuestionResponse]);

  useEffect(() => {
    if (updateQuestionResponse.data) {
      if (new Date() - updateQuestionResponse.time < 2000) {
        doRequest();
      }
    }
  }, [updateQuestionResponse]);

  useEffect(() => {
    if (deleteQuestionResponse.data) {
      if (new Date() - deleteQuestionResponse.time < 2000) {
        doRequest();
      }
    }
  }, [deleteQuestionResponse]);


  const parseTable = (questions) => {
    const columns = [
      { Header: "Theme", accessor: "theme", width: "10%" },
      { Header: "Question", accessor: "content", width: "40%" },
      { Header: "Answer Choices", accessor: "answer_choices", width: "30%" },
      { Header: "Correct Answer", accessor: "correct_answer", width: "10%" },
      { Header: "Rating", accessor: "rating", width: "10%" },
      // { Header: "Diagram", accessor: "diagram", width: "10%" },
      { Header: "Actions", accessor: "actions", width: "10%" },
    ];
    const rows = questions.map((question) => {
      return {
        theme: (
          <SoftBadge
            color={
              question.theme === "ondas_sonoras" 
              ? "cool" 
              : question.theme === "efecto_doppler"
              ? "warning" 
              : question.theme === "caracteristicas_de_las_ondas"
              ? "info"
              : question.theme === "tipos_de_ondas"
              ? "error"
              : question.theme === "vibracion_de_una_cuerda"
              ? "success"
              : "error"
            }
            style={{ fontSize: '1.2em', padding: '0px 0px 0px 0px' }}
            badgeContent={capitalize(question.theme.replace(/_/g, " "))}
          />
        ),
        content: question.content,
        answer_choices: (
          <ChoicesList answers={question.answer_choices} />
        ),
        correct_answer: question.answer_choices[question.correct_answer],
        rating: (
          <RatingList ratings={question.rating} /> // Assuming you have a similar component for templates
        ),
        // diagram: (
        //   <SoftBox
        //     component='img'
        //     height={100}
        //     src={question.diagram}
        //     alt="Diagram"
        //     borderRadius='md'
        //   />
        // ),
        actions: (
          <SoftBox display='flex' justifyContent='space-between'>
            <CreateQuestion edit={true} question={question} />
            <Tooltip title='Delete Question'>
              <SoftBadge
                color='error'
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure you want to delete this question?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deleteQuestion({ uuid: question.uuid }));
                      Swal.fire(
                        "Deleted!",
                        "The question has been deleted.",
                        "success"
                      );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        "Cancelled",
                        "The question is safe :)",
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
        Preguntas de Alternativas
      </SoftTypography>
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateQuestion />
      </SoftBox>
      <Card sx={{ pt: 3, overflow: "visible", px: 1 }}>
        <SoftTypography variant='h5' textAlign='center' fontWeight='bold'>
          Filters
        </SoftTypography>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Theme
              </SoftTypography>
              <SoftSelect
                option={themeFilter}
                onChange={(e) => {
                  setThemeFilter(e.value);
                }}
                options={questionThemes}
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

export default QuestionsPage;
