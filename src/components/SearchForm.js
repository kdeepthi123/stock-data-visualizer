import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { loadSymbols } from '../datasets/loadData';

const SearchComponent = ({ setSelectedSymbol }) => {
  const [symbols, setSymbols] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const symbolsData = loadSymbols();
    setSymbols(symbolsData);
    const defaultSymbol = symbolsData.find(sym => sym.symbol === 'IBM');
    setValue(defaultSymbol);
    setSelectedSymbol(defaultSymbol);
  }, [setSelectedSymbol]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setSelectedSymbol(newValue);
      }}
      options={symbols}
      getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
      renderInput={(params) => <TextField {...params} label="Search for a stock" variant="outlined" />}
      style={{ marginBottom: 20, width: 300 }}
    />
  );
};

export default SearchComponent;
