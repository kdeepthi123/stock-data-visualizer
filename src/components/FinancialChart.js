import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
//import axios from 'axios';
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
import { loadBalances} from '../datasets/loadBalances';
import { loadIncome } from '../datasets/loadIncome';
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

  useEffect(() => {
    if (symbol) {
      const fetchData = async () => {
        // const incomeResponse = await axios.get(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol.symbol}&apikey=Y5OM1RQX2TIN8QWI`);
        // const balanceResponse = await axios.get(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol.symbol}&apikey=Y5OM1RQX2TIN8QWI`);
        
        const incomeResponse = loadIncome();
        const balanceResponse = loadBalances();

        console.log(incomeResponse)
        const netIncome = incomeResponse.quarterlyReports.map(item => parseFloat(item.netIncome));
        const totalRevenue = incomeResponse.quarterlyReports.map(item => parseFloat(item.totalRevenue));
        const shareholderEquity = balanceResponse.quarterlyReports.map(item => parseFloat(item.totalShareholderEquity));
        const labels = incomeResponse.quarterlyReports.map(item => item.fiscalDateEnding);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Net Income',
              data: netIncome,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Total Revenue',
              data: totalRevenue,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: 'Shareholder Equity',
              data: shareholderEquity,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }
          ]
        });
      };

      fetchData();
    }
  }, [symbol]);

  return <Line data={chartData} />;
};

export default FinancialChart;
