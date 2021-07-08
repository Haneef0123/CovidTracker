import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data[casesType]) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType,country,darkTheme}) {
 
  console.log("dark in graph",darkTheme);

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`https://disease.sh/v3/covid-19/historical/${country==="worldwide"?"all":country}?lastdays=120`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("data in linegraph",data);
          if(country==="worldwide"){
            let chartData = buildChartData(data, casesType);
            setData(chartData);
          }
          else{
            let chartData = buildChartData(data.timeline, casesType);
            setData(chartData);
          }
          
          // console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType,country]);

  return (
    <div style={{backgroundColor:`${darkTheme?"black":""}`}} >
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default React.memo(LineGraph) ;