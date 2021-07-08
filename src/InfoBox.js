import React from 'react'
import {Card,CardContent,Typography} from "@material-ui/core"
import "./infoBox.css";

function Infobox({title,active,isRed,cases,total,...props}) {
    console.log(props.darkTheme);
    return (
        <Card className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} ${props.darkTheme && "infoBox--darkTheme"}`} onClick={props.onClick}>
            
            <CardContent>
                <Typography className={`${props.darkTheme?"infoBox_title--dark": ""}`} >{title}</Typography>
                <h2 className={`infoBox_cases ${props.darkTheme && "infoBox--darkCases"}`} >{cases}</h2>
                {/* <Typography className="infoBox_total" >{total} Total</Typography> */}

            </CardContent>
        </Card>
     )
}

export default Infobox
