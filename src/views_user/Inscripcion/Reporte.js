import React, { useCallback, useEffect, useState } from "react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import AlertTitle from "@mui/material/AlertTitle";
import Grid from "@mui/material/Grid";

import GridContainer from "components/Grid/GridContainer.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import InsightsIcon from "@mui/icons-material/Insights";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSnackbar } from "notistack";
///ELEMENTS FOR DIALOG

import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

import Cookies from "universal-cookie";
import HOST from "variables/general.js";

const cookies = new Cookies();
const baseUrl = HOST.URL_BACK_END + "equipo";

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

export default function Reportes() {
  const { enqueueSnackbar } = useSnackbar();
  const [equipos, setEquipos] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [openModalUpdate, setOpenUpdate] = useState(false);
  const seleccionarConsola = (consola) => {
    setEstudiantes(consola.estudiantes);
    handleModalUpdate();
  };
  const handleModalUpdate = () => {
    setOpenUpdate(!openModalUpdate);
  };
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
        console.log("datos weee");
        console.log(response?.data);
        setEquipos(response?.data);
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [enqueueSnackbar]);
  useEffect(() => {
    /// state
    getAllEquipos();
  }, [getAllEquipos]);
  return (
    <div>
      <Card>
        <CardHeader>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4" component="div">
                Reporte de equipos
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
                    <StyledTableCell align="center">IDEQUIPO</StyledTableCell>
                    <StyledTableCell align="center">NOMBRE</StyledTableCell>
                    <StyledTableCell align="center">COLEGIO</StyledTableCell>
                    <StyledTableCell align="center">DISTRITO</StyledTableCell>
                    <StyledTableCell align="center">
                      DEPARTAMENTO
                    </StyledTableCell>
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
                      <TableCell align="center">
                        {row.colegio.distrito.nombre}
                      </TableCell>
                      <TableCell align="center">
                        {row.colegio.distrito.departamento}
                      </TableCell>
                      <TableCell align="center">{row.nivel.nombre}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            seleccionarConsola(row);
                          }}
                        >
                          <FormatListNumberedIcon />
                        </IconButton>

                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <InsightsIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardBody>
      </Card>

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
          Lista de Integrantes
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <GridContainer>
            <Table
              sx={{
                minWidth: 650,
                mr: 2,
                ml: 2,
                border: 1,
                borderColor: "primary.main",
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">RUDE</StyledTableCell>
                  <StyledTableCell align="center">CI</StyledTableCell>
                  <StyledTableCell align="center">NOMBRE</StyledTableCell>
                  <StyledTableCell align="center">APPATERNO</StyledTableCell>
                  <StyledTableCell align="center">APMATERNO</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {estudiantes.map((row) => (
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </GridContainer>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
