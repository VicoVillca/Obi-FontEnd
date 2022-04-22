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
import VerifiedIcon from "@mui/icons-material/Verified";
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
import FingerprintIcon from "@mui/icons-material/Fingerprint";

//icons disable
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import DesktopAccessDisabledIcon from "@mui/icons-material/DesktopAccessDisabled";

//FORMULARIOS
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
/// elements for select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
///search component
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
//notifications
import { useSnackbar } from "notistack";
import { roles } from "variables/general";
//utiles para el webservise
import axios from "axios";
import HOST from "variables/general.js";
const baseUrl = HOST.URL_BACK_END + "user";
const baseUrlContraseña = HOST.URL_BACK_END + "auth/recuperar";
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
  const [buscar, setBuscar] = useState("");
  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalContraseña, setOpenContraseña] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);

  const [resultado2, setResultado2] = useState([]);
  const [resultado, setResultado] = useState([]);
  const inicialState = {
    idUser: "0",
    username: "",
    role: "",
    acceso: "",
    correo: "",
  };
  const [consoleSeleccionada, setConsolaSeleccionada] = useState(inicialState);
  const handleChangeSearch = (event) => {
    setBuscar(event.target.value);

    if (1 > event.target.value.length) setResultado2(resultado);
    else {
      var city = event.target.value;
      var val = resultado.filter((r) =>
        (r.username + r.role + r.correo)
          .toLowerCase()
          .includes(city.toLowerCase())
      );
      setResultado2(val);
      setCiudad("Todos");
    }
  };
  const handleChangeCity = (event) => {
    setCiudad(event.target.value);
    if (event.target.value === "Todos") setResultado2(resultado);
    else {
      var city = event.target.value;
      var val = resultado.filter((r) => r.role.includes(city));
      setBuscar("");
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
  const handleModalContraseña = () => {
    setOpenContraseña(!openModalContraseña);
  };
  const handleModalDelete = () => {
    setOpenDelete(!openModalDelete);
  };

  const seleccionarData = (consola, caso) => {
    setConsolaSeleccionada(consola);
    console.log(consoleSeleccionada);

    if (caso === "Editar") handleModalUpdate();
    if (caso === "Eliminar") handleModalDelete();
    if (caso === "contraseña") handleModalContraseña();
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
          username: consoleSeleccionada.username,
          role: consoleSeleccionada.role,
          acceso: consoleSeleccionada.acceso,
          correo: consoleSeleccionada.correo,
        }),
        header
      )
      .then((response) => {
        console.log(response);
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar("Se agrego el Usuario!", { variant: "success" });
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
        baseUrl + "/" + consoleSeleccionada.idUser,
        JSON.stringify({
          username: consoleSeleccionada.username,
          role: consoleSeleccionada.role,
          acceso: consoleSeleccionada.acceso,
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
  //---    New Contraseña --//

  const Contraseña = async (event) => {
    event.preventDefault();
    console.log("Contraseña");
    handleModalContraseña();

    await axios
      .post(
        baseUrlContraseña,
        JSON.stringify({
          correo: consoleSeleccionada.correo,
        }),
        header
      )
      .then((response) => {
        console.log(response);
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar(
          "Se envio la solicitud para cambiar la contraseña al correo!",
          {
            variant: "success",
          }
        );
        getAll();
      })
      .catch((error) => {
        //alert(error+"");
        enqueueSnackbar(
          "No se pudo enviar la solicitud de contraseña nueva al correo",
          { variant: "error" }
        );
      });
  };
  //---    DELETE    --//
  const Delete = async (event) => {
    event.preventDefault();
    handleModalDelete();

    await axios
      .delete(baseUrl + "/" + consoleSeleccionada.idUser, header)
      .then((response) => {
        console.log(response);
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar("Eliminamos el Usuario!", { variant: "success" });
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
        console.log(response?.data);
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
            Lista de Usuarios
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
                size="small"
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
            <Box sx={{ maxWidth: 150, minWidth: 150, marginRight: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Roles</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ciudad}
                  label="Departamento"
                  onChange={handleChangeCity}
                  defaultValue={0}
                >
                  <MenuItem value={"Todos"}>Todos</MenuItem>
                  {roles.map((row, index) => (
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
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="left">UserName</StyledTableCell>
              <StyledTableCell align="left">Correo</StyledTableCell>
              <StyledTableCell align="center">Acceso</StyledTableCell>
              <StyledTableCell align="center">Rol</StyledTableCell>
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
                  {row.idUser}
                </TableCell>
                <TableCell align="left">{row.username}</TableCell>

                <TableCell align="left">
                  {row.correo}{" "}
                  {!row.correoVerificado ? (
                    "no"
                  ) : (
                    <VerifiedIcon color="success" />
                  )}
                </TableCell>
                <TableCell align="center">
                  {row.acceso ? (
                    <DesktopWindowsIcon color="primary" />
                  ) : (
                    <DesktopAccessDisabledIcon color="disabled" />
                  )}
                </TableCell>
                <TableCell align="center" style={{ width: 100 }}>
                  {row.role === "TUTOR" ? (
                    <>
                      <Box
                        sx={{
                          bgcolor: "success.main",
                          color: "success.contrastText",
                          p: 0,
                          borderRadius: "30px",
                        }}
                      >
                        {roles.map((r, index) =>
                          row.role === r.abr ? r.nombre : ""
                        )}
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}
                  {row.role === "COORDINADOR" ? (
                    <>
                      <Box
                        sx={{
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          p: 0,
                          borderRadius: "30px",
                        }}
                      >
                        {roles.map((r, index) =>
                          row.role === r.abr ? r.nombre : ""
                        )}
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}

                  {row.role === "ADMIN" ? (
                    <>
                      <Box
                        sx={{
                          bgcolor: "error.main",
                          color: "error.contrastText",
                          p: 0,
                          borderRadius: "30px",
                        }}
                      >
                        Admin
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}
                </TableCell>

                <TableCell align="center">
                  {row.role === "ADMIN" ? (
                    <>
                      <Button variant="outlined" color="primary" disabled>
                        <FingerprintIcon />
                      </Button>
                      <Button variant="outlined" color="primary" disabled>
                        <EditIcon />
                      </Button>
                      <Button variant="outlined" color="error" disabled>
                        <DeleteIcon />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          seleccionarData(row, "contraseña");
                        }}
                      >
                        <FingerprintIcon />
                      </Button>
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
                    </>
                  )}
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
              <GridItem xs={12} sm={12} md={8}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  type="text"
                  helperText="La contraseña sera por defecto el nombre de usuario"
                  autoComplete="off"
                  value={consoleSeleccionada.username}
                  onChange={handleChangle}
                />
              </GridItem>

              <GridItem xs={4} sm={4} md={4}>
                <Box sx={{ minWidth: 20, marginTop: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Acceso
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Acceso"
                      name="acceso"
                      onChange={handleChangle}
                      value={consoleSeleccionada.acceso}
                    >
                      <MenuItem value={true}>Habilitado</MenuItem>
                      <MenuItem value={false}>Desabilitado</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </GridItem>

              <GridItem xs={12} sm={12} md={8}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="correo"
                  label="correo"
                  name="correo"
                  type="email"
                  autoComplete="off"
                  value={consoleSeleccionada.correo}
                  onChange={handleChangle}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <Typography gutterBottom variant="h6" component="div">
                  <Box sx={{ minWidth: 20, marginTop: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                      <Select
                        fullWidth
                        labelId="tipo-label"
                        id="role"
                        required
                        name="role"
                        label="Rol"
                        value={consoleSeleccionada.role}
                        onChange={handleChangle}
                      >
                        {roles.map((row, index) => (
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
        maxWidth={"sm"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalUpdate}
        >
          Editar
        </BootstrapDialogTitle>
        <form onSubmit={Update}>
          <DialogContent dividers>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  value={consoleSeleccionada.username}
                  onChange={handleChangle}
                />
              </GridItem>

              <GridItem xs={4} sm={4} md={4}>
                <Box sx={{ minWidth: 20, marginTop: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Acceso
                    </InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Acceso"
                      name="acceso"
                      onChange={handleChangle}
                      value={consoleSeleccionada.acceso}
                    >
                      <MenuItem value={true}>Habilitado</MenuItem>
                      <MenuItem value={false}>Desabilitado</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </GridItem>

              <GridItem xs={12} sm={12} md={8}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="correo"
                  label="correo"
                  name="correo"
                  type="email"
                  autoComplete="off"
                  value={consoleSeleccionada.correo}
                  onChange={handleChangle}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <Typography gutterBottom variant="h6" component="div">
                  <Box sx={{ minWidth: 20, marginTop: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                      <Select
                        fullWidth
                        required
                        labelId="tipo-label"
                        id="role"
                        name="role"
                        label="Rol"
                        value={consoleSeleccionada.role}
                        onChange={handleChangle}
                      >
                        {roles.map((row, index) => (
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

      {/*MODAL required new pasword*/}
      <BootstrapDialog
        onClose={handleModalContraseña}
        aria-labelledby="customized-dialog-title"
        open={openModalContraseña}
        maxWidth="10%"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalContraseña}
        >
          Cambiar contraseña
        </BootstrapDialogTitle>
        <form onSubmit={Contraseña}>
          <DialogContent dividers>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                Se enviara una solicitud de nueva contraseña al correo{" "}
                <strong>{consoleSeleccionada.correo}</strong>?
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button
              variant="text"
              color="inherit"
              onClick={handleModalContraseña}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="success" autoFocus type="submit">
              Enviar Correo
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
                Esta seguro que quiere eliminar el Usuario{" "}
                <strong>{consoleSeleccionada.username}</strong>?
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
