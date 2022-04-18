import React, { useEffect, useState, useCallback } from "react";

import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
//modal

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
//formularios
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//elements for selected
import Box from "@mui/material/Box";
//alert

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

//elements for excel
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
export default function Descargar(props) {
  const [openModalDescarga, setOpenDescarga] = useState(false);
  const [resultado, setResultado] = useState([]);
  const handleModalDescarga = () => {
    setOpenDescarga(!openModalDescarga);
  };
  const downloadTxtFile = () => {
    let cadena = "";
    for (let i = 0; i < resultado.length; i++) {
      const row = resultado[i];
      const a =
        row.idNota +
        "," +
        row.idEquipo +
        "," +
        row.equipo +
        "," +
        row.puntos +
        "," +
        row.estado +
        "," +
        row.distrito +
        "," +
        row.departamento +
        "," +
        row.sie +
        "," +
        row.colegio;
      console.log(a);
      if (i === 0) cadena = a;
      else {
        cadena = cadena + "\n" + a;
      }
    }
    const element = document.createElement("a");
    const file = new Blob([cadena], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = props.nombre + ".txt";
    document.body.appendChild(element);
    element.click();
  };
  const downloadJsonFile = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(resultado)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = props.nombre + ".json";

    link.click();
  };
  const OrdenarListaDescarga = useCallback(async () => {
    let v = [];
    for (let i = 0; i < props.resultado2.length; i++) {
      const row = props.resultado2[i];
      const m = {
        idNota: row.idNota,
        idEquipo: row.equipo.idEquipo,
        equipo: row.equipo.nombre,
        puntos: row.puntos,
        estado: row.estado,
        distrito: row.equipo.colegio.distrito.nombre,
        departamento: row.equipo.colegio.distrito.departamento,
        sie: row.equipo.colegio.sie,
        colegio: row.equipo.colegio.nombre,
      };
      v.push(m);
    }
    setResultado(v);
  }, [props, setResultado]);
  useEffect(() => {
    OrdenarListaDescarga();
  }, [props, OrdenarListaDescarga]);
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={handleModalDescarga}
      >
        Descargar
      </Button>

      {/*MODAL UPDATE NEW ELEMENT*/}
      <BootstrapDialog
        onClose={handleModalDescarga}
        aria-labelledby="customized-dialog-title"
        open={openModalDescarga}
        maxWidth="10%"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalDescarga}
        >
          Descargar Notas
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Box sx={{ minWidth: 120, margin: 1 }}>
                <Alert severity="info">
                  <AlertTitle>Información</AlertTitle>
                  El orden y descripcion de la exportacion de datos es la
                  siguiente:
                  <br />
                  <br />
                  <strong>Datos:</strong>
                  <br />
                  <strong>idNota:</strong> Codigo unico asociado al Equipo,
                  nivel y etapa
                  <br />
                  <strong>idEquipo:</strong> Codigo unico asociado al equipo
                  <br />
                  <strong>equipo:</strong> Nombre de equipo
                  <br />
                  <strong>puntos:</strong> Puntos acumuladosen la etapa se usa
                  para ordenar la tabla de pociciones
                  <br />
                  <strong>Estado:</strong> Aprobado o Reprobado para la
                  siguiente etapa
                  <br />
                  <strong>Distrito:</strong> Nombre de distrito en el que se
                  encuentra el equipo
                  <br />
                  <strong>Departamento:</strong> Departamento que se encuentra
                  el equipo
                  <br />
                  <strong>Sie:</strong> Codigo Unico asociado al colegio
                  <br />
                  <strong>Colegio:</strong> Nombre del colegio
                  <br />
                </Alert>
              </Box>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={downloadJsonFile}
          >
            JSON
          </Button>
          <Button
            color="primary"
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={downloadTxtFile}
            sx={{
              mr: 1,
            }}
          >
            TXT
          </Button>
          <ExcelFile
            element={
              <Button
                color="success"
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleModalDescarga}
              >
                EXCEL
              </Button>
            }
            filename={props.nombre}
          >
            <ExcelSheet data={resultado} name="FormularioNotas">
              <ExcelColumn label="idNota" value="idNota" />
              <ExcelColumn label="idEquipo" value="idEquipo" />
              <ExcelColumn label="equipo" value="equipo" />
              <ExcelColumn label="puntos" value="puntos" />
              <ExcelColumn label="estado" value="estado" />
              <ExcelColumn label="distrito" value="distrito" />
              <ExcelColumn label="departamento" value="departamento" />
              <ExcelColumn label="sie" value="sie" />
              <ExcelColumn label="colegio" value="colegio" />
            </ExcelSheet>
          </ExcelFile>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
