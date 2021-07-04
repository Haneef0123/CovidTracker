import React,{useState,useEffect} from "react"
import './App.css';
import {MenuItem,FormControl,Select,Card,CardContent} from "@material-ui/core";
import Infobox from "./InfoBox";
// import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util.js";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import { prettyPrintStat } from "./util.js";

function App() {
  const [countries,setCountires] = useState([]);
  const [country,setCountry]= useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] =  useState([]);
  // const [mapCenter,setMapCenter]=useState({
  //   lat:34.80746, lng:-40.4796
  // })

// const [mapZoom,setMapZoom] = useState(2);
// const [mapCountries,setMapCountries] = useState([]);
const [casesType,setCasesType] = useState("cases")

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response =>response.json())
    .then(data=>setCountryInfo(data))
  },[])
  useEffect(()=>{
    const getCountriesData = async ()=>{
     const response = await fetch("https://disease.sh/v3/covid-19/countries")
      const data =await response.json();
      const sorteddata = sortData(data);
      const countries = sorteddata.map(country=>{
        return {
          name:country.country,
          value:country.countryInfo.iso2,
          id:country.countryInfo._id
        }
      })
      
      
      // console.log(countries);
      // setMapCountries(data);
      setCountires(countries);
      setTableData(sorteddata);

    }
    getCountriesData();
  },[])

  const onCountryChange =async (event)=>{
    const countryCode = event.target.value;
    console.log("country code",countryCode)
    setCountry(countryCode);



    const url = (countryCode === "worldwide") ? "https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const response = await fetch(url);
    const data = await response.json();
    setCountryInfo(data);
    // setMapCenter([data.countryInfo.lat,data
    // .countryInfo.lng]);
    // setMapZoom(4);
    // console.log(countryCode);
  }
  console.log("CountryInfo",countryInfo)

  return (
    <div className="app">
      <div className="app_left" >
      <div className="app_header">
      <h1>Covid 19 tracker</h1>
        <FormControl className="app_dropdown" >
          <Select 
          onChange={onCountryChange}
           variant="outlined" 
           value={country} >
          <MenuItem value="worldwide" >worldwide</MenuItem>
            {countries.map(country=>{
              return <MenuItem key={country.id} value={country.value} >{country.name}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
      <div className="app_stats">
        <Infobox isRed active={casesType==="cases"} onClick={e=>setCasesType("cases")} title="Corona Virus Cases" cases={prettyPrintStat(countryInfo.cases)} total={prettyPrintStat(countryInfo.cases) }/>
        <Infobox active={casesType==="recovered"} onClick={e=>setCasesType("recovered")} title="Recovered" cases={prettyPrintStat(countryInfo.recovered)} total={prettyPrintStat(countryInfo.recovered)}/>
        <Infobox isRed active={casesType==="deaths"} onClick={e=>setCasesType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo.deaths)} total={prettyPrintStat(countryInfo.deaths)}/>
      </div>
      {/* <div>
        <Map 
        countries={mapCountries}
        center={mapCenter}
        zoom = {mapZoom }
        />
      </div> */}
      </div>
      <div className="app_right" >
        <Card>
            <CardContent>
              <LineGraph casesType={casesType}/>
              <h3>{countryInfo.country} new {casesType}</h3> 
              <h2 style={{fontSize:"1.2rem"}} >Live cases by country</h2>
              <Table countries={tableData} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
