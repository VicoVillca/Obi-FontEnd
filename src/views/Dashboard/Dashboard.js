import React from "react";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// core components
import Auspiciadores from "views/Dashboard/Auspiciadores";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Estadisticas from "views/Dashboard/Estadisticas";
import ListaNoticias from "views/Noticias/ListaNoticias";
import ViewOlimpiada from "views/Olimpiada/ViewOlimpiada";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0),
  color: theme.palette.text.secondary,
}));

export default function Admin() {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={9}>
          <Item>
            <Estadisticas />
          </Item>
          <ViewOlimpiada />
        </Grid>
        <Grid item xs={12} md={3}>
          <Item2>
            <Auspiciadores />
            <ListaNoticias />
          </Item2>
        </Grid>
      </Grid>
    </div>
  );
}
