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
import { departamentos } from "variables/general";
//utiles para el webservise
import axios from "axios";
import HOST from "variables/general.js";
const baseUrl = HOST.URL_BACK_END + "distrito";
const header = HOST.headerPublic();
//galletitas
//Modal elements
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
  const [ciudad, setCiudad] = useState("Todos");
  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);

  const [resultado2, setResultado2] = useState([]);
  const [resultado, setResultado] = useState([]);
  const inicialState = {
    idDistrito: "0",
    nombre: "",
    departamento: "",
  };
  const [consoleSeleccionada, setConsolaSeleccionada] = useState(inicialState);
  const handleChangeSearch = (event) => {
    setCiudad(event.target.value);
    if (event.target.value === "Todos") setResultado2(resultado);
    else {
      var city = event.target.value;
      var val = resultado.filter((r) => r.departamento.includes(city));

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
          nombre: consoleSeleccionada.nombre,
          departamento: consoleSeleccionada.departamento,
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
        baseUrl + "/" + consoleSeleccionada.idDistrito,
        JSON.stringify({
          nombre: consoleSeleccionada.nombre,
          departamento: consoleSeleccionada.departamento,
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
      .delete(baseUrl + "/" + consoleSeleccionada.idDistrito, header)
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
  //---    getAll    --//
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
            Lista de Distritos
          </Typography>
        </Grid>

        <Grid item>
          <Typography gutterBottom variant="h6" component="div">
            <Box sx={{ maxWidth: 150, minWidth: 150, marginRight: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Departamento
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ciudad}
                  label="Departamento"
                  onChange={handleChangeSearch}
                  defaultValue={0}
                >
                  <MenuItem value={"Todos"}>Todos</MenuItem>
                  {departamentos.map((row, index) => (
                    <MenuItem key={index} value={row.abr}>
                      {row.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              <StyledTableCell style={{ width: 10 }}>Nro</StyledTableCell>
              <StyledTableCell align="left">nombre</StyledTableCell>
              <StyledTableCell align="center">Departamento</StyledTableCell>
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
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.nombre}</TableCell>
                <TableCell align="center" style={{ width: 100 }}>
                  <Box
                    sx={{
                      bgcolor: "success.main",
                      color: "success.contrastText",
                      p: 0,
                      borderRadius: "30px",
                    }}
                  >
                    {departamentos.map((r, index) =>
                      row.departamento === r.abr ? r.nombre : ""
                    )}
                  </Box>
                </TableCell>

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
        maxWidth="80%"
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
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre de distrito"
                  name="nombre"
                  type="text"
                  autoComplete="off"
                  value={consoleSeleccionada.nombre}
                  onChange={handleChangle}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Typography gutterBottom variant="h6" component="div">
                  <Box sx={{ minWidth: 20, marginTop: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Departamento
                      </InputLabel>
                      <Select
                        fullWidth
                        required
                        labelId="tipo-label"
                        id="departamento"
                        name="departamento"
                        label="departamento"
                        value={consoleSeleccionada.departamento}
                        onChange={handleChangle}
                      >
                        {departamentos.map((row, index) => (
                          <MenuItem key={index} value={row.abr}>
                            {row.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Typography>
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
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre de distrito"
                  name="nombre"
                  type="text"
                  autoComplete="off"
                  value={consoleSeleccionada.nombre}
                  onChange={handleChangle}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Typography gutterBottom variant="h6" component="div">
                  <Box sx={{ minWidth: 20, marginTop: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Departamento
                      </InputLabel>
                      <Select
                        fullWidth
                        required
                        labelId="tipo-label"
                        id="departamento"
                        name="departamento"
                        label="departamento"
                        value={consoleSeleccionada.departamento}
                        onChange={handleChangle}
                      >
                        {departamentos.map((row, index) => (
                          <MenuItem key={index} value={row.abr}>
                            {row.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Typography>
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
                Esta seguro que quiere eliminar el distrito{" "}
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
    </div>
  );
}
