import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import * as XLSX from "xlsx";
//modal
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
//formularios
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CircularProgress from "@mui/material/CircularProgress";
//elements for selected
import Box from "@mui/material/Box";
//alert

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import SaveIcon from "@mui/icons-material/Save";

//table

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//imput
import AttachmentIcon from "@mui/icons-material/Attachment";
//webservise
import axios from "axios";
import HOST from "variables/general.js";
import Cookies from "universal-cookie";
// staknotifications
import { useSnackbar } from "notistack";
const cookies = new Cookies();

const baseUrlNota = HOST.URL_BACK_END + "nota";
const Input = styled("input")({
  display: "none",
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
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [observaciones, setObserbaciones] = useState([]);
  const [resultado, setResultado] = useState([]);

  let exito = 0;
  let fallo = 0;
  const [fileName, setFileName] = useState("");
  const [openModalDescarga, setOpenDescarga] = useState(false);
  const [openModalUpload, setOpenUpload] = useState(false);
  const [openModalSave, setOpenSave] = useState(false);
  const handleModalDescarga = () => {
    setOpenDescarga(!openModalDescarga);
  };
  const handleModalUpload = () => {
    setOpenUpload(!openModalUpload);
  };
  const handleModalSave = () => {
    setOpenSave(!openModalSave);
  };

  const save = () => {
    handleModalUpload();
    handleModalSave();
    exito = 0;
    fallo = 0;
    for (let i = 0; i < data.length; i++) {
      //const element = data[i];
      Update(data[i]);
    }
  };
  const filePathset = (e) => {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    e.target.value = null;
    setFileName(file.name);
    //readFile(this.state.file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const datos = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      handleModalDescarga();
      handleModalUpload();
      setData(convertToJson(datos));
    };
    reader.readAsBinaryString(file);
  };
  const convertToJson = (csv) => {
    //setObserbaciones([]);
    var observ = [];
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      obj[headers[0]] = currentline[0]; //idNota
      obj[headers[1]] = currentline[1]; //idEquipo
      obj[headers[2]] = currentline[2]; //nombre de equipo
      obj[headers[3]] = currentline[3]; //puntos nota
      obj[headers[4]] = currentline[4]; //Estado
      obj["guardado"] = 0; //Estado
      if (currentline[0] !== "") {
        //INiciamos la validacion
        if (buscarId(currentline[0], currentline[1])) {
          //idVAlido
          if (esNotaValida(currentline[3])) {
            //NOta Valida
            if (esEstadoValido(currentline[4])) {
              //estado Valido

              result.push(obj);
              //if (i !== 1) phpconect += ";";
              //phpconect +=
              //currentline[0] + "," + currentline[3] + "," + currentline[4];
            } else {
              observ.push(
                "Estado '" +
                  currentline[4] +
                  "' no Valido de la fila " +
                  (i + 1) +
                  " Tiene q ser 'Aprobado' o 'Reprobado'"
              );
            }
          } else {
            observ.push(
              "Nota '" +
                currentline[3] +
                "' no valida de la fila " +
                (i + 1) +
                " tiene q ser un valor numerico entero mayor o igual a '0'"
            );
          }
        } else {
          observ.push(
            "No encontramos el equipo de la fila " +
              (i + 1) +
              " puede que el equipo no este habilitado para esta etapa"
          );
        }
        //Finalizamso la validacion
      }
    }
    setObserbaciones(observ);

    //return result; //JavaScript object
    //return JSON.stringify(result); //JSON String
    return result; //JSON Object
  };
  const buscarId = (idNota, idEquipo) => {
    for (let i = 0; i < resultado.length; i++) {
      const element = resultado[i];

      if (
        element.idNota + "" === idNota + "" &&
        element.equipo.idEquipo + "" === idEquipo + ""
      ) {
        return true;
      }
    }
    return false;
  };
  const esNotaValida = (n) => {
    let valueInt = parseInt(n);
    if (Number.isInteger(valueInt)) {
      if (valueInt >= 0) return true;
    }
    return false;
  };
  const esEstadoValido = (e) => {
    if (e === "" || e === "Aprobado" || e === "Reprobado") {
      return true;
    }
    return false;
  };
  const terminarProceso = () => {
    if (fallo + exito === data.length) {
      setOpenSave(false);
      enqueueSnackbar("Se guardaron los cambios", { variant: "success" });
      props.func();
    }
  };

  //---    UPDATE    --//
  const Update = async (e) => {
    //event.preventDefault();
    //handleModalUpdate();
    await axios
      .patch(
        baseUrlNota + "/" + e.idNota,
        JSON.stringify({
          puntos: e.puntos,
          estado: e.estado,
          recomendaciones: e.recomendaciones,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        }
      )
      .then((response) => {
        //enqueueSnackbar("Se guardaron los cambios", { variant: "info" });
        //getNotas();
        exito = exito + 1;
        terminarProceso();
      })
      .catch((error) => {
        ///enqueueSnackbar(error + "", { variant: "error" });
        fallo = fallo + 1;
        terminarProceso();
      });
  };
  useEffect(() => {
    setResultado(props.resultado2);
  }, [props]);
  return (
    <>
      <Button
        variant="contained"
        endIcon={<FileUploadIcon />}
        onClick={handleModalDescarga}
      >
        Subir
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
          Subir Notas
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Box sx={{ minWidth: 120, margin: 1 }}>
                <Alert severity="info">
                  <AlertTitle>Información</AlertTitle>
                  El orden y descripcion de la importacion de datos es la
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
                  <strong>nombre:</strong> Nombre de equipo
                  <br />
                  <strong>puntos:</strong> Puntos acumulados en la etapa se usa
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
            variant="outlined"
            onClick={handleModalDescarga}
            sx={{
              mr: 1,
            }}
          >
            Cancelar
          </Button>
          <label htmlFor="contained-button-file">
            <Input
              accept=".xlsx,.xls"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => filePathset(e)}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<AttachmentIcon />}
            >
              Seleccionar Archivo excel
            </Button>
          </label>
        </DialogActions>
      </BootstrapDialog>

      {/*MODAL UPDATE NEW ELEMENT*/}
      <BootstrapDialog
        onClose={handleModalUpload}
        aria-labelledby="customized-dialog-title"
        open={openModalUpload}
        maxWidth="10%"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalUpload}
        >
          {fileName}
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Box sx={{ minWidth: 120, margin: 1 }}>
                {observaciones.length === 0 ? (
                  <Alert severity="info">
                    <AlertTitle>Info</AlertTitle>
                    Se detectaron — <strong>{data.length}</strong> Equipos,
                    seleccione <strong>GUARDAR</strong> para registrar las notas
                  </Alert>
                ) : (
                  <Alert severity="warning">
                    <AlertTitle>Observaciones</AlertTitle>
                    <strong>
                      Modifique las observaciones e intente nuevamente
                    </strong>
                    <br />
                    {observaciones.map((row, index) => (
                      <>
                        {" "}
                        <strong>{index + 1}: </strong> {row}
                        <br />
                      </>
                    ))}
                  </Alert>
                )}
              </Box>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleModalUpload}
            sx={{
              mr: 1,
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={observaciones.length === 0 ? false : true}
            startIcon={<SaveIcon />}
            onClick={save}
          >
            Guardar
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/*MODAL Save NEW ELEMENT*/}
      <BootstrapDialog
        onClose={handleModalSave}
        aria-labelledby="customized-dialog-title"
        open={openModalSave}
        maxWidth="10%"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleModalSave}
        >
          Guardando...
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Box sx={{ minWidth: 120, margin: 1 }}>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell style={{ width: 3 }}>
                          Nro
                        </StyledTableCell>
                        <StyledTableCell align="left">Equipo</StyledTableCell>
                        <StyledTableCell align="left">Estado</StyledTableCell>
                        <StyledTableCell align="left">Puntos</StyledTableCell>
                        <StyledTableCell align="left">Estado</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            align="center"
                            style={{ width: 10 }}
                            component="th"
                            scope="row"
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell align="left">{row.equipo}</TableCell>
                          <TableCell align="left" style={{ width: 10 }}>
                            {row.estado}
                          </TableCell>
                          <TableCell align="left" style={{ width: 10 }}>
                            {row.puntos}
                          </TableCell>
                          <TableCell align="center" style={{ width: 10 }}>
                            {row.guardado === 1 ? (
                              <BookmarkAddedIcon color="success" />
                            ) : (
                              ""
                            )}

                            {row.guardado === 3 ? (
                              <SaveIcon color="error" />
                            ) : (
                              ""
                            )}
                            {row.guardado === 0 ? (
                              <CircularProgress color="error" />
                            ) : (
                              ""
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </GridItem>
          </GridContainer>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
