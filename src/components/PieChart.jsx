import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { mockData } from '../data/mockData';

const PieChart = () => {
  const [sortBy, setSortBy] = useState('revenue');
  const [topBrandsData, setTopBrandsData] = useState([]);

  useEffect(() => {
    generateTopBrandsData();
  }, [sortBy]);

  useEffect(() => {
    const canvas = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');
    let chartInstance = null;

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: topBrandsData.map(brand => brand.label),
        datasets: [{
          data: topBrandsData.map(brand => brand.value),
          backgroundColor: topBrandsData.map(brand => brand.backgroundColor)
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 1
      }
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [topBrandsData]);

  const generateTopBrandsData = () => {
    const sortedBrands = mockData.brandData.slice().sort((a, b) => {
      if (sortBy === 'revenue') {
        return getTotalRevenue(b) - getTotalRevenue(a);
      } else {
        return getTotalTieUpCount(b) - getTotalTieUpCount(a);
      }
    });

    const topBrands = sortedBrands.slice(0, 4);

    const topBrandsData = topBrands.map(brand => ({
      label: brand.brandName,
      value: sortBy === 'revenue' ? getTotalRevenue(brand) : getTotalTieUpCount(brand),
      backgroundColor: getRandomColor()
    }));

    setTopBrandsData(topBrandsData);
  };

  const getTotalRevenue = (brand) => {
    return Object.values(brand.revenue).reduce((acc, curr) => acc + curr, 0);
  };

  const getTotalTieUpCount = (brand) => {
    return Object.values(brand.tieUpCount).reduce((acc, curr) => acc + curr, 0);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      <h3 className='mb-5'>Top 4 brands as per {sortBy === 'revenue' ? 'Revenue' : 'Tie Up' }</h3>
      <select value={sortBy} onChange={handleSortByChange}>
        <option value="revenue">Revenue</option>
        <option value="tieUpCount">Tie-Up Count</option>
      </select>
      <canvas id="pieChart" width="200" height="200"></canvas>
    </div>
  );
};

export default PieChart;
