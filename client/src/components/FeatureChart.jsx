import React from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const properties = [
  'acousticness',
  'danceability',
  'energy',
  'instrumentalness',
  'liveness',
  'speechiness',
  'valence',
];

const FeatureChart = props => {
  const { features } = props; 
  const { type } = props;
  const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

  const createDataset = features => {
    const dataset = {};
    properties.forEach(props => {
      dataset[props] = features.length
        ? avg(features.map(feat => feat && feat[props]))
        : features[props];
    });
    return dataset;
  };

  const options = {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Audio Features',
        font: {
          size: 18,
          family: 'sans-serif',
        },
        family: 'sans-serif',
        color: '#ffffff',
        padding: 30,
      },
    },
    responsive: true,
    indexAxis: type || '',
    scales: {
      x: 
        {
          grid: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
          ticks: {
            font: {
              size: 12,
              family: 'sans-serif',
            },
          },
        },
      y:
        {
          grid: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
          ticks: {
            beginAtZero: true,
            font: {
              size: 12,
              family: 'sans-serif',
            },
          },
        },
    },
  }

  const data = {
    datasets: [{
      label : '',
      data: Object.values(createDataset(features)),
      backgroundColor: [
        'rgba(255, 99, 132, 0.3)',
        'rgba(255, 159, 64, 0.3)',
        'rgba(255, 206, 86, 0.3)',
        'rgba(75, 192, 192, 0.3)',
        'rgba(54, 162, 235, 0.3)',
        'rgba(104, 132, 245, 0.3)',
        'rgba(153, 102, 255, 0.3)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(104, 132, 245, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    }],
    labels: Object.keys(createDataset(features)) ,
  };
  
  return (
    <div className='relative w-[100%] max-w-[700px]'>
      <Bar data={data} options={options} height={400} width={400} />
    </div>
  );
};

export default FeatureChart;