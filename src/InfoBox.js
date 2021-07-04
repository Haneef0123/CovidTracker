import React from 'react'
import {Card,CardContent,Typography} from "@material-ui/core"
import "./infoBox.css";

function Infobox({title,active,isRed,cases,total,...props}) {
    return (
        <Card className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`} onClick={props.onClick}>
            <CardContent>
                <Typography className="infoBox_title" color="textSecondary" >{title}</Typography>
                <h2 className="infoBox_cases" >{cases}</h2>
                {/* <Typography className="infoBox_toal" >{total} Total</Typography> */}

            </CardContent>
        </Card>
     )
}

export default Infobox
