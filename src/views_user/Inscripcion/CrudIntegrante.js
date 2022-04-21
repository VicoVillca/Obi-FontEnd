import React, { useCallback, useEffect, useState } from "react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
///ELEMENTS FOR DIALOG

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
//fecha format
import { format } from "date-fns";
//alert full components util
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
//component para anuevo estudiante
import AgregarEstudiante from "views/Estudiante/AgregarEstudiante";
//notifications
import { useSnackbar } from "notistack";
// crud
import Cookies from "universal-cookie";
import HOST from "variables/general.js";
import axios from "axios";
const cookies = new Cookies();
const baseUrl = HOST.URL_BACK_END + "equipo";
const baseUrlOlimpiada = HOST.URL_BACK_END + "olimpiada";
const baseUrlEstudiantes = HOST.URL_BACK_END + "estudiante";

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
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
export default function Paso3() {
  const { enqueueSnackbar } = useSnackbar();

  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = React.useState(false);

  const inicialState = {
    idEquipo: "",
    nombre: "",
    nivel: {
      idNivel: "",
      nombre: "",
      descripcion: "",
      limiteEdad: 0,
      limitePorGrupo: 0,
    },
    colegio: {
      sie: "",
      nombre: "",
      zona: "",
      direccion: "",
      celular: "",
      dependencia: "",
    },
  };
  const inicialStateEstudiante = {
    rude: "",
    nombre: "prueba",
    apPaterno: "prueba",
    apMaterno: "prueba",
    celular: "754",
    fechaNac: "2010-02-20",
    genero: "Masculino",
    ci: "333333",
    correo: "asdasd@gmail.com",
  };
  const [consoleSeleccionada, setConsolaSeleccionada] = useState(inicialState);
  const [
    consolaEstudianteSeleccionada,
    setConsolaEstudianteSeleccionada,
  ] = useState(inicialStateEstudiante);
  const [Olimpiada, setOlimpiada] = useState({});
  const [Equipos, setEquipos] = useState([]);
  const [Estudiantes, setEstudiantes] = useState([]);
  const [EstudiantesDeEquipo, setEstudiantesDEEquipo] = useState([]);
  const handleChangle = (e) => {
    const { name, value } = e.target;
    //setRude(value);

    setConsolaEstudianteSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value.length > 1) {
      BuscarEstudiantes(value);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangleSelect = (e) => {
    console.log("handleclangle");
    console.log(e);
    setConsolaSeleccionada(e);
    getAllEstudiantedDeEquipo(e.idEquipo);
  };

  const handleModalInsert = () => {
    //setConsolaSeleccionada(inicialState);
    setConsolaEstudianteSeleccionada(inicialStateEstudiante);
    setOpenInsert(!openModalInsert);
  };

  const handleModalDelete = () => {
    setOpenDelete(!openModalDelete);
  };

  const seleccionarConsolaEstudiante = (consola, caso) => {
    console.log("hola seleccionarConsola");
    console.log(consola);
    setConsolaEstudianteSeleccionada(consola);
    handleModalDelete();
  };

  const calcularEdad = (fecha) => {
    const cumple = new Date(fecha);
    const diff = new Date(Olimpiada.fechaLimiteEdad) - cumple.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  /*******************************************************
   *                     GRUDS
   * *****************************************************/
  //---    BuscarEstudiantes    --//
  const BuscarEstudiantes = async (value) => {
    console.log("Buscamos Estudiantes");
    console.log(baseUrlEstudiantes + "/" + value);
    await axios
      .get(
        baseUrlEstudiantes + "/search/" + value,
        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        },
        JSON.stringify({})
      )
      .then((response) => {
        console.log("getAllEquipos");
        console.log(response?.data);
        setEstudiantes(response?.data);
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };
  //---    GetByIdOlimpiada    --//
  const GetByIdOlimpiada = useCallback(async () => {
    await axios
      .get(
        baseUrlOlimpiada + "/" + cookies.get("olimpiada"),
        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        },
        JSON.stringify({
          idOlimpiada: 1,
        })
      )
      .then((response) => {
        console.log("OLimpiada =");
        setOlimpiada(response?.data);
        console.log(response?.data);
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [enqueueSnackbar]);

  //---    GetByIdOlimpiada    --//

  //---    GetByIdGrupo    --//
  const getAllEquipos = useCallback(async () => {
    await axios
      .get(
        baseUrl + "/olimpiada/" + cookies.get("olimpiada"),
        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        },
        JSON.stringify({
          idOlimpiada: 1,
        })
      )
      .then((response) => {
        console.log("getAllEquipos");
        setEquipos(response?.data);
        console.log(response?.data);
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [enqueueSnackbar]);

  const getAllEstudiantedDeEquipo = async (e) => {
    await axios
      .get(
        baseUrl + "/" + e + "/estudiantes",
        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        },
        JSON.stringify({})
      )
      .then((response) => {
        console.log("estudiantes de equipo");
        //setEquipos(response?.data);
        console.log(response?.data);
        setEstudiantesDEEquipo(response?.data);
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  //---    INSERT    --//
  const Insert = async (rude) => {
    console.log("Insert " + rude);
    handleModalInsert();
    await axios
      .post(
        baseUrl + "/" + consoleSeleccionada.idEquipo + "/estudiantes/" + rude,
        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        },
        JSON.stringify({})
      )
      .then((response) => {
        enqueueSnackbar("Estudiante agregado del grupo con exito!", {
          variant: "success",
        });
        getAllEstudiantedDeEquipo(consoleSeleccionada.idEquipo);
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  //---    DELETE    --//

  const Delete = async (rude) => {
    console.log("Delete " + rude);
    handleModalDelete();
    await axios
      .delete(
        baseUrl + "/" + consoleSeleccionada.idEquipo + "/estudiantes/" + rude,
        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        },
        JSON.stringify({})
      )
      .then((response) => {
        enqueueSnackbar("Estudiante eliminado del grupo con exito!", {
          variant: "success",
        });
        getAllEstudiantedDeEquipo(consoleSeleccionada.idEquipo);
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  useEffect(() => {
    GetByIdOlimpiada();
    getAllEquipos();
  }, [GetByIdOlimpiada, getAllEquipos]);
  return (
    <Card>
      <CardHeader>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Seleccione un Grupo
          </InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="idEquipo"
            label="Seleccione un Grupo"
            name="idEquipo"
            displayEmpty
            value={consoleSeleccionada.idEquipo}
            color="info"
            autoFocus
          >
            {Equipos.map((row) => (
              <MenuItem
                key={row.idEquipo}
                value={row.idEquipo}
                onClick={() => {
                  handleChangleSelect(row);
                }}
              >
                {row.idEquipo} - {row.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardHeader>

      <CardBody>
        {consoleSeleccionada.nombre === "" ? (
          <center>'Seleccione un Grupo'</center>
        ) : (
          <>
            <CardContent>
              <Typography gutterBottom variant="body2" component="div">
                Nivel: {consoleSeleccionada.nivel.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Limite de edad:{" "}
                <strong>{consoleSeleccionada.nivel.limiteEdad}</strong> años
                hasta el{" "}
                <strong>
                  {format(new Date(Olimpiada.fechaLimiteEdad), "dd-MM-yyyy")}
                </strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estudiantes por grupo: maximo{" "}
                <strong>{consoleSeleccionada.nivel.limitePorGrupo}</strong>{" "}
                estudiantes
              </Typography>
            </CardContent>

            <CardContent>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="body2" component="div">
                    Lista de Integrantes de grupo
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h6" component="div">
                    {EstudiantesDeEquipo.length <
                    consoleSeleccionada.nivel.limitePorGrupo ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleModalInsert}
                      >
                        {" "}
                        + Agregar Estudiante
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              {EstudiantesDeEquipo.length === 0 ? (
                <Alert severity="error">
                  <AlertTitle>Sin integrantes</AlertTitle>
                  Agrege estudiantes al grupo<strong>!</strong>
                </Alert>
              ) : (
                <Table
                  sx={{ minWidth: 650, border: 2, borderColor: "primary.main" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">RUDE</StyledTableCell>
                      <StyledTableCell align="center">CI</StyledTableCell>
                      <StyledTableCell align="center">NOMBRE</StyledTableCell>
                      <StyledTableCell align="center">
                        APPATERNO
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        APMATERNO
                      </StyledTableCell>
                      <StyledTableCell align="center">ACCIONES</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {EstudiantesDeEquipo.map((row) => (
                      <TableRow
                        key={row.rude}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{row.rude}</TableCell>
                        <TableCell align="center">{row.ci}</TableCell>
                        <TableCell align="center">{row.nombre}</TableCell>
                        <TableCell align="center">{row.apPaterno}</TableCell>
                        <TableCell align="center">{row.apMaterno}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              seleccionarConsolaEstudiante(row, "Eliminar");
                            }}
                            startIcon={<HighlightOffIcon />}
                          >
                            ELIMINAR DE GRUPO
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </>
        )}
      </CardBody>

      {/*MODAL INSERT NEW ELEMENT*/}
      <BootstrapDialog
        onClose={handleModalInsert}
        aria-labelledby="customized-dialog-title"
        open={openModalInsert}
        maxWidth="10%"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalInsert}
        >
          Agregar integrantes a grupo
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Box sx={{ minWidth: 120, marginLeft: 2, marginRight: 2 }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="rude"
                  label="Buscar estudiante por su RUDE"
                  name="rude"
                  type="text"
                  autoComplete="off"
                  value={seleccionarConsolaEstudiante.rude}
                  onChange={handleChangle}
                  autoFocus
                />
                <GridItem xs={12} sm={12} md={12}>
                  {consolaEstudianteSeleccionada.rude.length > 1 ? (
                    <div>
                      {Estudiantes.length === 0 ? (
                        <Alert
                          variant="outlined"
                          severity="info"
                          action={
                            <Button
                              color="success"
                              variant="contained"
                              size="small"
                              onClick={handleClickOpen}
                            >
                              Si, Registrar
                            </Button>
                          }
                        >
                          <AlertTitle>
                            No se encontro ningun estudiante
                          </AlertTitle>
                          Desea registrarlo como estudiante que participara por
                          primera ves en una olimpiada?
                          <strong></strong>
                        </Alert>
                      ) : (
                        ""
                      )}

                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                          {Estudiantes.map((row) => (
                            <TableRow
                              key={row.rude}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="center">{row.rude}</TableCell>
                              <TableCell align="center">
                                {row.nombre} {row.apPaterno} {row.apMaterno}
                              </TableCell>
                              <TableCell align="center">
                                {calcularEdad(row.fechaNac) <
                                consoleSeleccionada.nivel.limiteEdad ? (
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => {
                                      Insert(row.rude);
                                    }}
                                  >
                                    Agregar
                                  </Button>
                                ) : (
                                  <>No habilitado por la edad</>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    "Escriba el rude de un estudiante"
                  )}
                </GridItem>
              </Box>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleModalInsert}
          >
            Cancelar
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/*MODAL DELETE NEW ELEMENT*/}
      <BootstrapDialog
        onClose={handleModalDelete}
        aria-labelledby="customized-dialog-title"
        open={openModalDelete}
        maxWidth="10%"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalDelete}
        >
          Eliminar Integrante de Grupo
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              Esta seguro que quiere eliminar el estudiante{" "}
              <strong>{consolaEstudianteSeleccionada.nombre}</strong>{" "}
              <strong>{consolaEstudianteSeleccionada.apPaterno}</strong>{" "}
              <strong>{consolaEstudianteSeleccionada.apMaterno}</strong> del
              grupo <strong>{consoleSeleccionada.nombre}</strong>?
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="inherit" onClick={handleModalDelete}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            autoFocus
            onClick={() => {
              Delete(consolaEstudianteSeleccionada.rude);
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/** dialog insert Student */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Agregar Nuevo estudiante
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              continuar
            </Button>
          </Toolbar>
        </AppBar>
        <GridContainer>
          <center>
            <GridItem xs={12} sm={10} md={8}>
              <AgregarEstudiante />
            </GridItem>
          </center>
        </GridContainer>
      </Dialog>
    </Card>
  );
}
