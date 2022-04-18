import React, { useEffect, useState } from "react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
///ELEMENTS FOR DIALOG

import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

//FORMULARIOS
import TextField from "@mui/material/TextField";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

//select
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//notifdications
import { useSnackbar } from "notistack";
//utiles para el webservise
import axios from "axios";
import HOST from "variables/general.js";
const baseUrl = HOST.URL_BACK_END + "estudiante";
const header = HOST.headerPublic();

export default function Paso1() {
  const { enqueueSnackbar } = useSnackbar();
  const [consoleSeleccionada, setConsolaSeleccionada] = useState({
    rude: 0,
    nombre: "",
    apPaterno: "",
    apMaterno: "",
    celular: "",
    fechaNac: "",
    genero: "",
    ci: "",
    correo: "",
  });

  const handleChangle = (e) => {
    const { name, value } = e.target;
    if (
      (name === "nombre" || name === "apPaterno" || name === "apMaterno") &&
      value !== ""
    ) {
      //value[0] = value[0].toUpperCase();
      const val = value[0].toUpperCase() + value.substr(1, value.length);
      console.log(value[0].toUpperCase() + value.substr(1, value.length));
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        [name]: val,
      }));
    } else {
      console.log("NOOOO");
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    console.log(consoleSeleccionada);
  };

  //---    INSERT    --//
  const Insert = async (event) => {
    event.preventDefault();
    await axios
      .post(
        baseUrl,
        JSON.stringify({
          rude: consoleSeleccionada.rude,
          nombre: consoleSeleccionada.nombre,
          apPaterno: consoleSeleccionada.apPaterno,
          apMaterno: consoleSeleccionada.apMaterno,
          celular: consoleSeleccionada.celular,
          fechaNac: consoleSeleccionada.fechaNac,
          genero: consoleSeleccionada.genero,
          ci: consoleSeleccionada.ci,
          correo: consoleSeleccionada.correo,
        }),
        header
      )
      .then((response) => {
        console.log(response);
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar("Se agrego el Estudiante!", { variant: "success" });
        limpiarFormulario();
      })
      .catch((error) => {
        //alert(error+"");
        enqueueSnackbar(
          "El Estudiante ya esta registrado, registre solo los estudiantes que participaran por primera ves",
          { variant: "error" }
        );
      });
  };

  const limpiarFormulario = (event) => {
    document.getElementById("create-course-form").reset();
    const name = "genero";
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  useEffect(() => {
    /// state
  }, []);
  return (
    <Card>
      <CardHeader>
        <Alert variant="outlined" severity="info">
          Registre solo los estudiantes que participaran por primera ves.!
        </Alert>
      </CardHeader>

      <CardBody>
        <form onSubmit={Insert} id="create-course-form">
          <DialogContent dividers>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="rude"
                  label="RUDE: Registro unico de estudiante"
                  name="rude"
                  type="number"
                  autoComplete="off"
                  onChange={handleChangle}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
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
                  minLength="7"
                  maxLength="10"
                  onChange={handleChangle}
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
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
                  onChange={handleChangle}
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
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
                  onChange={handleChangle}
                />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
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
                  onChange={handleChangle}
                />
              </GridItem>

              <GridItem xs={12} sm={3} md={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="correo"
                  label="Correo"
                  name="correo"
                  type="email"
                  autoComplete="off"
                  onChange={handleChangle}
                />
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="celular"
                  label="Celular"
                  name="celular"
                  type="number"
                  minLength="8"
                  maxLength="11"
                  autoComplete="off"
                  onChange={handleChangle}
                />
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="fechaNac"
                  label="Fecha de Nacimiento"
                  name="fechaNac"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChangle}
                />
              </GridItem>
              <GridItem xs={12} sm={3} md={3}>
                <Box sx={{ minWidth: 120, margin: 2 }}>
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
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" type="submit">
              Registrar Estudiante
            </Button>
          </DialogActions>
        </form>
      </CardBody>
    </Card>
  );
}
