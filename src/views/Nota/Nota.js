import React, { useEffect, useState, useCallback } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
/// elements for select
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//icons
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
//importamos departamentos
import { departamentos } from "variables/general.js";
//const poema = [{"title":"dddddddddddddddd","content":"ssssssssssssssssssssssssssssssss","url":"https:\/\/www.poemist.com\/tammy-darby\/the-house-of-grief","poet":{"name":"Tammy Darby","url":"https:\/\/www.poemist.com\/tammy-darby","photo_avatar_url":"https:\/\/www.poemist.com\/images\/poet-pen.png"}},{"title":"Niels","content":"Til Dig, min Dreng, ej nogen Krans,\n   Som Kirkegaardens Graver\n   Officielt nedl\u00e6gger, hvor\n   Spadserende forbi Dig gaar\n   I D\u00f8dens Blomsterhaver!\n\nDu er ej d\u00f8d! Vi d\u00f8r ej, Ven,\n   Fra Moder og fra Fader,\n   Om og forl\u00e6ngst vi flygted bort\n   Fra denne Samfunds-Livets-Tort\n   Paa Torve og paa Gader.\n\nDu var for fin, for klog, for god\n   Til at ta'e Part i Farcen,\n   Som den nu spilles her og d\u00e9r\n   Hvor Ulve gaar i Faarekl\u00e6'er\n   Og Helten er Komparsen.\n\nDen grimme D\u00f8d \u2014 den kan slaa til\n   Med sine B\u00f8lle-N\u00e6ver:\n   Den vrister fra os ej et Skrig,\n   Om og vi ser det hvide Lig,\n   Mens Hjertet i os b\u00e6ver.\n\nMed oprejst Hoved vil vi staa\n   Og se, hvad Pr\u00e6sten siger,\n   Og h\u00f8re disse tomme Ord,\n   Som Dag paa Dag \u00e9nstonigt fo'r\n   Bort over D\u00f8dens Riger.\n\nHan v\u00e9d ej Tr\u00f8st, den fromme Mand:\n   Var han end nok saa \u00e6rlig\n   Og \u00f8ved nidk\u00e6r sin M\u00e9tier,\n   Vi kan dog kun forbi ham se\n   Og finde ham besv\u00e6rlig.\n\nMen kunde, vilde han en Dag\n   Ta'e Bladet frit fra Munden:\n   Saa skreg han al vor Pinsel ud\n   Og bragte Himlen den som Bud\n   Om hvad vi er i Grunden.\n\nOm hvordan vi med Stolthed staar\n   Bel\u00e6sset tungt af L\u00e6nker,\n   Om hvor vi frygtl\u00f8s gaar i Strid,\n   Og hvor vi ler, trods Tr\u00e6lleslid,\n   Og om hvor frit vi t\u00e6nker!\n\nDet t\u00f8r han ej, det vil han ej -\n   Nuvel, saa lad ham fare;\n   Gud har ej m\u00e9nt med ham ret stort,\n   Har derfor kun til Pr\u00e6st ham gjort,\n   Til Jagthund ej \u2014 til Hare!\n\nMen Du, min Dreng, som elsked alt,\n   Hvad der var Liv paa Jorden:\n   Alt hvad der fl\u00f8j og sprang og l\u00f8b,\n   Selv det, som bugted sig og kr\u00f8b -\n   Du bedste Dreng i Norden!\n\nDu tapre Gut \u2014 med Hjertet stort\n   Og Sj\u00e6len endnu st\u00f8rre:\n   Du har dog \u00e9ngang narret os,\n   Da Du Dig selv, vort Savn til Trods,\n   Fik anbragt paa det T\u00f8rre!\n\nDybt saa' Du ned i Livets Str\u00f8m\n   Med yngling-rene \u00d8jne;\n   Det Mudder, som vi vader i,\n   Det g\u00f8s Du for \u2014 Du vilde fri\n   Dit Liv fra disse L\u00f8gne.\n\nFra denne 'Samfundslivets' Sump,\n   Fra disse skidne Vande,\n   Den Malstr\u00f8m, sort af Hykleri,\n   Af Vold og Kneb \u2014 Du vilde fri\n   Dig bort til lyse Strande.\n\nAk, Niels, Du er da i Behold,\n   Vi vil ej paa Dig sk\u00e6nde;\n   Men naar vi er paa Nippet selv\n   Til Kv\u00e6lning i vor Mudder-Elv:\n   Da skal et Pust vi kende!\n\nEn Yngling-Aandes rene Pust\n   Paa vore Kinder bl\u00e6ser;\n   Vi ser et Smil, et Fredens Smil,\n   Hvori den dybe Pauses Hvil\n   Kamp-m\u00f8dige vi l\u00e6ser.\n\nOg mer end det: vi ser en Flig\n   Af Fjernheds Forh\u00e6ng glide\n   Med Billeder af Sl\u00e6gt paa Sl\u00e6gt,\n   Der k\u00e6mper uden L\u00e6nkers V\u00e6gt -\n   Tyst for vort Blik til Side.\n\nDa griber atter vi vort Spyd,\n   Vort Skjold, vor Skovl, vor Spade,\n   Og f\u00f8lger kamp-beredt vort Kald\n   At rydde denne Augias' Stald,\n   F\u00f8r vi vort Liv maa lade! -\n\nO Niels, vor Dreng, Du er ej d\u00f8d -\n   Din Sk\u00e6lm, se hvor Du smiler!\n   Med Blomster i din spinkle Haand\n   Jeg ser Dig, ser Dig i min Aand,\n   Mens for en Stund jeg hviler.\n\nDu r\u00e6kker Blomster ud mod os -\n   Men ingen S\u00f8rgekranse:\n   Duft-s\u00f8de Blomstersj\u00e6le smaa;\n   Nu kan vi til vort Arbejd gaa \u2014 ...\n   Hej! Skjold og Skovl og Lanse!","url":"https:\/\/www.poemist.com\/holger-drachmann\/niels","poet":{"name":"Holger Drachmann","url":"https:\/\/www.poemist.com\/holger-drachmann","photo_avatar_url":"https:\/\/www.poemist.com\/images\/poet-pen.png"}},{"title":"Love And War","content":"I.\n\nHow soft is the moon on Glengariff,\nThe rocks seem to melt with the light:\nOh! would I were there with dear Fanny,\nTo tell her that love is as bright;\nAnd nobly the sun of July\nO'er the waters of Adragoole shines--\nOh! would that I saw the green banner\nBlaze there over conquering lines.\nII.\n\nOh! love is more fair than the moonlight,\nAnd glory more grand than the sun:\nAnd there is no rest for a brave heart,\nTill its bride and its laurels are won;\nBut next to the burst of our banner,\nAnd the smile of dear Fanny, I crave\nThe moon on the rocks of Glengariff--\nThe sun upon Adragoole's wave.","url":"https:\/\/www.poemist.com\/thomas-osborne-davis\/love-and-war","poet":{"name":"Thomas Osborne Davis","url":"https:\/\/www.poemist.com\/thomas-osborne-davis","photo_avatar_url":"https:\/\/www.poemist.com\/images\/poet-pen.png"}},{"title":"Blind","content":"All of a sudden she could see\nAfter an intricate operation performed in a hurry\nMore in line with committing criminal poetry\nA long time she had listened to dozens of books\nHer empty eyes\nStaring upwards\nBut\nWhen she danced with Lama\nOn the hillside,\nHe told her that the soul can transcend earthly life\nIf freed from the retina.\nShe was illiterate\nThe pain on her face\nWhile in trance\nSpoilt the text\nThe pen bent\nBefore completing the story.\nNo way of return, now\nKnowledge is coming\nAnd ignorance is\nA lost paradise\nTherefore,\nThe thought of a drained memory\nStayed with her\nWhenever her eye tried to see.\nSilently\nShe poured out two shadows standing\nIn a breathless, dark hall,\nPrepared for tea,\nAt the end of the show.\nTwo shadows,\nOne a lighting technician\nAnd the other\nDid his utmost to read\nBut\nUtterly stunned\nCould not complete the lesson.\nReading does not require eyes\nSo much was certain\nWhen she suddenly regained sight\nBut did not find books.","url":"https:\/\/www.poemist.com\/fatima-naoot\/blind","poet":{"name":"Fatima Naoot","url":"https:\/\/www.poemist.com\/fatima-naoot","photo_avatar_url":"https:\/\/www.poemist.com\/images\/poet-pen.png"}},{"title":"The Lost Garden","content":"Roses, brier on brier,\nLike a hedge of fire,\nWalled it from the world and rolled\nCrimson 'round it; manifold\nBlossoms, 'mid which once of old\nWalked my Heart's Desire.\n\nThere the golden Hours\nDwelt; and 'mid the bowers\nBeauty wandered like a maid;\nAnd the Dreams that never fade\nSat within its haunted shade\nGazing at the flowers.\n\nThere the winds that vary\nMelody and marry\nPerfume unto perfume, went,\nWhispering to the buds, that bent,\nMessages whose wonderment\nMade them sweet to carry.\n\nThere the waters hoary\nMurmured many a story\nTo the leaves that leaned above,\nListening to their tales of love,\nWhile the happiness thereof\nFlushed their green with glory.\n\nThere the sunset's shimmer\n'Mid the bowers, dimmer\nThan the woods where Fable dwells,\nAnd Romance her legends tells,\nWrought dim dreams and dimmer spells,\nFilled with golden glimmer.\n\nThere at night the wonder\nOf the moon would sunder\nFoliage deeps with breast of pearl,\nWandering like a glimmering girl,\nFair of form and bright of curl,\nThrough the trees and under.\n\nThere the stars would follow,\nOver hill and hollow,\nSpirit shapes that danced the dew\nFrom frail cups of sparry hue;\nFirefly forms that fleeter flew\nThan the fleetest swallow.\n\nThere my heart made merry;\nThere, 'mid bloom and berry,\nDreamed the dreams that are no more,\nIn that garden lost of yore,\nSet in seas, without a shore,\nThat no man may ferry.\n\nWhere perhaps her lyre,\nWreathed with serest brier,\nSorrow strikes now; sad its gold\nSighing where, 'mid roses old,\nFair of face and dead and cold\nLies my Heart's Desire.","url":"https:\/\/www.poemist.com\/madison-julius-cawein\/the-lost-garden","poet":{"name":"Madison Julius Cawein","url":"https:\/\/www.poemist.com\/madison-julius-cawein","photo_avatar_url":"https:\/\/www.poemist.com\/images\/poet-pen.png"}}];
//stak fo notification
import axios from "axios";
import HOST from "variables/general.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const baseUrl = HOST.URL_BACK_END + "equipo";

