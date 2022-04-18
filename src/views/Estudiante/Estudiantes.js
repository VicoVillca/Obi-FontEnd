import React, { useEffect, useState, useCallback } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
/// elements for select
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
//icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
///search component
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
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
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
/// elements for select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//notifications
import { useSnackbar } from "notistack";
//galletitas
//Modal elements
//utiles para el webservise
import axios from "axios";
import HOST from "variables/general.js";
const baseUrl = HOST.URL_BACK_END + "estudiante";
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
            right: 2,
            top: 2,
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
//initialñ state
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
export default function Olimpiada() {
  const { enqueueSnackbar } = useSnackbar();
  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);
  const [buscar, setBuscar] = useState("");
  const [resultado2, setResultado2] = useState([]);
  const [resultado, setResultado] = useState([]);
  const inicialState = {
    rude: 0,
    nombre: "",
    apPaterno: "",
    apMaterno: "",
    celular: "",
    fechaNac: "",
    genero: "",
    ci: "",
    correo: "",
  };
  const [consoleSeleccionada, setConsolaSeleccionada] = useState(inicialState);
  const handleChangeSearch = (event) => {
    setBuscar(event.target.value);

    if (1 > event.target.value.length) setResultado2(resultado);
    else {
      var city = event.target.value;
      var val = resultado.filter((r) =>
        (
          r.rude +
          r.nombre +
          r.apPaterno +
          r.apMaterno +
          r.celular +
          r.fechaNac +
          r.genero +
          r.ci +
          r.correo
        )
          .toLowerCase()
          .includes(city.toLowerCase())
      );
      setResultado2(val);
    }
  };
  const handleChangle = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleModalInsert = () => {
    //limpiarFormulario();
    setConsolaSeleccionada(inicialState);
    setOpenInsert(!openModalInsert);
  };
  const handleModalUpdate = () => {
    setOpenUpdate(!openModalUpdate);
  };
  const handleModalDelete = () => {
    setOpenDelete(!openModalDelete);
  };

  const seleccionarData = (consola, caso) => {
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
        enqueueSnackbar("Se agrego el Distrito!", { variant: "success" });
        getAll();
      })
      .catch((error) => {
        //alert(error+"");
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  //---    UPDATE    --//
  const Update = async (event) => {
    event.preventDefault();
    handleModalUpdate();
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
        }),
        header
      )
      .then((response) => {
        console.log(response);
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar("Se Guardo los cambios con exito!", {
          variant: "success",
        });
        getAll();
      })
      .catch((error) => {
        //alert(error+"");
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  //---    DELETE    --//
  const Delete = async (event) => {
    event.preventDefault();
    handleModalDelete();

    await axios
      .delete(baseUrl + "/" + consoleSeleccionada.rude, header)
      .then((response) => {
        console.log(response);
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar("Eliminamos el Distrito!", { variant: "success" });
        getAll();
      })
      .catch((error) => {
        //alert(error+"");
        enqueueSnackbar(error + "", { variant: "error" });
      });
    //showNotificationSuccess('success','Se elimino el grupo');
  };
  //---    getAllColegios    --//
  const getAll = useCallback(async () => {
    await axios
      .get(baseUrl, JSON.stringify({}), header)
      .then((response) => {
        console.log(response);
        setResultado(response?.data);
        setResultado2(response?.data);
      })
      .catch((error) => {
        //alert(error+"");
        setResultado([]);
        setResultado2([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [setResultado, setResultado2, enqueueSnackbar]);
  useEffect(() => {
    /// state
    getAll();
  }, [getAll]);
  return (
    <div>
      {/**
       * en este lugar mostramos las notas pero necesitamos una variable mas el cod que describira el distrito / departamento o nacional
       */}
      {/*<PDFViewer style={{ width: "100%", height: "90vh" }}>*/}
      {/*<DocuPDF poema={poema} />*/}
      {/*</PDFViewer>*/}
      {/** Nro - Nota - Equipo - Departamento -  U. Educativa */}

      <Grid container alignItems="center">
        <Grid item xs>
          <Typography gutterBottom variant="h4" component="div">
            Lista de Estudiantes
          </Typography>
        </Grid>

        <Grid item>
          <Typography gutterBottom variant="h6" component="div">
            <Box sx={{ minWidth: 320, marginRight: 1 }}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="fechaNac"
                label="Buscar..."
                name="fechaNac"
                type="text"
                onChange={handleChangeSearch}
                value={buscar}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Typography>
        </Grid>

        <Grid item>
          <Typography gutterBottom variant="h6" component="div">
            <Box sx={{ minWidth: 25 }}>
              <Button
                color="success"
                variant="contained"
                onClick={handleModalInsert}
                startIcon={<AddIcon />}
              >
                Adicionar
              </Button>
            </Box>
          </Typography>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: 10 }}>RUDE</StyledTableCell>
              <StyledTableCell align="left">nombre</StyledTableCell>
              <StyledTableCell align="left">apPaterno</StyledTableCell>
              <StyledTableCell align="left">apMaterno</StyledTableCell>
              <StyledTableCell align="left">celular</StyledTableCell>
              <StyledTableCell align="left">fechaNac</StyledTableCell>
              <StyledTableCell align="left">genero</StyledTableCell>
              <StyledTableCell align="left">ci</StyledTableCell>
              <StyledTableCell align="left">Correo</StyledTableCell>
              <StyledTableCell align="center" style={{ width: 200 }}>
                Acciones
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultado2.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="center"
                  style={{ width: 10 }}
                  component="th"
                  scope="row"
                >
                  {row.rude}
                </TableCell>
                <TableCell align="left">{row.nombre}</TableCell>
                <TableCell align="left">{row.apPaterno}</TableCell>
                <TableCell align="left">{row.apMaterno}</TableCell>
                <TableCell align="left">{row.celular}</TableCell>
                <TableCell align="left">{row.fechaNac}</TableCell>
                <TableCell align="left">{row.genero}</TableCell>
                <TableCell align="left">{row.ci}</TableCell>
                <TableCell align="left">{row.correo}</TableCell>

                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      seleccionarData(row, "Editar");
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      seleccionarData(row, "Eliminar");
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/** MODAL  */}
      {/*MODAL INSERT NEW ELEMENT*/}
      <BootstrapDialog
        onClose={handleModalInsert}
        aria-labelledby="customized-dialog-title"
        open={openModalInsert}
        maxWidth={"sm"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalInsert}
        >
          Adicionar
        </BootstrapDialogTitle>
        <form onSubmit={Insert} id="create-course-form">
          <DialogContent dividers>
            <GridContainer>
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
                  autoComplete="off"
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
                  onChange={handleChangle}
                />
              </GridItem>

              <GridItem xs={3} sm={3} md={3}>
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
              <GridItem xs={3} sm={3} md={3}>
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
                  onChange={handleChangle}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
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
              <GridItem xs={3} sm={3} md={3}>
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
        maxWidth={"sm"}
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

              <GridItem xs={3} sm={3} md={3}>
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
                  value={consoleSeleccionada.correo}
                  onChange={handleChangle}
                />
              </GridItem>
              <GridItem xs={3} sm={3} md={3}>
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
              <GridItem xs={3} sm={3} md={3}>
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
              <GridItem xs={3} sm={3} md={3}>
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
          Eliminar
        </BootstrapDialogTitle>
        <form onSubmit={Delete}>
          <DialogContent dividers>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                Esta seguro que quiere eliminar el estudiante{" "}
                <strong>
                  {consoleSeleccionada.nombre} {consoleSeleccionada.apPaterno}{" "}
                  {consoleSeleccionada.apMaterno}
                </strong>
                ?
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
    </div>
  );
}
