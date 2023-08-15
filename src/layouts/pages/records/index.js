import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import CreateRecord from "./CreateRecord";     
import { useDispatch, useSelector } from "react-redux";
import { getRecords } from "redux/actions/records"; 
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function RecordsPage() {
  const dispatch = useDispatch();
  const [records, setRecords] = useState([]);

  const getRecordsResponse = useSelector((state) => state.records.getRecords);
  const createRecordResponse = useSelector(
    (state) => state.records.createRecord
  );
  const updateRecordResponse = useSelector(
    (state) => state.records.updateRecord
  );
  const deleteRecordResponse = useSelector(
    (state) => state.records.deleteRecord
  );

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  useEffect(() => {
    if (getRecordsResponse.data) {
      setRecords(getRecordsResponse.data);
    }
  }, [getRecordsResponse]);

  useEffect(() => {
    if (createRecordResponse.data) {
      if (new Date() - createRecordResponse.time < 2000) {
        dispatch(getRecords());
      }
    }
  }, [createRecordResponse, dispatch]);

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
  }, [deleteRecordResponse, dispatch]);

  const extractedRecords = records.map((record) => {
    return {
      name: record.name,
      code: record.code,
      documento: record.documento,
      record: record,
    };
  });


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftTypography variant='h3' textAlign='center' fontWeight='bold'>
        Records
      </SoftTypography>
      <SoftBox display='flex' justifyContent='flex-end' pb={3}>
        <CreateRecord />
      </SoftBox>
      <DataTable table={{
        columns: [
          { Header: "Nombre", accessor: "name" },
          { Header: "Codigo", accessor: "code" },
          { Header: "Documento", accessor: "documento", url: true },
          { Header: "", accessor: "record", recordAction: true },
        ],
        rows: extractedRecords,
      }} />

      <Footer />
    </DashboardLayout>
  );
}

export default RecordsPage;
