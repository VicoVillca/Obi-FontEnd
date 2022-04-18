import React, { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
//select
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//FORMULARIOS
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//notifications
import { useSnackbar } from "notistack";
///ELEMENTS FOR DIALOG
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

import Cookies from "universal-cookie";
import HOST from "variables/general.js";

const cookies = new Cookies();
const baseUrl = HOST.URL_BACK_END + "equipo";
const baseUrlColegios = HOST.URL_BACK_END + "colegio";
const baseUrlNiveles = HOST.URL_BACK_END + "olimpiada";
const header = HOST.headerPublic();

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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
export default function Paso2() {
  const { enqueueSnackbar } = useSnackbar();
  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);
  const [niveles, setNiveles] = useState([]);
  const [colegios, setColegios] = useState([]);
  const [equipos, setEquipos] = useState([]);
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
  const [consoleSeleccionada, setConsolaSeleccionada] = useState(inicialState);

  const handleChangle = (e) => {
    const { name, value } = e.target;
    if (name === "sie") {
      const v = {
        sie: value,
      };
      const nam = "colegio";
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        [nam]: v,
      }));
    } else {
      if (name === "idNivel") {
        const v = {
          idNivel: value,
        };
        const nam = "nivel";
        setConsolaSeleccionada((prevState) => ({
          ...prevState,
          [nam]: v,
        }));
      } else {
        setConsolaSeleccionada((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };
  const handleModalInsert = () => {
    setConsolaSeleccionada(inicialState);
    setOpenInsert(!openModalInsert);
  };
  const handleModalUpdate = () => {
    setOpenUpdate(!openModalUpdate);
  };
  const handleModalDelete = () => {
    setOpenDelete(!openModalDelete);
  };

  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    caso === "Editar" ? handleModalUpdate() : handleModalDelete();
  };

  /*******************************************************
   *                     GRUDS
   * *****************************************************/
  //---    INSERT    --//

  const Insert = async (event) => {
    event.preventDefault();
    handleModalInsert();
    await axios
      .post(
        baseUrl,
        JSON.stringify({
          nombre: consoleSeleccionada.nombre,
          sie: consoleSeleccionada.colegio.sie,
          idNivel: consoleSeleccionada.nivel.idNivel,
          idOlimpiada: cookies.get("olimpiada"),
        }),
        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        }
      )
      .then((response) => {
        enqueueSnackbar("Se agrego la nueva olimpiada!", {
          variant: "success",
        });
        getAllEquipos();
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  const Update = async (event) => {
    event.preventDefault();
    handleModalUpdate();
    await axios
      .patch(
        baseUrl + "/" + consoleSeleccionada.idEquipo,

        JSON.stringify({
          nombre: consoleSeleccionada.nombre,
          sie: consoleSeleccionada.colegio.sie,
          idNivel: consoleSeleccionada.nivel.idNivel,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        }
      )
      .then((response) => {
        enqueueSnackbar("Se guardaron las modificaciones!", {
          variant: "success",
        });
        getAllEquipos();
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  const Delete = async (event) => {
    event.preventDefault();
    handleModalDelete();
    await axios
      .delete(
        baseUrl + "/" + consoleSeleccionada.idEquipo,
        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        },
        JSON.stringify({})
      )
      .then((response) => {
        enqueueSnackbar("Grupo eliminado con exito!", { variant: "success" });
        getAllEquipos();
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  const getAllColegios = useCallback(async () => {
    await axios
      .get(baseUrlColegios, JSON.stringify({}), header)
      .then((response) => {
        setColegios(response?.data);
      })
      .catch((error) => {
        enqueueSnackbar("Error al cargar los colegios", { variant: "error" });
      });
  }, [setColegios, enqueueSnackbar]);

  const getAllNiveles = useCallback(async () => {
    await axios
      .get(
        baseUrlNiveles + "/" + cookies.get("olimpiada") + "/niveles",
        JSON.stringify({}),
        header
      )
      .then((response) => {
        setNiveles(response?.data);
      })
      .catch((error) => {
        enqueueSnackbar("Error al cargar los Niveles", { variant: "error" });
      });
  }, [setNiveles, enqueueSnackbar]);

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
          idOlimpiada: cookies.get("olimpiada"),
        })
      )
      .then((response) => {
        setEquipos(response?.data);
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [enqueueSnackbar]);

  useEffect(() => {
    getAllNiveles();
    getAllColegios();
    getAllEquipos();
  }, [getAllNiveles, getAllColegios, getAllEquipos]);

  return (
    <Card>
      <CardHeader>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">
              Lista de equipos
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              <Button
                variant="contained"
                color="primary"
                onClick={handleModalInsert}
              >
                {" "}
                + Agregar Equipo
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </CardHeader>

      <CardBody>
        {equipos.length === 0 ? (
          <Alert severity="error">
            <AlertTitle>Sin Equipos</AlertTitle>
            Agrege Los equipos de estudiantes que participaran en la olimpiada
            <strong>!</strong>
          </Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, border: 2, borderColor: "primary.main" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">idEquipo</StyledTableCell>
                  <StyledTableCell align="center">NOMBRE</StyledTableCell>
                  <StyledTableCell align="center">COLEGIO</StyledTableCell>
                  <StyledTableCell align="center">NIVEL</StyledTableCell>
                  <StyledTableCell align="center">ACCIONES</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {equipos.map((row) => (
                  <TableRow
                    key={row.idEquipo}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.idEquipo}</TableCell>
                    <TableCell align="center">{row.nombre}</TableCell>
                    <TableCell align="center">{row.colegio.nombre}</TableCell>
                    <TableCell align="center">{row.nivel.nombre}</TableCell>
                    <TableCell align="center">
                      <EditIcon
                        onClick={() => {
                          seleccionarConsola(row, "Editar");
                        }}
                        color="primary"
                      />

                      <DeleteIcon
                        onClick={() => {
                          seleccionarConsola(row, "Eliminar");
                        }}
                        color="error"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
          Agregar Grupo
        </BootstrapDialogTitle>
        <form onSubmit={Insert} id="create-course-form">
          <DialogContent dividers>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Box sx={{ minWidth: 120, marginLeft: 2, marginRight: 2 }}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="nombre"
                    label="Nombre del grupo"
                    name="nombre"
                    type="text"
                    autoComplete="off"
                    value={consoleSeleccionada.nombre}
                    onChange={handleChangle}
                  />
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Box sx={{ minWidth: 120, margin: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Sie de colegio
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="sie"
                      label="Sie de colegio"
                      name="sie"
                      displayEmpty
                      value={consoleSeleccionada.colegio.sie}
                      onChange={handleChangle}
                    >
                      {colegios.map((row) => (
                        <MenuItem key={row.sie} value={row.sie}>
                          {row.sie} - {row.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Box sx={{ minWidth: 120, margin: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Nivel</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="idNivel"
                      label="Nivel"
                      name="idNivel"
                      value={consoleSeleccionada.nivel.idNivel}
                      onChange={handleChangle}
                    >
                      {niveles.map((row) => (
                        <MenuItem key={row.idNivel} value={row.idNivel}>
                          {row.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button variant="text" color="inherit" onClick={handleModalInsert}>
              Cancelar
            </Button>
            <Button variant="contained" color="success" autoFocus type="submit">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
      {/*MODAL UPDATE NEW ELEMENT*/}
      <BootstrapDialog
        onClose={handleModalUpdate}
        aria-labelledby="customized-dialog-title"
        open={openModalUpdate}
        maxWidth="10%"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalUpdate}
        >
          Editar Grupo
        </BootstrapDialogTitle>
        <form onSubmit={Update}>
          <DialogContent dividers>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Box sx={{ minWidth: 120, marginLeft: 2, marginRight: 2 }}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="nombre"
                    label="Nombre del grupo"
                    name="nombre"
                    type="text"
                    autoComplete="off"
                    value={consoleSeleccionada.nombre}
                    onChange={handleChangle}
                  />
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Box sx={{ minWidth: 120, margin: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Sie de colegio
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="sie"
                      label="Sie de colegio"
                      name="sie"
                      displayEmpty
                      value={consoleSeleccionada.colegio.sie}
                      onChange={handleChangle}
                    >
                      {colegios.map((row) => (
                        <MenuItem key={row.sie} value={row.sie}>
                          {row.sie} - {row.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Box sx={{ minWidth: 120, margin: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Nivel</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="idNivel"
                      label="Nivel"
                      name="idNivel"
                      onChange={handleChangle}
                      value={consoleSeleccionada.nivel.idNivel}
                    >
                      {niveles.map((row) => (
                        <MenuItem key={row.idNivel} value={row.idNivel}>
                          {row.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button variant="text" color="inherit" onClick={handleModalUpdate}>
              Cancelar
            </Button>
            <Button variant="contained" color="success" autoFocus type="submit">
              Guardar
            </Button>
          </DialogActions>
        </form>
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
          Eliminar Grupo
        </BootstrapDialogTitle>
        <form onSubmit={Delete}>
          <DialogContent dividers>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                esta seguro que quiere eliminar el Grupo{" "}
                <strong>{consoleSeleccionada.nombre}</strong>?
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button variant="text" color="inherit" onClick={handleModalDelete}>
              Cancelar
            </Button>
            <Button variant="contained" color="error" autoFocus type="submit">
              Eliminar
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
      {/*ALERT COMPONENT*/}
    </Card>
  );
}
