import React, { useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
// import Component lista de Tareas
import ListaDeTareas from "views_user/Coordinador/ListaDeTareas";

//Alert components
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { useSnackbar } from "notistack";
//utiles para el webservise
import axios from "axios";
import HOST from "variables/general.js";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseUrl = HOST.URL_BACK_END + "olimpiada";
const header = HOST.headerPublic();

export default function LabTabs() {
  const [value, setValue] = React.useState("1");
  const [etapas, setEtapas] = React.useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { enqueueSnackbar } = useSnackbar();
  //---    getAll    --//
  const getAll = useCallback(async () => {
    await axios
      .get(
        baseUrl + "/" + cookies.get("olimpiada") + "/etapas",
        JSON.stringify({}),
        header
      )
      .then((response) => {
        const v = [];
        for (let i = 0; i < response?.data.length; i++) {
          const element = response?.data[i];
          if (element.tipo !== "INSCRIPCION") {
            v.push(element);
          }
        }
        setEtapas(v);
      })
      .catch((error) => {
        //alert(error+"");
        setEtapas([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [setEtapas, enqueueSnackbar]);
  useEffect(() => {
    /// state
    getAll();
  }, [getAll]);
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
          >
            {etapas.map((step, index) => (
              <Tab label={step.nombre} key={index} value={"" + (index + 1)} />
            ))}
          </Tabs>
        </Box>
        {etapas.map((step, index) => (
          <TabPanel key={index} value={"" + (index + 1)}>
            {step.tipo === "INSCRIPCION" ? (
              <Alert severity="info">
                <AlertTitle>No tienes tareas</AlertTitle>
                Asignadas en esta — <strong>Etapa!</strong>
              </Alert>
            ) : (
              <ListaDeTareas idEtapa={step.idEtapa} />
            )}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
