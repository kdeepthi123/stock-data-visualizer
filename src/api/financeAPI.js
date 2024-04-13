import axios from 'axios';

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
const SYMBOL = 'IBM'; // Hardcode the symbol since it's only one

export const fetchFinancialData = async (symbol) => {
    try {
      // Fetch the Income Statement and Balance Sheet data
      const incomeResponse = await axios.get(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${SYMBOL}&apikey=${API_KEY}`);
      const balanceResponse = await axios.get(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${SYMBOL}&apikey=${API_KEY}`);
  
      // Extract the quarterly data
      const quarterlyIncome = incomeResponse.data.quarterlyReports.map(report => ({
        date: report.fiscalDateEnding,
        netIncome: report.netIncome
      }));
  
      const quarterlyRevenue = incomeResponse.data.quarterlyReports.map(report => ({
        date: report.fiscalDateEnding,
        totalRevenue: report.totalRevenue
      }));
  
      const quarterlyEquity = balanceResponse.data.quarterlyReports.map(report => ({
        date: report.fiscalDateEnding,
        shareholderEquity: report.totalShareholderEquity
      }));
  
      // Return the parsed data
      return {
        quarterlyIncome,
        quarterlyRevenue,
        quarterlyEquity
      };
  
    } catch (error) {
      console.error("Error fetching financial data: ", error);
      throw error; // Rethrow the error so it can be handled by the caller
    }
  }