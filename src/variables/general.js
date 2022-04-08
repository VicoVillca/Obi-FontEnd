var bugs = [
  'Sign contract for "What are conference organizers afraid of?"',
  "Lines From Great Russian Literature? Or E-mails From My Boss?",
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  "Create 4 Invisible User Experiences you Never Knew About",
];
var website = [
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  'Sign contract for "What are conference organizers afraid of?"',
];
var server = [
  "Lines From Great Russian Literature? Or E-mails From My Boss?",
  "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
  'Sign contract for "What are conference organizers afraid of?"',
];
var departamentos = [
  { nombre: "Chuquisaca", abr: "CH" },
  { nombre: "La Paz", abr: "LP" },
  { nombre: "Cochabamba", abr: "CB" },
  { nombre: "Oruro", abr: "OR" },
  { nombre: "Potosí", abr: "PT" },
  { nombre: "Tarija", abr: "TJ" },
  { nombre: "Santa Cruz", abr: "SC" },
  { nombre: "Beni", abr: "BE" },
  { nombre: "Pando", abr: "PD" },
];
var tiposDeMaterial = [
  { nombre: "Pdf", abr: "pdf" },
  { nombre: "Video", abr: "vdo" },
  { nombre: "Url", abr: "url" },
  { nombre: "Juez Virtual", abr: "jzv" },
  { nombre: "Libro", abr: "lbr" },
  { nombre: "Otro", abr: "otr" },
];
var dependencias = [
  { nombre: "Fiscal", abr: "fiscal" },
  { nombre: "Privado", abr: "Privado" },
];
var roles = [
  { nombre: "Tutor", abr: "TUTOR" },
  { nombre: "Coordinador", abr: "COORDINADOR" },
];

var URL_BACK_END = process.env.REACT_APP_URL_BACK_END;
module.exports = {
  URL_BACK_END,
  bugs,
  website,
  server,
  departamentos,
  tiposDeMaterial,
  dependencias,
  roles,
  header,
  headerPublic,
};
function header($token) {
  return {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      auth: $token,
    },
  };
}
function headerPublic() {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      origin: "x-requested-with",
      "Access-Control-Allow-Headers":
        "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
      "Content-Type": "application/json",
    },
  };
}
