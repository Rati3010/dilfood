// LineChart.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import { mockData } from '../data/mockData';

const LineChart = () => {
  const brandNames = mockData.brandData.map((brand) => brand.brandName);
  const months = Object.keys(mockData.brandData[0].tieUpCount);
  
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const chartData = {
    labels: months,
    datasets: mockData.brandData.map((brand) => ({
      label: brand.brandName,
      data: Object.values(brand.tieUpCount),
      borderColor: getRandomColor(), // You can define a function to generate random colors
      fill: false,
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Tie-Up Count',
        },
      },
    },
  };

  return (
    <div>
      <h2>Monthly Growth by Brand</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
