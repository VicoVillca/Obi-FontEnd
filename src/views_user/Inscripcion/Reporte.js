import React, { useCallback, useEffect, useState } from "react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import AlertTitle from "@mui/material/AlertTitle";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import InsightsIcon from "@mui/icons-material/Insights";

import axios from "axios";
import { useSnackbar } from "notistack";

import Cookies from "universal-cookie";
import HOST from "variables/general.js";

const cookies = new Cookies();
const baseUrl = HOST.URL_BACK_END + "equipo";

export default function Reportes() {
  const { enqueueSnackbar } = useSnackbar();
  const [equipos, setEquipos] = useState([]);

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
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                >
                  {" "}
                  Descargar Lista
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
                    <TableCell align="center">IDEQUIPO</TableCell>
                    <TableCell align="center">NOMBRE</TableCell>
                    <TableCell align="center">COLEGIO</TableCell>
                    <TableCell align="center">DISTRITO</TableCell>
                    <TableCell align="center">DEPARTAMENTO</TableCell>
                    <TableCell align="center">NIVEL</TableCell>
                    <TableCell align="center">ACCIONES</TableCell>
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
    </div>
  );
}
