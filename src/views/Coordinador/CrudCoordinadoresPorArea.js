import React, { useEffect, useState, useCallback } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
const baseUrlCoordinadores = HOST.URL_BACK_END + "coordinador";
const baseUrlDistritos = HOST.URL_BACK_END + "distrito";
const baseUrlUsuarios = HOST.URL_BACK_END + "user";
const header = HOST.headerPublic();
//galletitas
//Modal elements
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
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

export default function Olimpiada(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [usuarios, setUsuarios] = useState([]);

  const [distritos, setDistritos] = useState([]);
  const [openModalInsert, setOpenInsert] = useState(false);
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const [openModalDelete, setOpenDelete] = useState(false);

  const [resultado, setResultado] = useState([]);
  const inicialState = {
    idCoordinador: "",
    idEtapa: "",
    idNivel: "",
    area: "Departamento",
    codigo: "",
    User: { idUser: "", username: "" },
  };

  //Lista de solo coordinadores y activos

  const [consoleSeleccionada, setConsolaSeleccionada] = useState(inicialState);

  const handleChangle = (e) => {
    const { name, value } = e.target;
    if (name === "idUser") {
      const nam = "User";
      const val = { idUser: value, username: "Pedrito" };
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        [nam]: val,
      }));
    }
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "area") {
      const nombre = "codigo";
      const valor = "";
      setConsolaSeleccionada((prevState) => ({
        ...prevState,
        [nombre]: valor,
      }));
    }
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
  //---    INSERT    --//
  const Insert = async (event) => {
    event.preventDefault();
    handleModalInsert();
    await axios
      .post(
        baseUrlCoordinadores,
        JSON.stringify({
          area: consoleSeleccionada.area,
          codigo: consoleSeleccionada.codigo,
          idUser: consoleSeleccionada.User.idUser,
          idEtapa: props.idEtapa,
          idNivel: props.idNivel,
        }),
        header
      )
      .then((response) => {
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar("Se agrego el Distrito!", { variant: "success" });
        getCoordinadores();
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
    console.log("Update");
    console.log(baseUrlCoordinadores + "/" + consoleSeleccionada.idCoordinador);
    console.log(consoleSeleccionada);
    await axios
      .patch(
        baseUrlCoordinadores + "/" + consoleSeleccionada.idCoordinador,
        JSON.stringify({
          area: consoleSeleccionada.area,
          codigo: consoleSeleccionada.codigo,
          idUser: consoleSeleccionada.User.idUser,
          idEtapa: props.idEtapa,
          idNivel: props.idNivel,
        }),
        header
      )
      .then((response) => {
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar("Se Guardo los cambios con exito!", {
          variant: "success",
        });
        getCoordinadores();
      })
      .catch((error) => {
        //alert(error+"");
        console.log(error);
        enqueueSnackbar("OPcion no disponible en la fuente", {
          variant: "error",
        });
      });
  };

  //---    DELETE    --//
  //---    DELETE    --//
  const Delete = async (event) => {
    event.preventDefault();
    handleModalDelete();
    await axios
      .delete(
        baseUrlCoordinadores + "/" + consoleSeleccionada.idCoordinador,
        header
      )
      .then((response) => {
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar("Eliminamos el Material!", { variant: "success" });
        getCoordinadores();
      })
      .catch((error) => {
        //alert(error+"");
        enqueueSnackbar(error + "", { variant: "error" });
      });
    //showNotificationSuccess('success','Se elimino el grupo');
  };

  //---    getDistritos    --//
  const getDistritos = useCallback(async () => {
    await axios
      .get(baseUrlDistritos, JSON.stringify({}), header)
      .then((response) => {
        setDistritos(response?.data);
      })
      .catch((error) => {
        //alert(error+"");
        setDistritos([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [setDistritos, enqueueSnackbar]);

  //---    getUsuarios    --//
  const getUsuarios = useCallback(async () => {
    await axios
      .get(baseUrlUsuarios, JSON.stringify({}), header)
      .then((response) => {
        //setUsuarios(response?.data);
        const aux = response?.data;
        const sw = [];
        for (let index = 0; index < aux.length; index++) {
          const element = aux[index].role;
          if (element === "COORDINADOR") {
            sw.push(aux[index]);
          }
        }
        setUsuarios(sw);
      })
      .catch((error) => {
        //alert(error+"");
        setUsuarios([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [setUsuarios, enqueueSnackbar]);

  //---    getUsuarios    --//
  const getCoordinadores = useCallback(async () => {
    await axios
      .get(
        baseUrlCoordinadores + "/area/" + props.idNivel + "/" + props.idEtapa,
        JSON.stringify({}),
        header
      )
      .then((response) => {
        setResultado(response?.data);
      })
      .catch((error) => {
        //alert(error+"");
        setResultado([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [props, setResultado, enqueueSnackbar]);
  //---    GETBYID    --//

  useEffect(() => {
    /// state
    getDistritos();
    getUsuarios();

    getCoordinadores();
  }, [getDistritos, getUsuarios, getCoordinadores]);
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
            Coordinadores de Area
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
              <StyledTableCell align="center">idCoordinador</StyledTableCell>
              <StyledTableCell align="center">Usuario</StyledTableCell>
              <StyledTableCell align="left">Area</StyledTableCell>
              <StyledTableCell align="center" style={{ width: 200 }}>
                Acciones
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultado.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="center"
                  style={{ width: 50 }}
                  component="th"
                  scope="row"
                >
                  {row.idCoordinador}
                </TableCell>
                <TableCell align="center" style={{ width: 100 }}>
                  <Box
                    sx={{
                      bgcolor: "info.main",
                      color: "info.contrastText",
                      p: 0,
                      borderRadius: "30px",
                    }}
                  >
                    {row.User.username}
                  </Box>
                </TableCell>

                <TableCell align="left" style={{ width: 70 }}>
                  {row.area === "Distrito" ? (
                    <>
                      {distritos.map((r, index) =>
                        row.codigo + "" === r.idDistrito + ""
                          ? "Departamento:" + r.departamento + "," + r.nombre
                          : ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {row.area === "Departamento" ? (
                    <>
                      {row.area}:{row.codigo}
                    </>
                  ) : (
                    ""
                  )}
                  {row.area === "Nacional" ? <>{row.area}</> : ""}
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
              <GridItem xs={12} sm={12} md={12}>
                <Typography gutterBottom variant="h6" component="div">
                  <Box sx={{ minWidth: 20, marginTop: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Lista de Coordinadores
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="tipo-label"
                        id="idUser"
                        name="idUser"
                        label="Lista de Coordinadores"
                        required
                        value={consoleSeleccionada.User.idUser}
                        onChange={handleChangle}
                      >
                        {usuarios.map((row, index) => (
                          <MenuItem key={index} value={row.idUser}>
                            {row.username} - {row.correo}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Typography>
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <Typography gutterBottom variant="h6" component="div">
                  <Box sx={{ minWidth: 20, marginTop: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Area
                      </InputLabel>
                      <Select
                        fullWidth
                        required
                        labelId="tipo-label"
                        id="area"
                        name="area"
                        label="Area"
                        value={consoleSeleccionada.area}
                        onChange={handleChangle}
                      >
                        <MenuItem value={"Nacional"}>Nacional</MenuItem>
                        <MenuItem value={"Distrito"}> Distrital</MenuItem>
                        <MenuItem value={"Departamento"}>
                          Departamental
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Typography>
              </GridItem>

              {/**   en caso que sea distrital */}
              {consoleSeleccionada.area === "Distrito" ? (
                <>
                  <GridItem xs={12} sm={12} md={6}>
                    <Typography gutterBottom variant="h6" component="div">
                      <Box sx={{ minWidth: 20, marginTop: 2 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Codigo
                          </InputLabel>
                          <Select
                            fullWidth
                            required
                            labelId="tipo-label"
                            id="codigo"
                            name="codigo"
                            label="Codigo"
                            value={consoleSeleccionada.codigo}
                            onChange={handleChangle}
                          >
                            {distritos.map((row, index) => (
                              <MenuItem key={index} value={row.idDistrito}>
                                {row.nombre} - {row.departamento}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Typography>
                  </GridItem>
                </>
              ) : (
                ""
              )}

              {/** en caso que sea departamental */}

              {consoleSeleccionada.area === "Departamento" ? (
                <>
                  <GridItem xs={12} sm={12} md={6}>
                    <Typography gutterBottom variant="h6" component="div">
                      <Box sx={{ minWidth: 20, marginTop: 2 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Codigo
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="tipo-label"
                            id="codigo"
                            name="codigo"
                            label="Codigo"
                            value={consoleSeleccionada.codigo}
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
                </>
              ) : (
                ""
              )}
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
              <GridItem xs={12} sm={12} md={12}>
                <Typography gutterBottom variant="h6" component="div">
                  <Box sx={{ minWidth: 20, marginTop: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Lista de Coordinadores
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="tipo-label"
                        id="idUser"
                        name="idUser"
                        label="Lista de Coordinadores"
                        required
                        disabled
                        value={consoleSeleccionada.User.idUser}
                        onChange={handleChangle}
                      >
                        {usuarios.map((row, index) => (
                          <MenuItem key={index} value={row.idUser}>
                            {row.username} - {row.correo}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Typography>
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <Typography gutterBottom variant="h6" component="div">
                  <Box sx={{ minWidth: 20, marginTop: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Area
                      </InputLabel>
                      <Select
                        fullWidth
                        required
                        labelId="tipo-label"
                        id="area"
                        name="area"
                        label="Area"
                        value={consoleSeleccionada.area}
                        onChange={handleChangle}
                      >
                        <MenuItem value={"Nacional"}>Nacional</MenuItem>
                        <MenuItem value={"Distrito"}> Distrital</MenuItem>
                        <MenuItem value={"Departamento"}>
                          Departamental
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Typography>
              </GridItem>

              {/**   en caso que sea distrital */}
              {consoleSeleccionada.area === "Distrito" ? (
                <>
                  <GridItem xs={12} sm={12} md={6}>
                    <Typography gutterBottom variant="h6" component="div">
                      <Box sx={{ minWidth: 20, marginTop: 2 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Codigo
                          </InputLabel>
                          <Select
                            fullWidth
                            required
                            labelId="tipo-label"
                            id="codigo"
                            name="codigo"
                            label="Codigo"
                            value={consoleSeleccionada.codigo}
                            onChange={handleChangle}
                          >
                            {distritos.map((row, index) => (
                              <MenuItem key={index} value={row.idDistrito}>
                                {row.nombre} - {row.departamento}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Typography>
                  </GridItem>
                </>
              ) : (
                ""
              )}

              {/** en caso que sea departamental */}

              {consoleSeleccionada.area === "Departamento" ? (
                <>
                  <GridItem xs={12} sm={12} md={6}>
                    <Typography gutterBottom variant="h6" component="div">
                      <Box sx={{ minWidth: 20, marginTop: 2 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Codigo
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="tipo-label"
                            id="codigo"
                            name="codigo"
                            label="Codigo"
                            value={consoleSeleccionada.codigo}
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
                </>
              ) : (
                ""
              )}
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
                Esta seguro que quiere eliminar el coordinador{" "}
                <strong>{consoleSeleccionada.idCoordinador}</strong>?
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
