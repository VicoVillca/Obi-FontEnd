import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import StadiumIcon from "@mui/icons-material/Stadium";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//icons
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

//notifications
import { useSnackbar } from "notistack";
//utiles para el webservise
import axios from "axios";
import HOST from "variables/general.js";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const baseUrl = HOST.URL_BACK_END + "olimpiada";
const header = HOST.headerPublic();

export default function CustomizedTimeline() {
  const { enqueueSnackbar } = useSnackbar();
  const [resultado, setResultado] = useState([]);
  //---    getAll    --//
  const getAll = useCallback(async () => {
    await axios
      .get(
        baseUrl + "/" + cookies.get("olimpiada") + "/etapas",
        JSON.stringify({}),
        header
      )
      .then((response) => {
        setResultado(response?.data);
      })
      .catch((error) => {
        //alert(error+"");
        setResultado([]);
        enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [setResultado, enqueueSnackbar]);
  useEffect(() => {
    /// state
    getAll();
  }, [getAll]);
  return (
    <>
      <center>
        <h1 className="section-heading">Inicio</h1>
      </center>
      <Timeline position="right">
        {resultado.map((step, index) => (
          <TimelineItem key={step.idEtapa}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              variant="body2"
              color="text.secondary"
            >
              <Typography variant="h6" component="span">
                {step.nombre}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <StadiumIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography>
                {step.descripcion.length < 100
                  ? step.descripcion
                  : step.descripcion.substring(0, 100) + "..."}
              </Typography>
              <Link
                className="ui button primary"
                to={`/editEtapa/${step.idEtapa}`}
                style={{ textDecoration: "none" }}
              >
                <Button color="primary" variant="outlined">
                  <EditIcon />
                  Edit
                </Button>
              </Link>
              <Link
                className="ui button primary"
                to={`/etapa/${step.idEtapa}`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined" color="primary">
                  <RemoveRedEyeIcon />
                  View
                </Button>
              </Link>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <center>
        <h1 className="section-heading">Final</h1>
      </center>
    </>
  );
}
/**

 */
