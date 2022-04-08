import React from "react";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import makeStyles from '@mui/styles/makeStyles';
// core components
//auspiciadores
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
//logos
import avatar from "assets/img/icpc_logo.jpg"; //../assets/img/faces/marc.jpg";
import avatar1 from "assets/img/OBI_small.jpg";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import CardContent from '@mui/material/CardContent';
const useStyles = makeStyles(styles);

export default function Auspiciadores() {
    // styles
    const classes = useStyles();
    return (
        < >
            <Card >
                <CardHeader color = "primary" >
                    <h4 className = {
                        classes.cardTitleWhite
                    } > 
                        AUSPICIADORES
                    </h4> 
                </CardHeader> 
                <CardContent>
                    <center > 
                        < img src = {
                            avatar
                        }
                        alt = "logo1" / > 
                    </center> 
                    <center > 
                        < img src = {
                            avatar1
                        }
                        alt = "logo1" / > 
                    </center> 
                </CardContent>
            </Card> 
        </>
    );
}