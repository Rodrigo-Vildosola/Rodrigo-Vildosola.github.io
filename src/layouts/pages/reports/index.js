import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "components/DataTablePagination";
import { useDispatch, useSelector } from "react-redux";
import { getReports, deleteReport } from "redux/actions/reports";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Card, Grid, Icon, Tooltip } from "@mui/material";
import SoftInput from "components/SoftInput";
import CreateReport from "./CreateReport";
import SoftBadge from "components/SoftBadge";
import Swal from "sweetalert2";
import { updateReport } from "redux/actions/reports";


function ReportsPage() {
  const dispatch = useDispatch();

  const [reports, setReports] = useState([]);

  const [nameFilter, setNameFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");

  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [table, setTable] = useState({ columns: [], rows: [] });

  const getReportsResponse = useSelector((state) => state.reports.getReports);
  const updateReportResponse = useSelector((state) => state.reports.updateReport);
  const createReportResponse = useSelector((state) => state.reports.createReport);
  const deleteReportResponse = useSelector((state) => state.reports.deleteReport);

  const doRequest = () => {
    let filters = {
      name: nameFilter,
      project_name: projectFilter,
      page: page,
      page_size: pageSize,
    };
    dispatch(getReports(filters));
  };

  useEffect(() => {
    doRequest();
  }, [nameFilter, pageSize, page]);

  useEffect(() => {
    if (getReportsResponse.data) {
      setReports(getReportsResponse.data.results);
      setTable(parseTable(getReportsResponse.data.results));
      setCanNext(getReportsResponse.data.next);
      setTotalEntries(getReportsResponse.data.count);
      setCanPrev(getReportsResponse.data.previous);
    }
    console.log(getReportsResponse.data);
  }, [getReportsResponse]);

  useEffect(() => {
    if (createReportResponse.data) {
      if (new Date() - createReportResponse.time < 2000) {
        dispatch(getReports());
      }
    }
  }, [createReportResponse]);

  useEffect(() => {
    if (updateReportResponse.data) {
      if (new Date() - updateReportResponse.time < 2000) {
        dispatch(getReports());
      }
    }
  }, [updateReportResponse]);

  useEffect(() => {
    if (deleteReportResponse.data) {
      if (new Date() - deleteReportResponse.time < 2000) {
        dispatch(getReports());
      }
    }
  }, [deleteReportResponse]);

  const parseTable = (reports) => {
    const columns = [
      { Header: "Nombre", accessor: "name", width: "20%"},
      { Header: "Creacion", accessor: "creation_date", width: "20%" },
      { Header: "Proyecto", accessor: "project", width: "5%"},
      { Header: "Actions", accessor: "actions", width: "10%" },
    ];

    const rows = reports.map((report) => ({
      name: report.name,
      creation_date: report.creation_date,
      project: report.project.name,
      actions: (
        <SoftBox display='flex' justifyContent='space-between'>
          <CreateReport edit={true} report={report} />
          <Tooltip title='Eliminar reporte'>
            <SoftBadge
              color='error'
              onClick={() => {
                Swal.fire({
                  title: "¿Estás seguro que quieres eliminar este reporte?",
                  text: "No podrás revertir esta acción",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Si, eliminar",
                  cancelButtonText: "No, cancelar",
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteReport({ report_uuid: report.uuid }));
                    Swal.fire(
                      "Eliminado",
                      "El reporte ha sido eliminado.",
                      "success"
                    );
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                      "Cancelado",
                      "El reporte no ha sido eliminado.",
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
    }));

    return { columns, rows };
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Reportes
      </SoftTypography>
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateReport />
      </SoftBox>
      <Card sx={{ pt: 3, overflow: "visible", px: 1 }}>
        <SoftTypography variant='h5' textAlign='center' fontWeight='bold'>
          Filtros
        </SoftTypography>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Nombre
              </SoftTypography>
              <SoftInput
                size='small'
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Proyecto
              </SoftTypography>
              <SoftInput
                size='small'
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
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


export default ReportsPage;

