import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { loadBalances } from '../datasets/loadBalances';
import { loadIncome } from '../datasets/loadIncome';
import { loadSymbols } from '../datasets/loadData';
// Register Chart.js components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinancialChart = ({ symbol }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [companyInfo, setCompanyInfo] = useState({ name: '', ipoDate: '' });

  useEffect(() => {
    //Code Snippet for API Key - Update API Before Execution

    //const apiKey = 'GT3947HMN7K7W50S';

    const fetchData = async () => {

      //Code Snippet for 1 statis symbol -  IBM

      const incomeResponse = await loadIncome();
      const balanceResponse = await loadBalances();

      //Code Snippet for Dynamic Symbols for API

      // const incomeResponseAPI = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`);
      // const balanceResponseAPI= await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`);
      // const incomeResponse = incomeResponseAPI.json()
      // const balanceResponse = balanceResponseAPI.json()

      const netIncome = incomeResponse.quarterlyReports.map(item => parseFloat(item.netIncome));
      const totalRevenue = incomeResponse.quarterlyReports.map(item => parseFloat(item.totalRevenue));
      const shareholderEquity = balanceResponse.quarterlyReports.map(item => parseFloat(item.totalShareholderEquity));
      const labels = incomeResponse.quarterlyReports.map(item => item.fiscalDateEnding);
      const symbolsData = loadSymbols();
      const info = symbolsData.find(s => s.symbol === symbol);
        if (info) {
          setCompanyInfo({ name: info.name, ipoDate: info.ipoDate });
        }
     

      setChartData({
        labels,
        datasets: [
          {
            label: 'Net Income',
            data: netIncome,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.4,
            fill: false
          },
          {
            label: 'Total Revenue',
            data: totalRevenue,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.4,
            fill: false
          },
          {
            label: 'Shareholder Equity',
            data: shareholderEquity,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.4,
            fill: false
          }
        ]
      });
    };

    fetchData();
  }, [symbol]);

  const options = {
    
    responsive: true, // Chart.js will resize in response to changes in canvas size
    //maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: (ctx) => {
        const titleLines = [];
        if (companyInfo.name) titleLines.push(`Name: ${companyInfo.name}`);
        if (symbol) titleLines.push(`Symbol: ${symbol}`);
        if (companyInfo.ipoDate) titleLines.push(`IPO Date: ${companyInfo.ipoDate}`);
        return titleLines; // Return the array of lines
        },
        position: 'top',
        align: 'start',
        padding: {
          top: 0,
          bottom: 10 // Adjust padding to ensure the title fits and is visible
        },
        font: {
          size: 16 // Adjust font size as needed
        }
      },
     
    },
    
  };
  
  

  return (
    <Line data={chartData} options={options}/>
  );
};

export default FinancialChart;
