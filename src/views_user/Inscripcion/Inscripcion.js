import React, { useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Instrucciones from "views_user/Inscripcion/Instrucciones";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import CrudGrupo from "views_user/Inscripcion/CrudGrupo";
import CrudIntegrante from "views_user/Inscripcion/CrudIntegrante";
import Reporte from "views_user/Inscripcion/Reporte";
import MuiAlert from "@mui/material/Alert";
import { useSnackbar } from "notistack";
//utiles para el webservise
import axios from "axios";
import HOST from "variables/general.js";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseUrl = HOST.URL_BACK_END + "olimpiada";
const header = HOST.headerPublic();

const steps = [
  "Crear grupos",
  "Agregar estudiantes a los grupos creados",
  "Reporte oficial",
];
const components = [
  <CrudGrupo />,
  <CrudIntegrante />,
  <Reporte />,
  <Reporte />,
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Inscripcion() {
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const fecha = new Date().valueOf();
  const [etapa, setEtapa] = React.useState({
    idEtapa: 2,
    nombre: "DISTRITAL",
    descripcion: "",
    fechaIni: "2000-02-02T04:00:00.000Z",
    fechaFin: "2025-03-02T04:00:00.000Z",
    tipo: "",
    habilitados: 1,
  });

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const GetDate = (time) => {
    return new Date(time);
  };

  //---    getAll    --//
  const getAll = useCallback(async () => {
    await axios
      .get(
        baseUrl + "/" + cookies.get("olimpiada") + "/etapas",
        JSON.stringify({}),
        header
      )
      .then((response) => {
        //setResultado(response?.data);
        const v = response?.data;
        for (let index = 0; index < v.length; index++) {
          const element = v[index];
          if (element.tipo === "INSCRIPCION") {
            setEtapa(element);
          }
        }
      })
      .catch((error) => {
        //alert(error+"");
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [setEtapa, enqueueSnackbar]);
  useEffect(() => {
    /// state
    getAll();
  }, [getAll]);

  return (
    <>
      {GetDate(fecha).valueOf() >= GetDate(etapa.fechaFin).valueOf() ? (
        <>
          <Alert severity="success">
            Ya finalizo el proceso de Inscripción!
          </Alert>
          <Reporte />
        </>
      ) : (
        <div>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4" component="div">
                Inscripción
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">
                <Instrucciones />
              </Typography>
            </Grid>
          </Grid>
          <Card sx={{ maxWidth: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption"></Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>
                      Volver a repetir los pasos
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      <KeyboardArrowLeft />
                      Anterior paso
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button
                      disabled={activeStep === steps.length - 1}
                      onClick={handleNext}
                    >
                      Siguiente PASO
                      <KeyboardArrowRight />
                    </Button>
                  </Box>
                </React.Fragment>
              )}

              <div sx={{ mr: 2, ml: 2 }}>
                {/*agregamos el componente weeee*/}
                {components[activeStep]}
              </div>
            </Box>
          </Card>
        </div>
      )}
    </>
  );
}
