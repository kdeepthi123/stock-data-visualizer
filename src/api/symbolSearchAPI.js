import Papa from 'papaparse';

// A utility function to parse the CSV file
export const parseSymbolsCSV = (csvFilePath, setSymbols) => {
  Papa.parse(csvFilePath, {
    header: true,
    download: true,
    skipEmptyLines: true,
    complete: (results) => {
      setSymbols(results.data); // Set the parsed CSV data to the state
    }
  });
};
