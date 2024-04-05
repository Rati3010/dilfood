import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { mockData } from '../data/mockData';

const LineChart = () => {
  const [dataType, setDataType] = useState('tieUpCount');

  const brandNames = mockData.brandData.map((brand) => brand.brandName);
  const months = Object.keys(mockData.brandData[0][dataType]);

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
      data: Object.values(brand[dataType]),
      borderColor: getRandomColor(),
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
          text: dataType === 'revenue' ? 'Revenue' : 'Tie-Up Count',
        },
      },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const brandIndex = context.datasetIndex;
            const month = context.label;
            const tieUpCount = context.parsed.y;
            const brandName = mockData.brandData[brandIndex].brandName;
            return `${brandName}: ${tieUpCount}`;
          },
        },
      },
    },
  };

  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
  };

  return (
    <div style={{ height: '300px' }} className='mt-20 mb-20'>
      <h2>Monthly Growth by Brand</h2>
      <div>
        <label htmlFor="dataType">Data Type:</label>
        <select id="dataType" value={dataType} onChange={handleDataTypeChange}>
          <option value="tieUpCount">Tie-Up Count</option>
          <option value="revenue">Revenue</option>
        </select>
      </div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
