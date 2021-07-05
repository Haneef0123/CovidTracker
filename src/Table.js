import React from 'react'
import numeral from 'numeral';
import "./Table.css";
function Table({countries}) {
    console.log(countries);
    return (
        <div  className="table">
            {countries.map(country=>{
                return   <tr key={country.country}>
                        <td>{country.country} </td>
                        <td>{numeral(country.cases).format("0,0")}</td>
                    </tr>
                
            })}
        </div>
    )
}

export default Table
