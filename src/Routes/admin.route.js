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
import LibraryBooks from "@mui/icons-material/LibraryBooks";
import Notifications from "@mui/icons-material/Notifications";
import Unarchive from "@mui/icons-material/Unarchive";
import InterestsIcon from "@mui/icons-material/Interests";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import CastleIcon from "@mui/icons-material/Castle";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

// core components/views for Admin layout

import DashboardPage from "views/Dashboard/Dashboard.js";
import QuienesSomos from "views/QuienesSomos/QuienesSomos.js";
import CrudNoticias from "views/Noticias/CrudNoticias";
import CrudCoordinadores from "views/Coordinador/CrudCoordinadores";
import CrudNotas from "views/Nota/CrudAdminNotas";
import CrudAdminNota from "views/Nota/CrudAdminNotas";
import GrudEtapas from "views/Etapa/GrudEtapas";
import EditEtapa from "views/Etapa/EditEtapa";
import ViewEtapa from "views/Etapa/ViewEtapa";
import CrudNiveles from "views/Nivel/CrudNiveles";
import ConfigOlimpiada from "views/Olimpiada/ConfigOlimpiada";
import AddNivel from "views/Nivel/AddNivel";
import EditNivel from "views/Nivel/EditNivel";
import ViewNivel from "views/Nivel/ViewNivel";

import ViewNoticia from "views/Noticias/ViewNoticia";
import AddNoticia from "views/Noticias/AddNoticia";
import EditNoticia from "views/Noticias/EditNoticia";

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
    path: "/Olimpiada",
    name: "Olimpiada",
    icon: CastleIcon,
    component: ConfigOlimpiada,
    layout: "",
    visible: true,
  },
  {
    path: "/niveles",
    name: "Niveles",
    icon: InterestsIcon,
    component: CrudNiveles,
    layout: "",
    visible: true,
  },
  {
    path: "/nivel/:idNivel",
    name: "Prueba de idNvel",
    icon: Person,
    component: ViewNivel,
    layout: "",
    visible: false,
  },
  {
    path: "/AddNivel",
    name: "Niveles",
    icon: InterestsIcon,
    component: AddNivel,
    layout: "",
    visible: false,
  },
  {
    path: "/EditNivel/:idNivel",
    name: "Niveles",
    icon: InterestsIcon,
    component: EditNivel,
    layout: "",
    visible: false,
  },
  {
    path: "/etapas",
    name: "Etapas",
    icon: LinearScaleIcon,
    component: GrudEtapas,
    layout: "",
    visible: true,
  },
  {
    path: "/etapa/:idEtapa",
    name: "User Profile",
    icon: Person,
    component: ViewEtapa,
    layout: "",
    visible: false,
  },
  {
    path: "/editEtapa/:idEtapa",
    name: "User Profile",
    icon: Person,
    component: EditEtapa,
    layout: "",
    visible: false,
  },
  {
    path: "/notas",
    name: "Notas",
    icon: LibraryBooks,
    component: CrudNotas,
    layout: "",
    visible: true,
  },
  {
    path: "/nota/:idEtapa/:idNivel",
    name: "User Profile",
    icon: Person,
    component: CrudAdminNota,
    layout: "",
  },
  {
    path: "/Coordinadores",
    name: "Coordinadores",
    icon: PrecisionManufacturingIcon,
    component: CrudCoordinadores,
    layout: "",
    visible: true,
  },

  {
    path: "/noticias",
    name: "Noticias",
    icon: Notifications,
    component: CrudNoticias,
    layout: "",
    visible: true,
  },
  {
    path: "/noticia/:idNoticia",
    name: "User Profile",
    icon: Person,
    component: ViewNoticia,
    layout: "",
  },
  {
    path: "/AddNoticia",
    name: "Niveles",
    icon: InterestsIcon,
    component: AddNoticia,
    layout: "",
    visible: false,
  },
  {
    path: "/EditNoticia/:idNoticia",
    name: "Niveles",
    icon: InterestsIcon,
    component: EditNoticia,
    layout: "",
    visible: false,
  },
  {
    path: "/upgrade-to-pro",
    name: "¿Quienes somos?",
    icon: Unarchive,
    component: QuienesSomos,
    layout: "",
    visible: true,
  },
];

export default dashboardRoutes;
