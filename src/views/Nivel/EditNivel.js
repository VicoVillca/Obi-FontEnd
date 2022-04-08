import React, { useEffect, useState, useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { tiposDeMaterial } from "variables/general";

import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

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
//swith

//elementos para tabla
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useParams } from "react-router-dom";
const baseUrl = HOST.URL_BACK_END + "nivel";
const baseUrlMaterial = HOST.URL_BACK_END + "material";
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
  let { idNivel } = useParams();
  const { history } = props;
  const [value, setValue] = useState(0);
  const [resultado2, setResultado2] = useState([]);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({
    idNivel: 1,
    nombre: "",
    descripcion: "",
    limiteEdad: 10,
    limitePorGrupo: 1,
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

  //---    GETBYID    --//
  const getById = useCallback(async () => {
    await axios
      .get(baseUrl + "/" + idNivel, JSON.stringify({}), header)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {
        setData([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [idNivel, setData, enqueueSnackbar]);
  //---    UPDATE    --//
  const Update = async (event) => {
    event.preventDefault();
    await axios
      .patch(
        baseUrl + "/" + idNivel,
        JSON.stringify({
          nombre: data.nombre,
          descripcion: data.descripcion,
          limiteEdad: data.limiteEdad,
          limitePorGrupo: data.limitePorGrupo,
        }),
        header
      )
      .then((response) => {
        enqueueSnackbar("Se Guardo los cambios con exito!", {
          variant: "success",
        });
        history.push("/niveles");
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  const getAllMateriales = useCallback(
    async (data) => {
      await axios
        .get(baseUrlMaterial, JSON.stringify({}), header)
        .then((response) => {
          setResultado2(response?.data);
          const m = response?.data;
          const v = [];
          for (let i = 0; i < m.length; i++) {
            const element = m[i];
            let sw = false;
            for (let j = 0; j < data.length; j++) {
              const element2 = data[j];
              if (element.idMaterial === element2.idMaterial) {
                sw = true;
                break;
              }
            }
            v.push({
              idMaterial: element.idMaterial,
              titulo: element.titulo,
              subTitulo: element.subTitulo,
              tipo: element.tipo,
              archivo: element.archivo,
              fecha: element.fecha,
              esta: sw,
            });
          }
          //fin de todo weee
          console.log("Resultado weeee");
          console.log(v);
          setResultado2(v);
        })
        .catch((error) => {
          setResultado2([]);
          enqueueSnackbar(error + "", { variant: "error" });
        });
    },
    [setResultado2, enqueueSnackbar]
  );

  const getAllMaterialesDeNivel = useCallback(async () => {
    await axios
      .get(baseUrl + "/" + idNivel + "/material", JSON.stringify({}), header)
      .then((response) => {
        getAllMateriales(response?.data);
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [getAllMateriales, idNivel, enqueueSnackbar]);

  const AgregarRecomendacion = async (row) => {
    console.log("Agregamos REcomendacion");
    await axios
      .patch(
        baseUrl + "/" + idNivel + "/material/" + row.idMaterial,
        JSON.stringify({}),
        header
      )
      .then((response) => {
        getAllMaterialesDeNivel();
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };

  const QuitarRecomendacion = async (row) => {
    console.log("Quitamos REcomendacion");

    await axios
      .delete(
        baseUrl + "/" + idNivel + "/material/" + row.idMaterial,
        JSON.stringify({}),
        header
      )
      .then((response) => {
        getAllMaterialesDeNivel();
      })
      .catch((error) => {
        enqueueSnackbar(error + "", { variant: "error" });
      });
  };
  useEffect(() => {
    getById();
    getAllMaterialesDeNivel();

    //console.log(seleccionarConsola(2));
  }, [getById, getAllMaterialesDeNivel]);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h1 className={classes.cardTitleWhite}>Editar Nivel</h1>
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
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="limiteEdad"
                      label="Edad maxima"
                      name="limiteEdad"
                      type="number"
                      value={data.limiteEdad}
                      InputProps={{ inputProps: { min: 10, max: 20 } }}
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
                      id="limitePorGrupo"
                      label="Integrantes por grupo"
                      name="limitePorGrupo"
                      type="number"
                      value={data.limitePorGrupo}
                      InputProps={{ inputProps: { min: 1, max: 5 } }}
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
                  <Link to={`/niveles`} style={{ textDecoration: "none" }}>
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
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h1 className={classes.cardTitleWhite}>Material de apoyo</h1>
              <p className={classes.cardCategoryWhite}>
                Selecciona los que serian utiles para este nivel
              </p>
            </CardHeader>
            <CardBody>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: 10 }}>Nro</TableCell>
                      <TableCell align="left">Titulo</TableCell>
                      <TableCell align="center">Tipo</TableCell>
                      <TableCell align="left">Enlace</TableCell>
                      <TableCell align="center">Estado</TableCell>
                      <TableCell align="center" style={{ width: 200 }}>
                        Acciones
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resultado2.map((row, index) => (
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
                        <TableCell align="left">
                          <strong>{row.titulo}</strong> <br /> {row.subTitulo}
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
                            {tiposDeMaterial.map((r, index) =>
                              row.tipo === r.abr ? r.nombre : ""
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          <a href={row.archivo} rel="noopener noreferrer">
                            {row.archivo}
                          </a>
                        </TableCell>
                        <TableCell align="center" style={{ width: 100 }}>
                          {row.esta ? (
                            <>
                              <Box
                                sx={{
                                  bgcolor: "success.main",
                                  color: "success.contrastText",
                                  p: 0,
                                  borderRadius: "30px",
                                }}
                              >
                                Recomendado
                              </Box>
                            </>
                          ) : (
                            <>No Recomendado</>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {row.esta ? (
                            <>
                              <IconButton
                                color="error"
                                aria-label="upload picture"
                                component="span"
                                onClick={() => QuitarRecomendacion(row)}
                              >
                                <BookmarkRemoveIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton
                                color="success"
                                aria-label="upload picture"
                                component="span"
                                onClick={() => AgregarRecomendacion(row)}
                              >
                                <BookmarkAddedIcon />
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
});
