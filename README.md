# Stock Data Visualizer

## Project Overview

This project is a web application built with React that visualizes financial data for stocks. It fetches historical financial data using the Alpha Vantage API and displays it in a line chart.

## Features

- Search for a stock symbol using an autocomplete dropdown.
- Display a line chart showing net income, total revenue, and shareholder equity.
- Dynamic chart title showing the selected company's name, symbol, and IPO date.
- Chart scales based on selected time intervals.

## Live Demo

A live demo of the Stock Data Visualizer is available [here](https://main--endearing-pika-406e83.netlify.app/).

This demo is hosted on Netlify and reflects the latest state of the master/main branch.


## Installation

To get started with this project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/stock-data-visualizer.git
cd stock-data-visualizer
```

Install the necessary packages:
```bash
npm install
```
Start the development server:

```bash
npm start
```
The application should now be running and accessible at http://localhost:3000.

Usage

To view stock data:

Enter the stock symbol in the search box.
Select the stock from the dropdown menu.
View the chart displaying financial data for the selected stock.
API Keys

This project requires an API key from Alpha Vantage. You can obtain a free API key from Alpha Vantage.



## Data Fetching Configuration

This project supports both static and dynamic data fetching for financial charts:

### Static Data for IBM

By default, the application is set to load static data for IBM's financials. This is useful for development purposes when you want to avoid making API calls.

The static data fetching is implemented in the `loadIncome` and `loadBalances` functions within the `FinancialChart.js` component. To use the static data, ensure the following code is uncommented out:

```javascript
const incomeResponse = await loadIncome();
const balanceResponse = await loadBalances();
```
For dynamic data fetching based on user-selected symbols, you need to provide an API key from Alpha Vantage and uncomment the relevant lines in FinancialChart.js.

After getting your API key, you need to set it in the FinancialChart.js component:

```javascript
const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
Replace 'YOUR_ALPHA_VANTAGE_API_KEY' with the actual key you obtained
```

```javascript
const incomeResponseAPI = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`);
const balanceResponseAPI= await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`);
const incomeResponse = await incomeResponseAPI.json();
const balanceResponse = await balanceResponseAPI.json();
```