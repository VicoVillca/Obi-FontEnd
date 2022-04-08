import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
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
///search component
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
//notifications
import { useSnackbar } from "notistack";
//utiles para el webservise
import axios from "axios";
import HOST from "variables/general.js";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const baseUrl = HOST.URL_BACK_END + "olimpiada";
const baseUrlNivel = HOST.URL_BACK_END + "nivel";
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

export default function Olimpiada() {
  const { enqueueSnackbar } = useSnackbar();
  const [buscar, setBuscar] = useState("");
  const [openModalDelete, setOpenDelete] = useState(false);

  const [resultado2, setResultado2] = useState([]);
  const [resultado, setResultado] = useState([]);
  const inicialState = {
    idNivel: 1,
    nombre: "Acm Umsa",
    descripcion: "descrip",
    limiteEdad: 15,
    limitePorGrupo: 2,
  };
  const [consoleSeleccionada, setConsolaSeleccionada] = useState(inicialState);
  const handleChangeSearch = (event) => {
    setBuscar(event.target.value);

    if (1 > event.target.value.length) setResultado2(resultado);
    else {
      var city = event.target.value;
      var val = resultado.filter((r) =>
        (r.sie + r.nombre + r.zona + r.direccion + r.celular + r.dependencia)
          .toLowerCase()
          .includes(city.toLowerCase())
      );
      setResultado2(val);
    }
  };

  const handleModalDelete = () => {
    setOpenDelete(!openModalDelete);
  };

  const seleccionarData = (consola, caso) => {
    setConsolaSeleccionada(consola);
    console.log(consoleSeleccionada);
    handleModalDelete();
  };
  /*******************************************************
   *                     GRUDS
   * *****************************************************/
  //---    INSERT    --//

  //---    DELETE    --//
  const Delete = async (event) => {
    event.preventDefault();
    handleModalDelete();

    await axios
      .delete(baseUrlNivel + "/" + consoleSeleccionada.idNivel, header)
      .then((response) => {
        console.log(response);
        //showNotificationSuccess('success','Grupo guardado con exito');
        enqueueSnackbar("Eliminamos la noticia!", { variant: "success" });
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
      .get(
        baseUrl + "/" + cookies.get("olimpiada") + "/niveles",
        JSON.stringify({}),
        header
      )
      .then((response) => {
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
            Lista de Niveles
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
              <Link
                className="ui button primary"
                to={`/AddNivel`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  color="success"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Adicionar
                </Button>
              </Link>
            </Box>
          </Typography>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">idNivel</TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="left">MaxEdad</TableCell>
              <TableCell align="left">Max * Grupo</TableCell>
              <TableCell align="center" style={{ width: 200 }}>
                Acciones
              </TableCell>
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
                  {row.idNivel}
                </TableCell>
                <TableCell align="left">{row.nombre}</TableCell>
                <TableCell align="left">
                  {row.descripcion.length < 50
                    ? row.descripcion
                    : row.descripcion.substring(0, 10) + "..."}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: 20 }}
                  component="th"
                  scope="row"
                >
                  {row.limiteEdad}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: 100 }}
                  component="th"
                  scope="row"
                >
                  {row.limitePorGrupo}
                </TableCell>

                <TableCell align="center">
                  <Link
                    className="ui button primary"
                    to={`/nivel/${row.idNivel}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="outlined" color="success">
                      <RemoveRedEyeIcon />
                    </Button>
                  </Link>

                  <Link
                    className="ui button primary"
                    to={`/EditNivel/${row.idNivel}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="outlined" color="primary">
                      <EditIcon />
                    </Button>
                  </Link>
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
                Esta seguro que quiere eliminar el colegio{" "}
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
