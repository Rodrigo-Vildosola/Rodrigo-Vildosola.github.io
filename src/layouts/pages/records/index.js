import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "components/DataTablePagination";

import CreateRecord from "./CreateRecord";
import { useDispatch, useSelector } from "react-redux";
import { getRecords } from "redux/actions/records";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Card, Divider, Grid, Icon, Tooltip } from "@mui/material";
import SoftBadge from "components/SoftBadge";
import { deleteRecord } from "redux/actions/records";
import Swal from "sweetalert2";
import SoftInput from "components/SoftInput";

function RecordsPage() {
  const dispatch = useDispatch();
  const [records, setRecords] = useState([]);
  const [codeFilter, setCodeFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const getRecordsResponse = useSelector((state) => state.records.getRecords);

  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [table, setTable] = useState({ columns: [], rows: [] });

  const createRecordResponse = useSelector(
    (state) => state.records.createRecord
  );
  const updateRecordResponse = useSelector(
    (state) => state.records.updateRecord
  );
  const deleteRecordResponse = useSelector(
    (state) => state.records.deleteRecord
  );

  const doRequest = () => {
    let filters = {
      code: codeFilter,
      name: nameFilter,
      page: page,
      page_size: pageSize,
    };
    dispatch(getRecords(filters));
  };

  useEffect(() => {
    doRequest();
  }, [codeFilter, nameFilter, pageSize, page]);

  useEffect(() => {
    doRequest();
  }, []);

  useEffect(() => {
    if (getRecordsResponse.data) {
      setRecords(getRecordsResponse.data.results);
      setTable(parseTable(getRecordsResponse.data.results));
      setCanNext(getRecordsResponse.data.next);
      setTotalEntries(getRecordsResponse.data.count);
      setCanPrev(getRecordsResponse.data.previous);
    }
  }, [getRecordsResponse]);

  useEffect(() => {
    if (createRecordResponse.data) {
      if (new Date() - createRecordResponse.time < 2000) {
        dispatch(getRecords());
      }
    }
  }, [createRecordResponse]);

  useEffect(() => {
    if (updateRecordResponse.data) {
      if (new Date() - updateRecordResponse.time < 2000) {
        dispatch(getRecords());
      }
    }
  }, [dispatch, updateRecordResponse]);

  useEffect(() => {
    if (deleteRecordResponse.data) {
      if (new Date() - deleteRecordResponse.time < 2000) {
        dispatch(getRecords());
      }
    }
  }, [deleteRecordResponse]);

  const parseTable = (records) => {
    const columns = [
      { Header: "Nombre", accessor: "name", width: "40%" },
      { Header: "Codigo", accessor: "code", width: "40%" },
      { Header: "Documento", accessor: "documento", width: "10%" },
      { Header: "Acciones", accessor: "actions" },
    ];
    const rows = records.map((record) => {
      return {
        name: record.name,
        code: record.code,
        documento: (
          <a href={record.documento} target='_blank'>
            <Icon>visibility_icon</Icon>
          </a>
        ),
        actions: (
          <SoftBox display='flex' justifyContent='space-between'>
            <CreateRecord edit={true} record={record} />
            <Tooltip title='Eliminar ficha'>
              <SoftBadge
                color='error'
                onClick={() => {
                  Swal.fire({
                    title: "¿Estás seguro que quieres eliminar esta ficha?",
                    text: "No podrás revertir esta acción",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Si, eliminar",
                    cancelButtonText: "No, cancelar",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deleteRecord({ uuid: record.uuid }));
                      Swal.fire(
                        "Eliminado",
                        "La ficha ha sido eliminada.",
                        "success"
                      );
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        "Cancelado",
                        "La ficha no ha sido eliminada.",
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
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Fichas
      </SoftTypography>
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateRecord />
      </SoftBox>
      <Card sx={{ pt: 3, overflow: "visible", px: 1 }}>
        <SoftTypography variant='h5' textAlign='center' fontWeight='bold'>
          Filtros
        </SoftTypography>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Nombre
              </SoftTypography>
              <SoftInput
                size='small'
                value={nameFilter}
                onChange={(e) => {
                  setNameFilter(e.target.value);
                }}
              />
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <SoftBox p={2}>
              <SoftTypography variant='body2' fontWeight='bold'>
                Código
              </SoftTypography>
              <SoftInput
                size='small'
                value={codeFilter}
                onChange={(e) => {
                  setCodeFilter(e.target.value);
                }}
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

export default RecordsPage;
