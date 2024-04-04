import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { mockData } from '../data/mockData';

const PieChart = () => {
  const [sortBy, setSortBy] = useState('revenue');
  const [topBrandsData, setTopBrandsData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    generateTopBrandsData();
  }, [sortBy]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    createPieChart();
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

  const createPieChart = () => {
    const ctx = document.getElementById('pieChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: topBrandsData.map(brand => brand.label),
        datasets: [{
          data: topBrandsData.map(brand => brand.value),
          backgroundColor: topBrandsData.map(brand => brand.backgroundColor)
        }]
      },
      options: {
        responsive: true
      }
    });
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      <select value={sortBy} onChange={handleSortByChange}>
        <option value="revenue">Revenue</option>
        <option value="tieUpCount">Tie-Up Count</option>
      </select>
      <canvas id="pieChart" width="400" height="400"></canvas>
    </div>
  );
};

export default PieChart;
