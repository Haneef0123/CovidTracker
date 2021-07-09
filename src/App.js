import React,{useState,useEffect, useCallback,lazy,Suspense} from "react"
import './App.css';
import {MenuItem,FormControl,Select,Card,CardContent} from "@material-ui/core";
import Infobox from "./InfoBox";
// import Map from "./Map";
// import Table from "./Table"; 
import { sortData } from "./util.js";
import LineGraph from "./LineGraph";

import { prettyPrintStat } from "./util.js";
const Table = lazy(() => import('./Table.js'));

function App() {
  const [countries,setCountires] = useState([]);
  const [country,setCountry]= useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] =  useState([]);
  const [darkTheme,setDarkTheme]= useState(false);
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

  const onCountryChange =useCallback( async (event)=>{
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
  },[])
  console.log("CountryInfo",countryInfo)


  const themeSelector = () =>{
    setDarkTheme((prevState)=>!prevState)
    console.log("clicked , darktheme",darkTheme);
  }

  return (
    <div className={`app ${darkTheme? "app-dark":""}`}>
      <div className="app_left" >
      <div className="app_header">
     
      <h1>Covid 19 tracker</h1>
      <div className="nav" >
      <label class="switch">
            <i class="fas fa-adjust"></i>
            <div>
              <input type="checkbox" onChange={themeSelector}/>
              <span class="slider round"></span>
            </div>
          </label>
        <FormControl className={`app_dropdown ${darkTheme? "app_dropdown-dark":""}`} >
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
      
      </div>
      <div className="app_stats">
        <Infobox darkTheme={darkTheme} isRed active={casesType==="cases"} onClick={e=>setCasesType("cases")} title="Covid Cases" cases={prettyPrintStat(countryInfo.cases)} total={prettyPrintStat(countryInfo.cases) }/>
        <Infobox darkTheme={darkTheme} active={casesType==="recovered"} onClick={e=>setCasesType("recovered")} title="Recovered" cases={prettyPrintStat(countryInfo.recovered)} total={prettyPrintStat(countryInfo.recovered)}/>
        <Infobox darkTheme={darkTheme} isRed active={casesType==="deaths"} onClick={e=>setCasesType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo.deaths)} total={prettyPrintStat(countryInfo.deaths)}/>
      </div>
      {/* <div>
        <Map 
        countries={mapCountries}
        center={mapCenter}
        zoom = {mapZoom }
        />
      </div> */}
      </div>
      <div className={`app_right ${darkTheme? "app_dark":""}`} >
        <Card>
            <CardContent className={`${darkTheme && "app_dark"}`} >
              <LineGraph darkTheme={darkTheme} casesType={casesType} country={country} />
              <h3>{`${country==="worldwide"?"worldwide":countryInfo.country}`} {casesType}</h3> 
              <h2 style={{fontSize:"1.2rem"}} >Live cases by country</h2>
              <Suspense fallback={<div>Loading..</div>} >
              <Table darkTheme={darkTheme} countries={tableData} />
              </Suspense>
              
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
