import React, { useEffect, useState, useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "@mui/material/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// components dialog
import DialogActions from "@mui/material/DialogActions";

import { useSnackbar } from "notistack";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
//icons
import CodeIcon from "@mui/icons-material/Code";
import PreviewIcon from "@mui/icons-material/Preview";
import FlipIcon from "@mui/icons-material/Flip";
//Grid component
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
//textField
import TextField from "@mui/material/TextField";
//component markdown
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

import axios from "axios";
import HOST from "variables/general.js";
import { format } from "date-fns";
const baseUrl = HOST.URL_BACK_END + "etapa";
const header = HOST.headerPublic();

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.primary,
}));

export default withRouter(function UserProfile(props) {
  let { idEtapa } = useParams();
  const { history } = props;
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({
    idEtapa: 1,
    nombre: "",
    descripcion: "",
    fechaIni: "2000-12-31",
    fechaFin: "2000-12-31",
    tipo: "",
    habilitados: 0,
  });

  const handleChangle = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const castFecha = (date) => {
    return ("" + format(new Date(date), "yyyy-MM-dd")).substring(0, 10);
  };
  //---    GETBYID    --//
  const getById = useCallback(async () => {
    await axios
      .get(baseUrl + "/" + idEtapa, JSON.stringify({}), header)
      .then((response) => {
        //setData(response?.data);
        const n = response?.data;
        setData({
          idEtapa: n.idEtapa,
          nombre: n.nombre,
          descripcion: n.descripcion,
          fechaIni: castFecha(n.fechaIni),
          fechaFin: castFecha(n.fechaFin),
          tipo: n.tipo,
          habilitados: n.habilitados,
        });
      })
      .catch((error) => {
        //alert(error+"");
        setData([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [idEtapa, setData, enqueueSnackbar]);
  //---    UPDATE    --//
  const Update = async (event) => {
    event.preventDefault();
    //showNotificationSuccess('success','Se modifico los datos con exito');
    await axios
      .patch(
        baseUrl + "/" + idEtapa,
        JSON.stringify({
          nombre: data.nombre,
          descripcion: data.descripcion,
          fechaIni: data.fechaIni,
          fechaFin: data.fechaFin,
          tipo: data.tipo,
          habilitados: data.habilitados,
        }),
        header
      )
      .then((response) => {
        //showNotificationSuccess('success','Grupo guardado con exito');
        //cookies.set('nombreolimpiada',data.nombre, {path:"/"})
        enqueueSnackbar("Se Guardo los cambios con exito!", {
          variant: "success",
        });
        history.push("/etapas");
      })
      .catch((error) => {
        //alert(error+"");
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  useEffect(() => {
    /// state
    getById();
  }, [getById]);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h1 className={classes.cardTitleWhite}>Editar Etapa</h1>
              <p className={classes.cardCategoryWhite}>
                Completa el formulario
              </p>
            </CardHeader>
            <CardBody>
              <form onSubmit={Update} id="create-course-form">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="nombre"
                      label="Nombre de Olimpiada"
                      name="nombre"
                      type="text"
                      value={data.nombre}
                      autoComplete="off"
                      onChange={handleChangle}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="tipo"
                      label="Tipo de etapa"
                      name="tipo"
                      type="text"
                      value={data.tipo}
                      disabled
                      autoComplete="off"
                      onChange={handleChangle}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="fechaIni"
                      label="Fecha de inicio"
                      name="fechaIni"
                      type="date"
                      value={data.fechaIni}
                      onChange={handleChangle}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="fechaFin"
                      label="Fecha de Fin"
                      name="fechaFin"
                      type="date"
                      value={data.fechaFin}
                      autoComplete="off"
                      onChange={handleChangle}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    {/* inicio de mark down */}
                    <Box sx={{ width: "100%" }}>
                      <Tabs
                        value={value}
                        aria-label="Tabs where each tab needs to be selected manually"
                        onChange={handleChange}
                      >
                        <Tab icon={<CodeIcon />} />
                        <Tab icon={<PreviewIcon />} />
                        <Tab icon={<FlipIcon />} />
                      </Tabs>
                      {/* Components*/}
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          {value === 0 ? (
                            <>
                              <Grid item xs={12}>
                                <Item>
                                  <TextField
                                    helperText="el formulario recibe datos en formato MarkDown"
                                    value={data.descripcion}
                                    rows={10}
                                    multiline
                                    onChange={handleChangle}
                                    fullWidth
                                    label="descripcion"
                                    id="descripcion"
                                    name="descripcion"
                                  />
                                </Item>
                              </Grid>
                            </>
                          ) : (
                            ""
                          )}

                          {value === 1 ? (
                            <>
                              <Grid item xs={12}>
                                <Item2>
                                  <ReactMarkdown>
                                    {data.descripcion}
                                  </ReactMarkdown>
                                </Item2>
                              </Grid>
                            </>
                          ) : (
                            ""
                          )}
                          {value === 2 ? (
                            <>
                              <Grid item xs={6}>
                                <Item>
                                  <TextField
                                    helperText="el formulario recibe datos en formato MarkDown"
                                    value={data.descripcion}
                                    rows={10}
                                    multiline
                                    onChange={handleChangle}
                                    fullWidth
                                    label="descripcion"
                                    id="descripcion"
                                    name="descripcion"
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item2>
                                  <ReactMarkdown>
                                    {data.descripcion}
                                  </ReactMarkdown>
                                </Item2>
                              </Grid>
                            </>
                          ) : (
                            ""
                          )}
                        </Grid>
                      </Box>
                    </Box>

                    {/* fin de markdown */}
                  </GridItem>
                </GridContainer>
                <DialogActions>
                  <Link to={`/etapas`} style={{ textDecoration: "none" }}>
                    <Button variant="outlined">Cancelar</Button>
                  </Link>

                  <Button
                    sx={{ ml: 1 }}
                    variant="contained"
                    color="success"
                    type="submit"
                  >
                    Guardar
                  </Button>
                </DialogActions>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
});
