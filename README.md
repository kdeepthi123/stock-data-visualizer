# Stock Data Visualizer

## Project Overview

This project is a web application built with React that visualizes financial data for stocks. It fetches historical financial data using the Alpha Vantage API and displays it in a line chart.

## Features

- Search for a stock symbol using an autocomplete dropdown.
- Display a line chart showing net income, total revenue, and shareholder equity.
- Dynamic chart title showing the selected company's name, symbol, and IPO date.
- Chart scales based on selected time intervals.

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

After getting your API key, you need to set it in the FinancialChart.js component:

```bash
const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
Replace 'YOUR_ALPHA_VANTAGE_API_KEY' with the actual key you obtained
```