import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import {mockData} from '../data/mockData'

const BarChart = () => {
  const [selectedBrand, setSelectedBrand] = useState('Dil Punjabi');
  const [dataType, setDataType] = useState('revenue');

  useEffect(() => {
    let chartInstance = null;

    const createChart = () => {
      const ctx = document.getElementById('barChart').getContext('2d');

      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: getData(),
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    };

    const getData = () => {
      const brandData = mockData.brandData.find(brand => brand.brandName === selectedBrand);
      const data = brandData ? Object.values(brandData[dataType]) : [];
      const months = brandData ? Object.keys(brandData[dataType]) : [];
      return {
        labels: months,
        datasets: [{
          label: dataType === 'revenue' ? 'Revenue' : 'Tie-Up Count',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: data
        }]
      };
    };

    createChart();

    // Cleanup function to destroy chart instance
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [selectedBrand, dataType, mockData]);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
  };

  return (
    <div>
      <select value={selectedBrand} onChange={handleBrandChange}>
        <option value="">Select Brand</option>
        {mockData.brandData.map(brand => (
          <option key={brand.brandName} value={brand.brandName}>{brand.brandName}</option>
        ))}
      </select>
      <select value={dataType} onChange={handleDataTypeChange}>
        <option value="revenue">Revenue</option>
        <option value="tieUpCount">Tie-Up Count</option>
      </select>
      <canvas id="barChart" width="400" height="400"></canvas>
    </div>
  );
};

export default BarChart;