const colores = ["#ffea00", "#c5cae9", "#b25431"];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
export default function Nota(props) {
  const [ciudad, setCiudad] = useState("Todos");
  const [resultado2, setResultado2] = useState([]);
  const [resultado, setResultado] = useState([]);
  const handleChange = (event) => {
    setCiudad(event.target.value);
    if (event.target.value === "Todos") setResultado2(resultado);
    else {
      var city = event.target.value;

      var val = resultado.filter((r) =>
        r.equipo.colegio.distrito.departamento.includes(city)
      );

      setResultado2(val);
    }
  };

  const getNotas = useCallback(async () => {
    await axios
      .get(
        baseUrl + "/habilitados/" + props.idNivel + "/" + props.idEtapa,

        {
          headers: {
            "Content-Type": "application/json",
            auth: cookies.get("token"),
          },
        },
        JSON.stringify({})
      )
      .then((response) => {
        setResultado(response?.data);
        setResultado2(response?.data);
      })
      .catch((error) => {
        //alert(error+"");
        //setEtapas([]);
        //enqueueSnackbar(error + "", { variant: "error" });
      });
  }, [props]);

  useEffect(() => {
    /// state
    getNotas();
  }, [props, getNotas]);
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography gutterBottom variant="h4" component="div">
            Notas de Area
          </Typography>
        </Grid>

        <Grid item>
          <Stack direction="row" spacing={1}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Departamento
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ciudad}
                  label="Departamento"
                  onChange={handleChange}
                  defaultValue={0}
                >
                  <MenuItem value={"Todos"}>Todos</MenuItem>
                  {departamentos.map((row, index) => (
                    <MenuItem key={index} value={row.abr}>
                      {row.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: 10 }}>Nro</StyledTableCell>
              <StyledTableCell align="center" style={{ width: 10 }}>
                Puntos
              </StyledTableCell>
              <StyledTableCell align="center">Equipo</StyledTableCell>
              <StyledTableCell align="center">Estado</StyledTableCell>
              <StyledTableCell align="center">Distrito</StyledTableCell>
              <StyledTableCell align="center">Departamento</StyledTableCell>
              <StyledTableCell align="center">U.Educativa</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultado2.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="center"
                  style={{ width: 10 }}
                  component="th"
                  scope="row"
                >
                  {index < colores.length && row.estado === "Aprobado" ? (
                    <EmojiEventsTwoToneIcon sx={{ color: colores[index] }} />
                  ) : (
                    <>{index + 1}</>
                  )}
                </TableCell>
                <TableCell style={{ width: 10 }} align="right">
                  {row.puntos}
                </TableCell>
                <TableCell align="center">{row.equipo.nombre}</TableCell>
                <TableCell align="center">
                  {row.estado === "Aprobado" ? (
                    <Box
                      sx={{
                        bgcolor: "success.main",
                        color: "success.contrastText",
                        p: 0,
                        borderRadius: "30px",
                      }}
                    >
                      {row.estado}
                    </Box>
                  ) : (
                    <>{row.estado}</>
                  )}
                </TableCell>
                <TableCell align="center">
                  {row.equipo.colegio.distrito.nombre}
                </TableCell>
                <TableCell align="center">
                  {row.equipo.colegio.distrito.departamento}
                </TableCell>
                <TableCell align="center">
                  {row.equipo.colegio.nombre}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
