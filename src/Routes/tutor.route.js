/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @mui/icons-material
import Dashboard from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Inscripcion from "views_user/Inscripcion/Inscripcion.js";
import Nivel from "views/Nivel/ViewNivel";
import Etapa from "views/Etapa/ViewEtapa.js";
import ListaNiveles from "views/Nivel/ListaNiveles";
import ListaEtapas from "views/Etapa/ListaEtapas";
import Noticia from "views/Noticias/ViewNoticia.js";
import Notas from "views/Nota/Notas.js";
import QuienesSomos from "views/QuienesSomos/QuienesSomos.js";
import Reporte from "views_user/Inscripcion/Reporte";

//List Icons

import LinearScaleIcon from "@mui/icons-material/LinearScale";
import InterestsIcon from "@mui/icons-material/Interests";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import GroupsIcon from "@mui/icons-material/Groups";
// core components/views for RTL layout
//holaaa
const tutorRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: Dashboard,
    component: DashboardPage,
    layout: "",
    visible: true,
  },

  {
    path: "/inscripcion",
    name: "Inscripciones",
    icon: AppRegistrationIcon,
    component: Inscripcion,
    layout: "",
    visible: true,
  },
  {
    path: "/equipos",
    name: "Equipos",
    icon: GroupsIcon,
    component: Reporte,
    layout: "",
    visible: true,
  },
  {
    path: "/niveles",
    name: "Niveles",
    icon: InterestsIcon,
    component: ListaNiveles,
    layout: "",
    visible: true,
  },
  {
    path: "/etapas",
    name: "Etapas",
    icon: LinearScaleIcon,
    component: ListaEtapas,
    layout: "",
    visible: true,
  },

  {
    path: "/notas",
    name: "Notas Generales",
    icon: FormatListNumberedIcon,
    component: Notas,
    layout: "",
    visible: true,
  },

  {
    path: "/nivel/:idNivel",
    name: "User Profile",
    icon: Person,
    component: Nivel,
    layout: "",
    visible: false,
  },
  {
    path: "/etapa/:idEtapa",
    name: "User Profile",
    icon: Person,
    component: Etapa,
    layout: "",
    visible: false,
  },
  {
    path: "/noticia/:idNoticia",
    name: "User Profile",
    icon: Person,
    component: Noticia,
    layout: "",
    visible: false,
  },
  {
    path: "/upgrade-to-pro",
    name: "Quienes Somos?",
    icon: Person,
    component: QuienesSomos,
    layout: "",
    visible: true,
  },
];

export default tutorRoutes;
