import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { createUser, updateUser } from "redux/actions/users";
import { validadorEmail } from "utils";
import form from "../../new-user/schemas/form";
import SoftSelect from "components/SoftSelect";
import { getClients } from "redux/actions/clients";
import { Checkbox, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { toggleClientUser } from "redux/actions/users";
import { getFormatsByClient } from "redux/actions/clients";
import { toggleFormatUser } from "redux/actions/users";

function Form(props) {
  const dispatch = useDispatch();

  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);

  const getClientsResponse = useSelector((state) => state.clients.getClients);
  const getFormatsByClientResponse = useSelector(
    (state) => state.clients.getFormatsByClient
  );

  useEffect(() => {
    if (getClientsResponse.data) {
      setClients(getClientsResponse.data);
    }
  }, [getClientsResponse]);

  useEffect(() => {
    dispatch(getClients());
  }, []);

  useEffect(() => {
    if (props.user.groups[0].name === "tipo3" && client) {
      dispatch(getFormatsByClient(client));
    }
  }, [client]);

  const handleSubmit = () => {
    const formData = new FormData();
  };

  useEffect(() => {}, []);

  const tipo2View = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SoftTypography variant='h4' textAlign='center'>
            Asignar Clientes
          </SoftTypography>
        </Grid>
        {clients.map((client) => {
          return (
            <Grid item xs={6} sm={4} md={3}>
              <SoftBox p={1} style={{ border: "2px solid" }}>
                <SoftBox display='flex' justifyContent='center'>
                  <SoftBox
                    component='img'
                    height={"20px"}
                    textAlign='center'
                    mt={1}
                    src={client.logo}
                    alt={client.name}
                    borderRadius='md'
                  />
                </SoftBox>
                <SoftBox display='flex' justifyContent='center'>
                  <SoftTypography variant='body1'>{client.name}</SoftTypography>
                  <Checkbox
                    sx={{ marginLeft: 2, marginTop: 1 }}
                    checked={props.user.assigned_clients.some(
                      (objeto) => objeto.uuid === client.uuid
                    )}
                    onChange={() =>
                      dispatch(
                        toggleClientUser({
                          email: props.user.email,
                          client_uuid: client.uuid,
                        })
                      )
                    }
                  />
                </SoftBox>
              </SoftBox>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const tipo3View = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SoftTypography variant='h4' textAlign='center'>
            Asignar Formatos
          </SoftTypography>
        </Grid>
        <Grid item xs={12}>
          <SoftTypography variant='body1' textAlign='left'>
            Cliente
          </SoftTypography>
          <SoftSelect
            option={client}
            onChange={(e) => setClient(e.value)}
            options={clients.map((client) => {
              return { label: client.name, value: client.uuid };
            })}
          />
        </Grid>
        {getFormatsByClientResponse.data && (
          <Grid item xs={12}>
            <SoftTypography variant='body1' textAlign='left'>
              Formatos
            </SoftTypography>
          </Grid>
        )}
        {getFormatsByClientResponse.data &&
          client &&
          getFormatsByClientResponse.data.map((format) => {
            return (
              <Grid item xs={6} sm={4} md={3}>
                <SoftBox p={1} style={{ border: "2px solid" }}>
                  <SoftBox display='flex' justifyContent='center'>
                    <SoftBox
                      component='img'
                      height={"20px"}
                      textAlign='center'
                      mt={1}
                      src={format.logo}
                      alt={format.name}
                      borderRadius='md'
                    />
                  </SoftBox>
                  <SoftBox display='flex' justifyContent='center' p={1}>
                    <SoftTypography variant='body1'>
                      {format.name}
                    </SoftTypography>
                    <Checkbox
                      sx={{ marginLeft: 2, marginTop: 1 }}
                      checked={props.user.assigned_formats.some(
                        (objeto) => objeto.uuid === format.uuid
                      )}
                      onChange={() =>
                        dispatch(
                          toggleFormatUser({
                            email: props.user.email,
                            format_uuid: format.uuid,
                          })
                        )
                      }
                    />
                  </SoftBox>
                </SoftBox>
              </Grid>
            );
          })}
      </Grid>
    );
  };

  return (
    <Card id='user-form' sx={{ overflow: "visible" }}>
      <SoftBox sx={{ p: 3 }}>
        {props.user.groups[0].name === "tipo2" && tipo2View()}
        {props.user.groups[0].name === "tipo3" && tipo3View()}
      </SoftBox>
    </Card>
  );
}

export default Form;
