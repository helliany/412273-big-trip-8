import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {getIcon, getDurationHours} from '../utils.js';
import {ICONS_ARRAY, TRANSPORT} from '../constants';

const BAR_HEIGHT = 55;

const renderMoneyChart = (data) => {
  const labels = Object.keys(data);
  const prices = Object.values(data);

  const moneyCtx = document.querySelector(`.statistic__money`);
  moneyCtx.height = BAR_HEIGHT * labels.length;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: labels.map((label) => `${getIcon(ICONS_ARRAY, label)} ${label.toUpperCase()}`),
      datasets: [{
        data: prices,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (data) => {
  const labels = Object.keys(data);
  const prices = Object.values(data);

  const transportCtx = document.querySelector(`.statistic__transport`);
  transportCtx.height = BAR_HEIGHT * labels.length;

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: labels.map((label) => `${getIcon(TRANSPORT, label)} ${label.toUpperCase()}`),
      datasets: [{
        data: prices.map((price) => price / 10),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeChart = (data) => {
  const labels = Object.keys(data);
  const time = Object.values(data);

  const timeSpendCtx = document.querySelector(`.statistic__time-spend`);
  timeSpendCtx.height = BAR_HEIGHT * labels.length;

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: time,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

export default (data) => {
  const transportNames = TRANSPORT.map((transportName) => transportName.name);
  const filteredTransportData = data.filter((it) => transportNames.includes(it.title));

  const reduceArr = (reducedData) => reducedData.reduce((accumulator, it) => {
    accumulator[it.title] = it.title;
    accumulator[it.title] = +(it.price);
    return accumulator;
  }, {});

  const reduceTimeArr = (reducedData) => reducedData.reduce((accumulator, it) => {
    accumulator[it.destination] = it.destination;
    accumulator[it.destination] = +(getDurationHours(it.dateFrom, it.dateTo));
    return accumulator;
  }, {});

  renderMoneyChart(reduceArr(data));
  renderTransportChart(reduceArr(filteredTransportData));
  renderTimeChart(reduceTimeArr(data));
};
