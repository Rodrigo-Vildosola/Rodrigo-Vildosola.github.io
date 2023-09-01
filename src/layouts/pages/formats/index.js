import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "components/DataTablePagination";
import { useDispatch, useSelector } from "react-redux";
import { getFormatsByClient, deleteFormat } from "redux/actions/clients";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Card, Grid, Icon, Tooltip } from "@mui/material";
import SoftInput from "components/SoftInput";
import CreateFormat from "./CreateFormat";
import SoftButton from "components/SoftButton";
import SoftBadge from "components/SoftBadge";
import Swal from "sweetalert2";

function FormatsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { uuid } = useParams();

    const [formats, setFormats] = useState([]);
    const [nameFilter, setNameFilter] = useState("");

    const [canNext, setCanNext] = useState(false);
    const [canPrev, setCanPrev] = useState(false);
    const [totalEntries, setTotalEntries] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [page, setPage] = useState(1);
    const [table, setTable] = useState({ columns: [], rows: [] });

    const getFormatsByClientResponse = useSelector((state) => state.clients.getFormatsByClient);
    const createFormatResponse = useSelector((state) => state.clients.createFormat);
    const deleteFormatResponse = useSelector((state) => state.clients.deleteFormat);

    const doRequest = () => {
        let filters = {
            name: nameFilter,
            page: page,
            page_size: pageSize,
            client_uuid: uuid,
        };
        dispatch(getFormatsByClient(filters));
    };

    useEffect(() => {
        doRequest();
    }, [nameFilter, pageSize, page]);

    useEffect(() => {
        if (getFormatsByClientResponse.data) {
            setFormats(getFormatsByClientResponse.data.results);
            setTable(parseTable(getFormatsByClientResponse.data.results));
            setCanNext(getFormatsByClientResponse.data.next);
            setTotalEntries(getFormatsByClientResponse.data.count);
            setCanPrev(getFormatsByClientResponse.data.previous);
        }
    }, [getFormatsByClientResponse]);

    useEffect(() => {
        if (createFormatResponse.data) {
            if (new Date() - createFormatResponse.time < 2000) {
                doRequest();
            }
        }
    }, [createFormatResponse]);

    useEffect(() => {
        if (deleteFormatResponse.data) {
            if (new Date() - deleteFormatResponse.time < 2000) {
                doRequest();
            }
        }
    }, [deleteFormatResponse]);


    const parseTable = (formats) => {
        const columns = [
            { Header: "Logo", accessor: "logo", width: "20%" },
            { Header: "Nombre", accessor: "name" },
            { Header: "Proyectos", accessor: "projects", width: "10%"},
            { Header: "Actions", accessor: "actions", width: "10%" },
        ];

        const rows = formats.map((format) => ({
            logo: (
              <SoftBox
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/clients/formats/${format.uuid}/projects`);
                }}
              >
                {" "}
                <SoftBox
                  component='img'
                  height={100}
                  src={format.logo}
                  alt={format.name}
                  borderRadius='md'
                />
              </SoftBox>
            ),
            name: format.name,
            projects: (
                <SoftBox
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/clients/formats/${format.uuid}/projects`);
                  }}
                >
                  <SoftBadge
                    color='secondary'
                    badgeContent={<Icon>visibility_icon</Icon>}
                  />
                </SoftBox>
            ),
            actions: (
                <SoftBox display='flex' justifyContent='space-between'>
                    <CreateFormat edit={true} format={format} />
                    <Tooltip title='Eliminar formato'>
                        <SoftBadge
                            color='error'
                            onClick={() => {
                                Swal.fire({
                                    title: "¿Estás seguro que quieres eliminar este formato?",
                                    text: "No podrás revertir esta acción",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonText: "Si, eliminar",
                                    cancelButtonText: "No, cancelar",
                                    reverseButtons: true,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        dispatch(deleteFormat({ uuid: format.uuid }));
                                        Swal.fire(
                                            "Eliminado",
                                            "El formato ha sido eliminado.",
                                            "success"
                                        );
                                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                                        Swal.fire(
                                            "Cancelado",
                                            "El formato no ha sido eliminado.",
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
            {uuid && (
              <SoftBox>
                <SoftButton
                  onClick={() => {
                    window.history.back();
                  }}
                  variant='text'
                  color='dark'
                >
                  <Icon>arrow_back</Icon> Volver
                </SoftButton>
              </SoftBox>
            )}
            <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
                Formatos
            </SoftTypography>
            <SoftBox display='flex' justifyContent='flex-end' pb={3}>
                <CreateFormat />
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
                </Grid>
            </Card>
            <Card sx={{ px: 3, overflow: "visible" }}>
                <DataTable
                    totalEntries={totalEntries}
                    canSearch={false}
                    table={table}
                    canPrev={canPrev}
                    canNext={canNext}
                    setPageSize={setPageSize}
                    pageSize={pageSize}
                    page={page}
                    setPage={setPage}
                />
            </Card>
            <Footer />
        </DashboardLayout>
    );
}

export default FormatsPage;
