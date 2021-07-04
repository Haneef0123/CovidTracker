import React from 'react'
import numeral from 'numeral';
import "./Table.css";
function Table({countries}) {
    console.log(countries);
    return (
        <div  className="table">
            {countries.map(country=>{
                return <div>
                    <tr>
                        <td>{country.country} </td>
                        <strong>{numeral(country.cases).format("0,0")}</strong>
                    </tr>
                </div>
            })}
        </div>
    )
}

export default Table
