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
//import Inscripcion from "views_user/Inscripcion/Inscripcion.js";
import ListaNiveles from "views/Nivel/ListaNiveles";
import Nivel from "views/Nivel/ViewNivel";
import ListaEtapas from "views/Etapa/ListaEtapas";
import Etapa from "views/Etapa/ViewEtapa.js";
import Noticia from "views/Noticias/ViewNoticia";
import Notas from "views/Nota/Notas.js";
import QuienesSomos from "views/QuienesSomos/QuienesSomos.js";
import UserProfile from "views/Usuario/PerfilUsuario";
import Tareas from "views_user/Coordinador/Tareas.js";

//iconos
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import InterestsIcon from "@mui/icons-material/Interests";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

// core components/views for RTL layout
// core components/views for RTL layout
//holaaa
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: Dashboard,
    component: DashboardPage,
    layout: "",
    visible: true,
  },

  {
    path: "/perfil",
    name: "Perfil",
    icon: Person,
    component: UserProfile,
    layout: "",
    visible: true,
  },
  {
    path: "/tareas",
    name: "Tareas",
    icon: PrecisionManufacturingIcon,
    component: Tareas,
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
    name: "Notas",
    icon: FormatListNumberedIcon,
    component: Notas,
    layout: "",
    visible: true,
  },

  {
    path: "/nivel/:idNivel",
    name: "Prueba de idNvel",
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

export default dashboardRoutes;
