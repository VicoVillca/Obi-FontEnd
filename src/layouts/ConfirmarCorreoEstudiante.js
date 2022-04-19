import React, { useState, useEffect, useCallback } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { withRouter } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { experimentalStyled as styled } from "@mui/material/styles";
import avatar1 from "assets/img/imgloginedit.png";
//notifications
import { useSnackbar } from "notistack";

/// elements for select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
///ELEMENTS FOR DIALOG

import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// components dialog
import DialogActions from "@mui/material/DialogActions";
import SaveIcon from "@mui/icons-material/Save";
//aspwrd input

//utiles para el webservise
import axios from "axios";
import HOST from "../variables/general.js";
import { useParams } from "react-router-dom";
const baseUrl = HOST.URL_BACK_END + "estudiante";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        OBI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 2,
            top: 2,
            color: (theme) => theme.palette.grey[300],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles(styles);
export default withRouter(function SignIn(props) {
  const { history } = props;
  let { token } = useParams();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [consoleSeleccionada, setConsolaSeleccionada] = useState({
    apMaterno: "",
    apPaterno: "",
    celular: "",
    ci: "",
    correo: "",
    correoVerificado: false,
    fechaNac: "",
    genero: "",
    nombre: "",
    rude: "",
  });

  const handleChangle = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const Update = async (event) => {
    event.preventDefault();
    //showNotificationSuccess('success','Se modifico los datos con exito');

    await axios
      .patch(
        baseUrl + "/" + consoleSeleccionada.rude,
        JSON.stringify({
          nombre: consoleSeleccionada.nombre,
          apPaterno: consoleSeleccionada.apPaterno,
          apMaterno: consoleSeleccionada.apMaterno,
          celular: consoleSeleccionada.celular,
          fechaNac: consoleSeleccionada.fechaNac,
          genero: consoleSeleccionada.genero,
          ci: consoleSeleccionada.ci,
          correo: consoleSeleccionada.correo,
          correoVerificado: true,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            auth: token,
          },
        }
      )
      .then((response) => {
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar(
          "Correo y datos personales de estudiante confirmados con exito!",
          {
            variant: "success",
          }
        );
        history.push("/");
      })
      .catch((error) => {
        //alert(error+"");

        enqueueSnackbar("Error al confirmar correo y datos personales", {
          variant: "error",
        });
        history.push("/");
      });
  };

  const getByToken = useCallback(async () => {
    //showNotificationSuccess('success','Se modifico los datos con exito');
    await axios
      .post(baseUrl + "/verificarCorreo", JSON.stringify({}), {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      })
      .then((response) => {
        //showNotificationSuccess('success','Grupo guardado con exito');
        console.log("respuesta weeee");
        console.log(response);
        setConsolaSeleccionada(response?.data);
      })
      .catch((error) => {
        //alert(error+"");

        enqueueSnackbar("No se pudo modificar la contraseña.", {
          variant: "error",
        });
        history.push("/");
      });
  }, [setConsolaSeleccionada, enqueueSnackbar, token, history]);

  useEffect(() => {
    /// state

    getByToken();
  }, [getByToken]);

  return (
    <div>
      {/*MODAL Pasword New*/}

      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={true}
        maxWidth={"sm"}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={avatar1} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h3 className={classes.cardTitle}>Datos de estudiante</h3>
                <form onSubmit={Update}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      Verifique si sus datos son correctos.
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="rude"
                        label="RUDE: Registro unico de estudiante"
                        name="rude"
                        type="number"
                        disabled
                        autoComplete="off"
                        value={consoleSeleccionada.rude}
                        onChange={handleChangle}
                      />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="ci"
                        label="CI: Cedula de Identidad"
                        name="ci"
                        type="text"
                        autoComplete="off"
                        value={consoleSeleccionada.ci}
                        onChange={handleChangle}
                      />
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nombre"
                        label="Nombre"
                        name="nombre"
                        type="text"
                        autoComplete="off"
                        value={consoleSeleccionada.nombre}
                        onChange={handleChangle}
                      />
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="apPaterno"
                        label="Apellido Paterno"
                        name="apPaterno"
                        type="text"
                        autoComplete="off"
                        value={consoleSeleccionada.apPaterno}
                        onChange={handleChangle}
                      />
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="apMaterno"
                        label="Apellido Materno"
                        name="apMaterno"
                        type="text"
                        autoComplete="off"
                        value={consoleSeleccionada.apMaterno}
                        onChange={handleChangle}
                      />
                    </GridItem>

                    <GridItem xs={6} sm={6} md={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="correo"
                        label="Correo"
                        name="correo"
                        type="email"
                        disabled
                        autoComplete="off"
                        value={consoleSeleccionada.correo}
                        onChange={handleChangle}
                      />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="celular"
                        label="Celular"
                        name="celular"
                        type="number"
                        autoComplete="off"
                        value={consoleSeleccionada.celular}
                        onChange={handleChangle}
                      />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fechaNac"
                        label="Fecha de Nacimiento"
                        name="fechaNac"
                        type="date"
                        value={consoleSeleccionada.fechaNac}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleChangle}
                      />
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <Box sx={{ minWidth: 120, marginTop: 2 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Genero
                          </InputLabel>
                          <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Genero"
                            name="genero"
                            onChange={handleChangle}
                            value={consoleSeleccionada.genero}
                          >
                            <MenuItem value={"Masculino"}>Masculino</MenuItem>
                            <MenuItem value={"Femenino"}>Femenino</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </GridItem>
                  </GridContainer>

                  <DialogActions>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<SaveIcon />}
                    >
                      Aceptar y continuar
                    </Button>
                  </DialogActions>
                </form>
              </CardBody>
            </Card>
          </Box>
          <Copyright />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
});
