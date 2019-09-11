/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
function displayChart(fileName, titleText, yAxisText, seriesName) {
  fetch(`../output/${fileName}.json`)
      .then((response) => response.json())
      .then((data) => {
        chartForObjects(data, titleText, yAxisText, seriesName);
      });
}

function chartForObjects(data, titleText, yAxisText, seriesName) {
  Highcharts.chart('container', {
    chart: {
      type: 'column',
    },
    title: {
      text: titleText,
    },
    xAxis: {
      categories: Object.keys(data),
    },
    yAxis: {
      min: 0,
      title: {
        text: yAxisText,
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color:
            // theme
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            'gray',
        },
      },
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false,
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: 'Total: {point.stackTotal}',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: seriesName,
        data: Object.values(data),
      },
    ],
  });
}

function displayChartForNestedObject(
    fileName,
    titleText,
    yAxisText,
    seriesName
) {
  fetch('../output/' + fileName + '.json')
      .then((response) => response.json())
      .then((data) => {
        chartForNestedObjects(data, titleText, yAxisText, seriesName);
      });
}

function chartForNestedObjects(data, titleText, yAxisText) {
  const teamNames = Object.keys(data);
  const teamsResult = teamNames.reduce((yearlyResult, teamName) => {
    temp = {};
    temp['name'] = teamName;
    temp['data'] = Object.values(data[teamName]);
    yearlyResult.push(temp);
    return yearlyResult;
  }, []);
  const years = Object.keys(data[teamNames[0]]);

  Highcharts.chart('container', {
    chart: {
      type: 'bar',
    },
    title: {
      text: titleText,
    },
    xAxis: {
      categories: years,
    },
    yAxis: {
      min: 0,
      title: {
        text: yAxisText,
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: 'normal',
      },
    },
    series: teamsResult,
  });
}
