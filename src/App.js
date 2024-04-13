import React, { useState } from 'react';
import './App.css';
import SearchComponent from './components/SearchForm';
import FinancialChart from './components/FinancialChart';

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState({
    symbol: 'IBM',
    name: 'International Business Machines Corp'
  }); // Default selected symbol

  return (
    <div className="App">
      <header className="App-header">
      <div className="header-content">
          <h1>Stock Data Visualizer</h1>
          <SearchComponent setSelectedSymbol={setSelectedSymbol} />
        </div>
        {selectedSymbol && (
          <FinancialChart symbol={selectedSymbol.symbol} name={selectedSymbol.name} />
        )}
      </header>
    </div>
  );
}

export default App;
