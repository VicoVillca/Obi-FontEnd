import React, { useEffect, useState, useCallback } from "react";
// table
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import InterestsIcon from "@mui/icons-material/Interests";
//notifications
import { useSnackbar } from "notistack";
//utiles para el webservise
import axios from "axios";
import HOST from "variables/general.js";
import Cookies from "universal-cookie";
import CrudCoordinadoresPorArea from "views/Coordinador/CrudCoordinadoresPorArea";
import Grid from "@mui/material/Grid";
const cookies = new Cookies();

const baseUrl = HOST.URL_BACK_END + "olimpiada";
const header = HOST.headerPublic();
export default function Notas() {
  const [value, setValue] = React.useState("1");
  const [value2, setValue2] = React.useState("1");
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event, newValue) => {
    setEtapa(etapas[newValue - 1].idEtapa);
    setValue(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setNivel(niveles[newValue - 1].idNivel);
    setValue2(newValue);
  };

  const [niveles, setNiveles] = useState([]);
  const [nivel, setNivel] = useState("");
  const [etapa, setEtapa] = useState("");
  const [etapas, setEtapas] = useState([]);

  /*******************************************************
   *                     GRUDS
   * *****************************************************/

  const getEtapas = useCallback(async () => {
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
        setEtapa("");
        setEtapa(v[0].idEtapa);
        setEtapas(v);
      })
      .catch((error) => {
        //alert(error+"");

        setEtapas([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [setEtapas, enqueueSnackbar]);

  const getNiveles = useCallback(async () => {
    await axios
      .get(
        baseUrl + "/" + cookies.get("olimpiada") + "/niveles",
        JSON.stringify({}),
        header
      )
      .then((response) => {
        setNivel("");
        setNiveles(response?.data);
        setNivel(response?.data[0].idNivel);
      })
      .catch((error) => {
        //alert(error+"");
        setNiveles([]);
        enqueueSnackbar(error + "", { variant: "error" });
        //style={{backgroundColor: 'blue',}}
      });
  }, [setNiveles, enqueueSnackbar]);

  useEffect(() => {
    getEtapas();
    getNiveles();
  }, [getEtapas, getNiveles]);
  return (
    <Box sx={{ width: "100%", height: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          display="flex"
          justifyContent="center"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
            indicatorColor="primary"
            scrollButtons="auto"
            textColor="primary"
            variant="scrollable"
          >
            {etapas.map((step, index) => (
              <Tab
                label={<>{step.nombre}</>}
                key={index}
                value={"" + (index + 1)}
              />
            ))}
          </Tabs>
        </Box>
      </TabContext>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                height: 524,
              }}
            >
              <TabContext value={value2}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value2}
                  onChange={handleChange2}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: "divider" }}
                >
                  {niveles.map((step, index) => (
                    <Tab
                      label={
                        <>
                          <InterestsIcon />
                          {step.nombre}
                        </>
                      }
                      key={index}
                      value={"" + (index + 1)}
                    />
                  ))}
                </Tabs>
              </TabContext>
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box sx={{ flexGrow: 1, p: 2 }}>
              {nivel === "" || etapa === "" ? (
                "oh Nouu"
              ) : (
                <CrudCoordinadoresPorArea idNivel={nivel} idEtapa={etapa} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
