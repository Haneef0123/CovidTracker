import React from 'react'
import numeral from 'numeral';
import "./Table.css";
function Table({countries,darkTheme}) {
    console.log(countries);
    return (
        <div  className={`${darkTheme?"table--dark":"table"}`}>
            {countries.map(country=>{
                return   <tr key={country.country}>
                        <td>{country.country} </td>
                        <td>{numeral(country.cases).format("0,0")}</td>
                    </tr>
                
            })}
        </div>
    )
}

export default React.memo(Table); 
