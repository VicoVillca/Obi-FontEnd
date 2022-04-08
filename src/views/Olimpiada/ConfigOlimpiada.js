import React, { useEffect, useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "@mui/material/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

/// elements for select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
import axios from "axios";
import HOST from "variables/general.js";
import Cookies from "universal-cookie";
import { format } from "date-fns";
const cookies = new Cookies();
const baseUrl = HOST.URL_BACK_END + "olimpiada";
const header = HOST.headerPublic();
//cookie
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
  const { history } = props;
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({
    idOlimpiada: "",
    nombre: "",
    descripcion: "",
    fechaIni: "2000-12-31",
    fechaFin: "2000-12-31",
    fechaLimiteEdad: "2000-12-31",
    visible: false,
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
      .get(baseUrl + "/" + cookies.get("olimpiada"), JSON.stringify({}), header)
      .then((response) => {
        //setData(response?.data);

        setData({
          descripcion: response?.data.descripcion,
          fechaFin: castFecha(response?.data.fechaFin), //"2000-12-31T00:00:00.000Z",
          fechaIni: castFecha(response?.data.fechaIni),
          fechaLimiteEdad: castFecha(response?.data.fechaLimiteEdad),
          idOlimpiada: response?.data.idOlimpiada,
          nombre: response.data.nombre,
          visible: response?.data.visible,
        });
      })
      .catch((error) => {
        //alert(error+"");
        setData([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [setData, enqueueSnackbar]);
  //---    UPDATE    --//
  const Update = async (event) => {
    event.preventDefault();
    //showNotificationSuccess('success','Se modifico los datos con exito');
    await axios
      .patch(
        baseUrl + "/" + cookies.get("olimpiada"),
        JSON.stringify({
          nombre: data.nombre,
          descripcion: data.descripcion,
          fechaIni: data.fechaIni,
          fechaFin: data.fechaFin,
          fechaLimiteEdad: data.fechaLimiteEdad,
          visible: data.visible,
        }),
        header
      )
      .then((response) => {
        //showNotificationSuccess('success','Grupo guardado con exito');
        cookies.set("nombreolimpiada", data.nombre, { path: "/" });
        enqueueSnackbar("Se Guardo los cambios con exito!", {
          variant: "success",
        });
        history.push("/Olimpiada");
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
              <h1 className={classes.cardTitleWhite}>Editar Olimpiada</h1>
              <p className={classes.cardCategoryWhite}>
                Completa el formulario
              </p>
            </CardHeader>
            <CardBody>
              <form onSubmit={Update} id="create-course-form">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
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

                  <GridItem xs={4} sm={4} md={4}>
                    <Box sx={{ minWidth: 20, marginTop: 2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Visible para:
                        </InputLabel>
                        <Select
                          required
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Visible para:"
                          name="visible"
                          onChange={handleChangle}
                          value={data.visible}
                        >
                          <MenuItem value={true}>
                            Tutores y Coordinadores
                          </MenuItem>
                          <MenuItem value={false}>Solo Admin</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
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

                  <GridItem xs={12} sm={12} md={4}>
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
                      autoComplete="off"
                      onChange={handleChangle}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
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
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="fechaLimiteEdad"
                      label="Fecha Limite de edad"
                      name="fechaLimiteEdad"
                      type="date"
                      value={data.fechaLimiteEdad}
                      autoComplete="off"
                      onChange={handleChangle}
                    />
                  </GridItem>
                </GridContainer>
                <DialogActions>
                  <Button variant="contained" color="success" type="submit">
                    Actualizar Info
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
