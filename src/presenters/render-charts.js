import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {getIcon, getTime} from '../utils.js';
import {ICONS_ARRAY, TRANSPORT} from '../constants';
import getChartsTemplate from '../templates/charts-template';

const BAR_HEIGHT = 55;
const stats = document.querySelector(`#stats`);

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
      },
      maintainAspectRatio: false,
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
      },
      maintainAspectRatio: false,
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
      labels: labels.map((label) => `${getIcon(ICONS_ARRAY, label)} ${label.toUpperCase()}`),
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
      },
      maintainAspectRatio: false,
    }
  });
};

export default (data) => {
  const transportNames = TRANSPORT.map((transportName) => transportName.name);
  const filteredTransportData = data.filter((it) => transportNames.includes(it.title));

  const reduceArr = (reducedData) => reducedData.reduce((result, it) => {
    if (!result[it.title]) {
      result[it.title] = it.title;
      result[it.title] = 0;
    }
    result[it.title] += Number(it.price);
    return result;
  }, {});

  const reduceTimeArr = (reducedData) => reducedData.reduce((result, it) => {
    if (!result[it.title]) {
      result[it.title] = it.title;
      result[it.title] = 0;
    }
    result[it.title] += Number(getTime({dateFrom: it.dateFrom, dateTo: it.dateTo}).durationHs);
    return result;
  }, {});

  stats.textContent = ``;
  stats.insertAdjacentHTML(`beforeend`, getChartsTemplate());

  renderMoneyChart(reduceArr(data));
  renderTransportChart(reduceArr(filteredTransportData));
  renderTimeChart(reduceTimeArr(data));
};
